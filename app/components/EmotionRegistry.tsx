"use client";

/**
 * EmotionRegistry — Next.js App Router SSR fix for Chakra UI v3.
 *
 * Emotion injects <style> tags *inline in the React tree* on the server,
 * but uses document.head on the client — causing a hydration mismatch.
 *
 * This registry intercepts every style insertion during SSR and flushes
 * them into <head> via useServerInsertedHTML, so both server and client
 * produce the same DOM structure and React hydration succeeds.
 */

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;

    // Intercept insertions so we can flush them to <head> via SSR hook
    const prevInsert = cache.insert.bind(cache);
    let inserted: Array<{ name: string; isGlobal: boolean }> = [];

    cache.insert = (...args) => {
      const [selector, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, isGlobal: !selector });
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const insertions = flush();
    if (insertions.length === 0) return null;

    let styles = "";
    const dataEmotion: string[] = [];

    for (const { name, isGlobal } of insertions) {
      dataEmotion.push(name);
      // Global styles use cache.inserted[name] = true when already inserted
      if (isGlobal) {
        styles += cache.inserted[name] ?? "";
      } else {
        styles += cache.inserted[name];
      }
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${dataEmotion.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
