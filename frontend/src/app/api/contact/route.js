import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const yourName = (body.your_name || "").trim();
    const yourEmail = (body.your_email || "").trim();
    const serviceLabel = (body.service_label || body.service_type || "").trim();
    const budgetLabel = (body.budget_label || body.budget || "").trim();
    const message = (body.message || "").trim();

    if (!yourName || !yourEmail || !serviceLabel || !budgetLabel) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const contactToEmail = process.env.CONTACT_TO_EMAIL || resendFromEmail;

    if (!resendApiKey || !resendFromEmail || !contactToEmail) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const subject = `New Consultation Request - ${yourName}`;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #1a241d; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New Contact Form Submission</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(yourName)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(yourEmail)}</p>
        <p style="margin: 0 0 8px;"><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        <p style="margin: 0 0 8px;"><strong>Budget:</strong> ${escapeHtml(budgetLabel)}</p>
        <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message || "(No additional details provided)")}</p>
      </div>
    `;

    const text = [
      "New Contact Form Submission",
      `Name: ${yourName}`,
      `Email: ${yourEmail}`,
      `Service: ${serviceLabel}`,
      `Budget: ${budgetLabel}`,
      `Message: ${message || "(No additional details provided)"}`,
    ].join("\n");

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [contactToEmail],
        reply_to: yourEmail,
        subject,
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      return NextResponse.json(
        { error: "Resend request failed.", detail: resendError },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request or server error." },
      { status: 500 }
    );
  }
}
