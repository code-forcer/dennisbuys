import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/site.config";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, address, situation } = await req.json();

    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // If no email key is configured yet (e.g. local dev before setup),
    // log the lead instead of failing the whole request.
    if (!apiKey) {
      console.log("New lead (RESEND_API_KEY not set, email skipped):", {
        name,
        phone,
        address,
        situation,
      });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 480px;">
        <h2 style="color:#9a0002; margin-bottom: 4px;">New seller lead</h2>
        <p style="color:#555; margin-top:0;">From ${site.businessName}</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding:8px 0; font-weight:bold; width:140px;">Name</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Phone</td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Address</td><td style="padding:8px 0;">${escapeHtml(address)}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Situation</td><td style="padding:8px 0;">${escapeHtml(situation || "Not specified")}</td></tr>
        </table>
        <p style="margin-top:20px;">
          <a href="tel:${site.phoneHref}" style="color:#9a0002;">Call</a> &nbsp;|&nbsp;
          <a href="sms:${site.phoneHref}" style="color:#9a0002;">Text</a>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: `${site.businessName} Website <leads@${getSendingDomain()}>`,
      to: site.email,
      replyTo: site.email,
      subject: `New lead: ${name} — ${address}`,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("Lead submission failed:", err);
    return NextResponse.json(
      { error: "Failed to send lead." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Resend requires sending "from" a domain you've verified in their dashboard.
// Set RESEND_FROM_DOMAIN once the site's real domain is verified there;
// falls back to Resend's shared test domain otherwise.
function getSendingDomain() {
  return process.env.RESEND_FROM_DOMAIN || "resend.dev";
}
