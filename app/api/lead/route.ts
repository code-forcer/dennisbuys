import { NextRequest, NextResponse } from "next/server";
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

    const apiKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!apiKey) {
      console.log("New lead (WEB3FORMS_ACCESS_KEY not set, email skipped):", {
        name,
        phone,
        address,
        situation,
      });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 480px;">
        <h2 style="color:#000080; margin-bottom: 4px;">New seller lead</h2>
        <p style="color:#555; margin-top:0;">From ${site.businessName}</p>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding:8px 0; font-weight:bold; width:140px;">Name</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Phone</td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Address</td><td style="padding:8px 0;">${escapeHtml(address)}</td></tr>
          <tr><td style="padding:8px 0; font-weight:bold;">Situation</td><td style="padding:8px 0;">${escapeHtml(situation || "Not specified")}</td></tr>
        </table>
        <p style="margin-top:20px;">
          <a href="tel:${site.phoneHref}" style="color:#000080;">Call</a> &nbsp;|&nbsp;
          <a href="sms:${site.phoneHref}" style="color:#000080;">Text</a>
        </p>
      </div>
    `;

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: apiKey,
        subject: `New lead: ${name} — ${address}`,
        from_name: `${site.businessName} Website`,
        name: name,
        phone: phone,
        address: address,
        situation: situation || "Not specified",
        message: html,
      }),
    });

    const result = await res.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to send lead via Web3Forms.");
    }

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
