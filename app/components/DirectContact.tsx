"use client";

import { site } from "@/site.config";
import { useScrollReveal } from "./useScrollReveal";
import { FiArrowRight } from "react-icons/fi";

const trustPoints = [
  { label: "No repairs needed", desc: "Sell in any condition." },
  { label: "No commissions", desc: "You keep every dollar of the offer." },
  { label: "You pick the date", desc: "Close in days or months — your call." },
];

export function DirectContact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section style={{ background: "#fff" }}>
      <div className="section-py">
        <div className="site-container">
          <div className="two-col" style={{ alignItems: "center" }}>

            {/* Left */}
            <div ref={ref} className="reveal-hidden">
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0b2c5c", marginBottom: "12px" }}>
                A Real Local Person
              </p>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 50px)", marginBottom: "20px", lineHeight: 1.08, color: "#261606" }}>
                Deal directly with {site.ownerFirstName}.
              </h2>
              <p style={{ color: "#6b4f3a", fontSize: "clamp(14px, 1.8vw, 17px)", marginBottom: "28px", maxWidth: "44ch", lineHeight: 1.72 }}>
                I&apos;m a local buyer focused on helping Las Vegas Valley homeowners find a
                clean way forward. You&apos;ll get an honest conversation&mdash;not a call-center
                runaround or pressure to say yes.
              </p>
              <a
                href={`tel:${site.phoneHref}`}
                className="animated-link"
                style={{ fontWeight: 700, fontSize: "clamp(14px, 1.8vw, 17px)", color: "#261606" }}
              >
                Call me at {site.phoneDisplay} <FiArrowRight />
              </a>
            </div>

            {/* Right: trust points — desktop only */}
            <div style={{ display: "none" }} className="trust-points-col">
              {trustPoints.map((p, i) => (
                <TrustPoint key={p.label} point={p} index={i} />
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .trust-points-col { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function TrustPoint({ point, index }: { point: { label: string; desc: string }; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-hidden stagger-${index + 1}`}
      style={{
        padding: "22px 0",
        borderBottom: "1px solid #d8ccc4",
        borderTop: index === 0 ? "1px solid #d8ccc4" : undefined,
      }}
    >
      <p style={{ fontWeight: 700, color: "#261606", fontSize: "17px", marginBottom: "4px" }}>{point.label}</p>
      <p style={{ color: "#6b4f3a", fontSize: "14px" }}>{point.desc}</p>
    </div>
  );
}
