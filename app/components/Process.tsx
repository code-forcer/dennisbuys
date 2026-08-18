"use client";

import { useScrollReveal } from "./useScrollReveal";

const steps = [
  { n: "1", title: "Tell me about it", body: "Share the address and what's happening with the property." },
  { n: "2", title: "Review your options", body: "I'll learn the details and explain a straightforward offer." },
  { n: "3", title: "Close on your time", body: "If it works for you, choose a closing timeline that fits." },
];

export function Process() {
  const headingRef = useScrollReveal<HTMLDivElement>();

  return (
    <section style={{ background: "#000080", color: "white" }}>
      <div className="section-py">
        <div className="site-container">
          <div ref={headingRef} className="reveal-hidden" style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 52px)", maxWidth: "22ch", lineHeight: 1.06 }}>
              From headache to handled.
            </h2>
          </div>
          <div className="three-col">
            {steps.map((s, i) => <StepCard key={s.n} step={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal-hidden stagger-${index + 1}`}>
      <div
        className="process-card"
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "clamp(24px, 3vw, 36px)",
          border: "1px solid rgba(255,255,255,0.09)",
          height: "100%",
        }}
      >
        <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
          <div
            className="pulse-circle"
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "#d3f00a", color: "#261606",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "16px",
            }}
          >
            {step.n}
          </div>
        </div>
        <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: "clamp(18px, 2vw, 22px)", marginBottom: "8px" }}>
          {step.title}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.65, fontSize: "14px" }}>{step.body}</p>
      </div>
    </div>
  );
}
