"use client";

import { useState } from "react";
import { site } from "@/site.config";
import { useScrollReveal } from "./useScrollReveal";
import {
  FiArrowRight,
  FiMessageSquare,
  FiCheck,
  FiShield,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";

const situations = [
  { label: "Vacant or inherited", value: "vacant_inherited" },
  { label: "Repairs piling up", value: "repairs" },
  { label: "Behind on payments or liens", value: "payments_liens" },
  { label: "Rental burnout", value: "rental_burnout" },
  { label: "Something else", value: "other" },
];

const perks = [
  {
    icon: FiDollarSign,
    label: "No commissions",
    desc: "Keep every dollar of your offer.",
  },
  {
    icon: FiShield,
    label: "No repairs needed",
    desc: "Sell exactly as-is, no cleaning.",
  },
  {
    icon: FiClock,
    label: "You choose closing",
    desc: "Days, weeks, or months — your pace.",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  height: "48px",
  padding: "0 14px",
  background: "#f4f4f4",
  border: "1.5px solid #902",
  borderRadius: "10px",
  fontSize: "16px",
  fontFamily: "inherit",
  color: "#261606",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#261606",
  marginBottom: "6px",
};

export function SellerForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [situation, setSituation] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const cardRef = useScrollReveal<HTMLDivElement>();

  const situationLabel =
    situations.find((s) => s.value === situation)?.label ?? "";
  const smsBody = encodeURIComponent(
    `${site.smsPrefillText}${address || "[your address]"}${situationLabel ? ` — ${situationLabel}` : ""}`,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !address) {
      setStatus("error");
      setErrorMsg("Please fill in your name, phone, and property address.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          situation: situationLabel || "Not specified",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please call or text instead.");
    }
  }

  const focusStyle = (field: string): React.CSSProperties =>
    focused === field
      ? {
          ...INPUT_STYLE,
          borderColor: "#000080",
          boxShadow: "0 0 0 3px rgba(11,44,92,0.12)",
        }
      : INPUT_STYLE;

  if (status === "success") {
    return (
      <section
        id="seller-form"
        style={{ scrollMarginTop: "70px", background: "#fff" }}
      >
        <div className="section-py">
          <div className="site-container">
            <div
              style={{
                maxWidth: "560px",
                margin: "0 auto",
                background: "white",
                borderRadius: "20px",
                padding: "clamp(32px, 5vw, 48px)",
                textAlign: "center",
                boxShadow: "0 4px 40px rgba(38,22,6,0.08)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#d3f00a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 24px rgba(211,240,10,0.4)",
                }}
              >
                <FiCheck size={26} color="#261606" />
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "26px",
                  marginBottom: "8px",
                  color: "#261606",
                }}
              >
                Got it, {name.split(" ")[0]}.
              </h2>
              <p
                style={{ color: "#6b4f3a", lineHeight: 1.65, fontSize: "15px" }}
              >
                Thanks for the details on {address}. {site.ownerFirstName} will
                reach out at {phone} shortly. If it&apos;s urgent, call{" "}
                {site.phoneDisplay} anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="seller-form"
      style={{ scrollMarginTop: "70px", background: "#fff" }}
    >
      <div className="section-py">
        <div className="site-container">
          <div className="form-layout">
            {/* ── Form card ─────────────────────────────────────────────── */}
            <div
              ref={cardRef}
              className="reveal-hidden form-card"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "clamp(24px, 4vw, 44px)",
                boxShadow: "0 0px 24px rgba(38,22,6,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#fff",
                    backgroundColor: "#000080",
                    padding: "8px 16px",
                    borderRadius: "50px",
                  }}
                >
                  01
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#000080",
                  }}
                >
                  START HERE
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 3vw, 30px)",
                  marginBottom: "8px",
                  color: "#261606",
                }}
              >
                Tell me about your house
              </h2>
              <p
                style={{
                  color: "#6b4f3a",
                  marginBottom: "28px",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                Four quick details. {site.ownerFirstName} gets them by email
                right away.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <div>
                    <label htmlFor="sf-name" style={LABEL_STYLE}>
                      Your name
                    </label>
                    <input
                      id="sf-name"
                      type="text"
                      placeholder="First name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={focusStyle("name")}
                      autoComplete="given-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="sf-phone" style={LABEL_STYLE}>
                      Phone number
                    </label>
                    <input
                      id="sf-phone"
                      type="tel"
                      placeholder="(702) 555-0123"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      style={focusStyle("phone")}
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label htmlFor="sf-address" style={LABEL_STYLE}>
                      Property address
                    </label>
                    <input
                      id="sf-address"
                      type="text"
                      placeholder="Street, city, ZIP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onFocus={() => setFocused("address")}
                      onBlur={() => setFocused(null)}
                      style={focusStyle("address")}
                      autoComplete="street-address"
                    />
                  </div>

                  <div>
                    <label htmlFor="sf-situation" style={LABEL_STYLE}>
                      What&apos;s going on?
                    </label>
                    <select
                      id="sf-situation"
                      value={situation}
                      onChange={(e) => setSituation(e.target.value)}
                      onFocus={() => setFocused("situation")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...focusStyle("situation"),
                        appearance: "none",
                        WebkitAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23261606' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        paddingRight: "40px",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Choose one</option>
                      {situations.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {status === "error" && (
                    <div
                      style={{
                        background: "rgba(11,44,92,0.07)",
                        border: "1px solid #15478c",
                        borderRadius: "10px",
                        padding: "12px 16px",
                      }}
                    >
                      <p
                        style={{
                          color: "#000080",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {errorMsg}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="form-submit-btn"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      "Sending…"
                    ) : (
                      <>
                        Get my cash offer <FiArrowRight />
                      </>
                    )}
                  </button>

                  <a
                    href={`sms:${site.phoneHref}?&body=${smsBody}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      height: "52px",
                      background: "transparent",
                      border: "1.5px solid #d8ccc4",
                      borderRadius: "10px",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#261606",
                      textDecoration: "none",
                      transition:
                        "background 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f7f0ea";
                      e.currentTarget.style.borderColor = "#a08070";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "#d8ccc4";
                    }}
                  >
                    <FiMessageSquare /> Text {site.ownerFirstName} instead
                  </a>

                  <p
                    style={{
                      fontSize: "11px",
                      color: "#000",
                      textAlign: "center",
                      lineHeight: 1.6,
                    }}
                  >
                    By contacting us, you agree to receive a response about your
                    property. No spam.
                  </p>
                </div>
              </form>
            </div>

            {/* ── Sidebar ────────────────────────────────────────── */}
            <div className="form-sidebar" style={{ paddingTop: "8px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#000080",
                  marginBottom: "24px",
                }}
              >
                What you get
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                  marginBottom: "40px",
                }}
              >
                {perks.map((p, i) => (
                  <PerkItem key={p.label} perk={p} index={i} />
                ))}
              </div>
              <div
                style={{ paddingTop: "28px", borderTop: "1px solid #d8ccc4" }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#902",
                    lineHeight: 1.75,
                    marginBottom: "12px",
                    fontStyle: "italic",
                    borderLeft: "3px solid #902",
                    paddingLeft: "16px",
                    textAlign: "left",
                  }}
                >
                  &ldquo;I didn&apos;t have to lift a finger. Dennis handled
                  everything and we closed in 12 days.&rdquo;
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#261606",
                    letterSpacing: "0.04em",
                  }}
                >
                  — Las Vegas homeowner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PerkItem({ perk, index }: { perk: (typeof perks)[0]; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal-left stagger-${index + 1}`}
      style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: "#261606",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <perk.icon size={20} color="#d3f00a" />
      </div>
      <div>
        <p
          style={{
            fontWeight: 700,
            color: "#261606",
            marginBottom: "3px",
            fontSize: "15px",
          }}
        >
          {perk.label}
        </p>
        <p style={{ fontSize: "13px", color: "#000", lineHeight: 1.6 }}>
          {perk.desc}
        </p>
      </div>
    </div>
  );
}
