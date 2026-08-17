"use client";

import { site } from "@/site.config";
import { useScrollReveal } from "./useScrollReveal";

const reasons = [
  { n: "01", title: "Vacant or inherited", body: "Stop paying for a house you don't want to manage." },
  { n: "02", title: "Repairs piling up", body: "Sell as-is without contractors, cleaning, or renovations." },
  { n: "03", title: "Payments or liens", body: "Let's look at the timeline and find a practical path forward." },
  { n: "04", title: "Rental burnout", body: "Move on from tenants, turnover, and constant maintenance." },
];

export function WhySell() {
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section style={{ background: "#fff" }}>
      <div className="section-py">
        <div className="site-container">
          <div className="two-col" style={{ alignItems: "start" }}>

            {/* Left: heading */}
            <div ref={headerRef} className="reveal-hidden">
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a0002", marginBottom: "12px" }}>
                A Simpler Way to Sell
              </p>
              <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 48px)", maxWidth: "14ch", marginBottom: "16px", lineHeight: 1.08, color: "#261606" }}>
                Your house doesn&apos;t have to be perfect.
              </h2>
              <p style={{ color: "#6b4f3a", maxWidth: "40ch", lineHeight: 1.7, fontSize: "15px" }}>
                I&apos;m interested in properties throughout {site.serviceArea}&mdash;even when the situation feels complicated.
              </p>
            </div>

            {/* Right: reasons */}
            <div>
              {reasons.map((r, i) => (
                <ReasonRow key={r.n} reason={r} index={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonRow({ reason, index }: { reason: (typeof reasons)[0]; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal-left stagger-${index + 1}`}>
      <div
        className="reason-row"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "24px",
          padding: "22px 8px",
          borderTop: index === 0 ? "1px solid #d8ccc4" : undefined,
          borderBottom: "1px solid #d8ccc4",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#9a0002", paddingTop: "3px", minWidth: "24px", letterSpacing: "0.06em" }}>
          {reason.n}
        </span>
        <div>
          <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(18px, 2.5vw, 22px)", marginBottom: "4px", color: "#261606" }}>
            {reason.title}
          </h3>
          <p style={{ color: "#6b4f3a", lineHeight: 1.65, fontSize: "14px" }}>{reason.body}</p>
        </div>
      </div>
    </div>
  );
}
