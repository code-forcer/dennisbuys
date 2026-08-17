import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import { EmotionRegistry } from "./components/EmotionRegistry";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: `${site.businessName} | Sell Your House Fast for Cash`,
  description: `Get a fair, no-obligation cash offer on your house in ${site.serviceArea}. No repairs, no cleaning, no commissions. Call or text ${site.phoneDisplay}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* EmotionRegistry must wrap ChakraProvider — it intercepts all
            emotion style insertions and flushes them to <head> via
            useServerInsertedHTML, preventing the SSR/client mismatch. */}
        <EmotionRegistry>
          <Providers>{children}</Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}
