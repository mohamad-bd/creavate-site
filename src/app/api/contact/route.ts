import { NextRequest, NextResponse } from "next/server";

const FROM_EMAIL = "creavate0@gmail.com"; // visible in email headers
const TO_EMAIL = "creavate0@gmail.com";

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


