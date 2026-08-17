"use client";

import { site } from "@/site.config";
import { FiArrowRight, FiPhone, FiCheck } from "react-icons/fi";
import { HeroSkyline } from "./HeroSkyline";

// To use real photography instead of the illustrated skyline later:
// 1. Drop image files into /public/house-images/
// 2. List their paths in BG_IMAGES below
// 3. Swap <HeroSkyline /> for the commented-out slide-rotation block
// The CSS for both (.hero-bg-slide, .site-container, .hero-btn-*) is
// already in globals.css either way.
//
// const BG_IMAGES = ["/house-images/your-photo-1.jpg", ...];

const BADGES = ["Buy as-is", "Pick your closing date", "No obligation"];

export function Hero() {
  return (
    <section
      style={{ position: "relative", overflow: "hidden", minHeight: "clamp(480px, 80vh, 640px)", backgroundColor: "#1a0f04" }}
    >
      {/* ── Illustrated Vegas dusk skyline (no external assets needed) ─── */}
      <HeroSkyline />

      {/* ── Glow orb ───────────────────────────────────────────────────── */}
      <div
        className="hero-glow"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "6%",
          left: "-8%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "#9a0002",
          filter: "blur(120px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Left-side scrim so text stays legible over the skyline ─────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(26,15,4,0.92) 0%, rgba(26,15,4,0.75) 38%, rgba(26,15,4,0.15) 68%, transparent 100%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "white",
          paddingTop: "clamp(88px, 14vw, 144px)",
          paddingBottom: "clamp(96px, 13vw, 140px)",
        }}
      >
        <div className="site-container">
          <div style={{ maxWidth: "min(640px, 100%)" }}>
            <p
              className="hero-eyebrow"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#d3f00a",
                marginBottom: "20px",
              }}
            >
              Local Las Vegas Home Buyer
            </p>

            <h1
              className="hero-heading"
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontWeight: 600,
                lineHeight: 1.04,
                fontSize: "clamp(40px, 6vw, 72px)",
                marginBottom: "24px",
              }}
            >
              Sell your house.{" "}
              <span style={{ color: "#902", whiteSpace: "nowrap" }}>Skip <br /> The Headache.</span>
            </h1>

            <p
              className="hero-body"
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "46ch",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              No repairs. No cleaning. No commissions. Tell me about the
              property and I&apos;ll make you a straightforward, no-pressure
              offer.
            </p>

            <div className="hero-buttons hero-btn-row">
              <a href="#seller-form" className="hero-btn-primary">
                Get my free offer <FiArrowRight />
              </a>
              <a href={`tel:${site.phoneHref}`} className="hero-btn-outline">
                <FiPhone /> Call {site.ownerFirstName}
              </a>
            </div>

            <div
              className="hero-badges"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "32px",
              }}
            >
              {BADGES.map((b) => (
                <div
                  key={b}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(211,240,10,0.12)",
                      border: "1px solid #d3f00a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FiCheck size={11} color="#d3f00a" />
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 500,
                    }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
