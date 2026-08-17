"use client";

import { site } from "@/site.config";
import { useScrollReveal } from "./useScrollReveal";
import { FiPhone } from "react-icons/fi";

export function FinalCta() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="gradient-cta-bg" style={{ color: "white", position: "relative", overflow: "hidden" }}>
      {/* Decorative orbs */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "white", opacity: 0.04, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "380px", height: "380px", borderRadius: "50%", background: "white", opacity: 0.03, pointerEvents: "none" }} />

      <div className="section-py">
        <div className="site-container">
          <div
            ref={ref}
            className="reveal-hidden"
            style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fde68a", marginBottom: "16px", opacity: 0.9 }}>
              Ready When You Are
            </p>
            <h2 className="shimmer-text" style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontWeight: 600, fontSize: "clamp(32px, 5.5vw, 64px)", marginBottom: "16px", lineHeight: 1.06 }}>
              Let&apos;s talk about the house.
            </h2>
            <p style={{ fontSize: "clamp(15px, 2vw, 19px)", color: "rgba(255,255,255,0.9)", marginBottom: "40px", lineHeight: 1.6 }}>
              No cleaning. No repairs. No obligation.
            </p>

            <div className="cta-btn-row">
              <a href="#seller-form" className="cta-btn-white">Get my free offer</a>
              <a href={`tel:${site.phoneHref}`} className="cta-btn-ghost">
                <FiPhone /> {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
