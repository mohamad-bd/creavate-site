import { NextRequest, NextResponse } from "next/server";

// Use Resend's onboarding sender for reliable testing without domain verification.
// You can override via env: FROM_EMAIL="you@yourdomain.com" after verifying domain in Resend.
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const TO_EMAIL = process.env.TO_EMAIL || "creavate0@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic sanitization
    const safe = (v: string) => String(v).toString().slice(0, 5000);
    const textBody = `New contact form submission\n\nName: ${safe(name)}\nEmail: ${safe(email)}\nPhone: ${safe(phone || "-")}\n\nMessage:\n${safe(message)}`;

    // Use Resend if API key is present; otherwise log-only fallback
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: `Contact form: ${safe(name)}`,
          text: textBody,
          reply_to: email ? [safe(email)] : undefined,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        return NextResponse.json({ error: data?.message || "Email send failed" }, { status: 502 });
      }
    } else {
      console.log("[contact] Email (dev fallback):\n", textBody);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


