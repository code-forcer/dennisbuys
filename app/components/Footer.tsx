"use client";

import { site } from "@/site.config";
import { useScrollReveal } from "./useScrollReveal";

export function Footer() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <footer style={{ background: "#1a0d02", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ padding: "48px 0 40px" }}>
        <div className="site-container">
          <div ref={ref} className="reveal-hidden">
            {/* Desktop: horizontal — Mobile: centered vertical */}
            <div className="footer-inner">

              {/* Brand */}
              <div className="footer-brand">
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#9a0002", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                  {site.ownerFirstName.charAt(0)}
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{site.ownerFirstName} Buys</p>
                  <p style={{ fontSize: "14px", color: "white", fontWeight: 700 }}>Vegas Houses</p>
                </div>
              </div>

              {/* Center */}
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Serving {site.serviceArea}
              </p>

              {/* Links */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                <a href={`tel:${site.phoneHref}`} className="animated-link" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                  {site.phoneDisplay}
                </a>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>&middot;</span>
                <a href={`mailto:${site.email}`} className="animated-link" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                  {site.email}
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                &copy; {site.year} {site.businessName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (min-width: 768px) {
          .footer-inner {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}
