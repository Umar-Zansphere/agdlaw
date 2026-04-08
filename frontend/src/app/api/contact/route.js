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

const SERVICE_MAP = {
  criminal_law: "Criminal Law",
  civil_litigation: "Civil Litigation",
  writ_constitutional: "Writs & Constitutional",
  consumer_protection: "Consumer Protection",
  property_real_estate: "Property & Real Estate",
  family_matrimonial: "Family & Matrimonial",
  arbitration_adr: "Arbitration & ADR",
  corporate_advisory: "Corporate Advisory",
  mcop_rcop: "MCOP & Rent Control",
};

const TIMELINE_MAP = {
  immediate: "Immediate Assistance",
  within_week: "Within This Week",
  scheduled: "Scheduled Consultation",
};

export async function POST(request) {
  try {
    const body = await request.json();

    const yourName = (body.your_name || "").trim();
    const yourEmail = (body.your_email || "").trim();
    const rawService = (body.service_type || "").trim();
    const rawTimeline = (body.budget || "").trim();
    const message = (body.message || "").trim();

    const serviceLabel = SERVICE_MAP[rawService] || body.service_label || rawService;
    const timelineLabel = TIMELINE_MAP[rawTimeline] || body.budget_label || rawTimeline;

    if (!yourName || !yourEmail || !serviceLabel || !timelineLabel) {
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
    const submittedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date());

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${escapeHtml(subject)}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f1e8; color: #1d2b24;">
          <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
            New consultation request from ${escapeHtml(yourName)} regarding ${escapeHtml(serviceLabel)}.
          </div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f1e8; margin: 0; padding: 24px 12px; font-family: Arial, sans-serif;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 680px;">
                  <tr>
                    <td style="padding-bottom: 16px; text-align: center; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #6f6a5f;">
                      AGD Law Contact Desk
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #18352c; background: linear-gradient(135deg, #18352c 0%, #315446 100%); border-radius: 24px 24px 0 0; padding: 36px 32px; color: #f8f4ec;">
                      <p style="margin: 0 0 10px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #d7cab0;">
                        New Consultation Inquiry
                      </p>
                      <h1 style="margin: 0 0 12px; font-family: Georgia, 'Times New Roman', serif; font-size: 32px; line-height: 1.2; font-weight: 700;">
                        ${escapeHtml(yourName)} is requesting legal assistance
                      </h1>
                      <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #e8dfd0;">
                        A new contact form submission has arrived. The summary below is organized for quick review and response.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #ffffff; border-radius: 0 0 24px 24px; padding: 32px; box-shadow: 0 18px 45px rgba(24, 53, 44, 0.12);">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 0 0 16px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f5ee; border: 1px solid #e6dece; border-radius: 18px;">
                              <tr>
                                <td style="padding: 18px 20px;">
                                  <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #7b725f;">
                                    Primary Contact
                                  </p>
                                  <p style="margin: 0 0 4px; font-size: 20px; line-height: 1.4; font-weight: 700; color: #1d2b24;">
                                    ${escapeHtml(yourName)}
                                  </p>
                                  <a href="mailto:${escapeHtml(yourEmail)}" style="font-size: 15px; line-height: 1.6; color: #315446; text-decoration: none;">
                                    ${escapeHtml(yourEmail)}
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td style="width: 50%; padding: 0 8px 0 0; vertical-align: top;">
                                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fcfaf6; border: 1px solid #ece3d4; border-radius: 18px;">
                                    <tr>
                                      <td style="padding: 18px 20px;">
                                        <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #7b725f;">
                                          Service Needed
                                        </p>
                                        <p style="margin: 0; font-size: 17px; line-height: 1.5; font-weight: 700; color: #1d2b24;">
                                          ${escapeHtml(serviceLabel)}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td style="width: 50%; padding: 0 0 0 8px; vertical-align: top;">
                                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fcfaf6; border: 1px solid #ece3d4; border-radius: 18px;">
                                    <tr>
                                      <td style="padding: 18px 20px;">
                                        <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #7b725f;">
                                          Preferred Timeline
                                        </p>
                                        <p style="margin: 0; font-size: 17px; line-height: 1.5; font-weight: 700; color: #1d2b24;">
                                          ${escapeHtml(timelineLabel)}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px; background-color: #18352c; border-radius: 18px;">
                        <tr>
                          <td style="padding: 18px 20px;">
                            <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #c2d2ca;">
                              Message
                            </p>
                            <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #f8f4ec;">
                              ${escapeHtml(message || "No additional details provided.")}
                            </p>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 18px 20px; background-color: #f8f5ee; border: 1px solid #e6dece; border-radius: 18px;">
                            <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #7b725f;">
                              Submitted
                            </p>
                            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #42554b;">
                              ${escapeHtml(submittedAt)} (UTC)
                            </p>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="border-radius: 999px; background-color: #b88b4a;">
                            <a href="mailto:${escapeHtml(yourEmail)}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display: inline-block; padding: 14px 22px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none;">
                              Reply to ${escapeHtml(yourName)}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const text = [
      "New Contact Form Submission",
      `Submitted: ${submittedAt} (UTC)`,
      `Name: ${yourName}`,
      `Email: ${yourEmail}`,
      `Service: ${serviceLabel}`,
      `Timeline: ${timelineLabel}`,
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
