import { NextRequest, NextResponse } from "next/server";

// ============================================================
// ENQUIRY FORM API ROUTE
// This API handles student enquiry form submissions.
// 
// BACKEND OPTIONS:
// 1. Google Sheets (configured here) — free, recommended for small institutes
// 2. Email (via nodemailer) — for email notifications  
// 3. Database (e.g. Vercel Postgres / Supabase) — for larger scale
//
// SETUP INSTRUCTIONS for Google Sheets:
// 1. Create a Google Sheet with columns:
//    Timestamp | Name | Mobile | Email | Course | Mode | City | Timing | Goal | Message
// 2. Create a Google Apps Script web app (see DEPLOYMENT.md)
// 3. Set GOOGLE_SHEET_WEBHOOK_URL in your .env.local
//
// SETUP INSTRUCTIONS for Email Notifications:
// 1. Set EMAIL_USER and EMAIL_PASS in your .env.local
// 2. Set NOTIFY_EMAIL (where to send notifications)
// ============================================================

const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";
const EMAIL_USER = process.env.EMAIL_USER || process.env.SMTP_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || process.env.SMTP_PASS || "";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@fluencynest.in";

interface EnquiryData {
  fullName: string;
  mobile: string;
  email?: string;
  course?: string;
  mode?: string;
  city?: string;
  timing?: string;
  goal?: string;
  message?: string;
  consent?: boolean;
  submittedAt?: string;
  source?: string;
}

function sanitize(str: string): string {
  return String(str || "").replace(/<[^>]*>/g, "").trim().slice(0, 500);
}

function validateMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/\s|-/g, "");
  return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
}

// Map course IDs to display names
const COURSE_LABELS: Record<string, string> = {
  // Pop-up Quick Leads
  "quick-callback": "Quick Callback (Pop-up Lead)",
  "german": "German Language",
  "french": "French Language",
  "english": "English Language",
  // German
  "german-a1": "German A1 — Beginner",
  "german-a2": "German A2 — Elementary",
  "german-b1": "German B1 — Intermediate",
  "german-b2": "German B2 — Upper Intermediate",
  "german-c1": "German C1 — Advanced",
  "german-c2": "German C2 — Mastery",
  // French
  "french-a1": "French A1 — Beginner (DELF A1)",
  "french-a2": "French A2 — Elementary (DELF A2)",
  "french-b1": "French B1 — Intermediate (DELF B1)",
  "french-b2": "French B2 — Upper Intermediate (DELF B2)",
  "french-c1": "French C1 — Advanced (DALF C1)",
  "french-c2": "French C2 — Mastery (DALF C2)",
  // English
  "english-a1": "English A1 — Foundational Beginner",
  "english-a2": "English A2 — Elementary Speaking",
  "english-b1": "English B1 — Intermediate & Spoken Fluency",
  "english-b2": "English B2 — Professional & Business Fluency",
  "english-c1": "English C1 — Advanced & Global Academic",
  "english-c2": "English C2 — Native Mastery & Public Speaking",
  // Other
  "not-sure": "Not Sure — Need Guidance",
};

const MODE_LABELS: Record<string, string> = {
  "offline": "Offline In-Person (SCO-10, Eldeco County, Murthal, Sonipat)",
  "online": "Online Classes (Live Interactive)",
  "guidance": "Need Guidance",
};

const GOAL_LABELS: Record<string, string> = {
  "study-germany": "Study in Germany",
  "work-germany": "Work in Germany",
  "exam-prep": "Language Examination Preparation",
  "personal-interest": "Personal Interest",
  "improve-communication": "Improve Communication",
  "other": "Other",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as EnquiryData;

    // ── Server-side Validation ──
    if (!body.fullName || sanitize(body.fullName).length < 2) {
      return NextResponse.json(
        { success: false, message: "Valid name is required." },
        { status: 400 }
      );
    }

    if (!body.mobile || !validateMobile(sanitize(body.mobile))) {
      return NextResponse.json(
        { success: false, message: "Valid Indian mobile number is required." },
        { status: 400 }
      );
    }

    // Default for pop-up or quick forms if omitted
    const courseCode = body.course || "quick-callback";
    const modeCode = body.mode || "guidance";
    const source = body.source || (body.course ? "Website Enquiry Form" : "Website Welcome Pop-up");

    // ── Prepare Clean Data ──
    const data = {
      timestamp: new Date(body.submittedAt || new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      name: sanitize(body.fullName),
      mobile: sanitize(body.mobile),
      email: sanitize(body.email || ""),
      course: COURSE_LABELS[courseCode] || sanitize(courseCode),
      mode: MODE_LABELS[modeCode] || sanitize(modeCode),
      city: sanitize(body.city || ""),
      timing: sanitize(body.timing || ""),
      goal: GOAL_LABELS[body.goal || ""] || sanitize(body.goal || ""),
      message: sanitize(body.message || ""),
      source,
    };

    let sheetSuccess = false;
    let emailSuccess = false;

    // ── 1. Google Sheets Webhook ──
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        const sheetRes = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        sheetSuccess = sheetRes.ok;
      } catch (sheetErr) {
        console.error("Google Sheets error:", sheetErr);
      }
    }

    // ── 2. Email Notification ──
    if (EMAIL_USER && EMAIL_PASS && NOTIFY_EMAIL) {
      try {
        const nodemailer = (await import("nodemailer")).default;

        // Auto-detect Hostinger vs Gmail vs custom SMTP
        const isGmail = EMAIL_USER.toLowerCase().endsWith("@gmail.com");
        const host = SMTP_HOST || (isGmail ? undefined : "smtp.hostinger.com");
        const port = SMTP_PORT || 465;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transportConfig: any = host
          ? {
              host,
              port,
              secure: port === 465,
              auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
              },
            }
          : {
              service: "gmail",
              auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
              },
            };

        const transporter = nodemailer.createTransport(transportConfig);

        const isQuickLead = source.includes("Pop-up") || courseCode === "quick-callback";
        const emailSubject = isQuickLead
          ? `⚡ Quick Pop-up Lead: ${data.name} (${data.mobile}) — Fluency Nest`
          : `🎯 New Student Lead: ${data.name} (${data.course}) — Fluency Nest`;

        const cleanMobile = data.mobile.replace(/\D/g, "").slice(-10);

        await transporter.sendMail({
          from: `"Fluency Nest Admissions" <${EMAIL_USER}>`,
          to: NOTIFY_EMAIL,
          replyTo: data.email || EMAIL_USER,
          subject: emailSubject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 16px;">
              <div style="background: linear-gradient(135deg, #0d1b2e 0%, #172a45 100%); padding: 28px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
                <h1 style="color: #ffd978; font-size: 1.5rem; margin: 0 0 6px 0; font-weight: 700;">
                  ${isQuickLead ? "⚡ Quick Pop-up Callback Lead" : "🎓 New Student Admission Enquiry"}
                </h1>
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 0.9rem;">
                  Received via Fluency Nest Website (${data.source})
                </p>
              </div>

              <!-- Quick Action Buttons -->
              <div style="display: flex; gap: 12px; margin-bottom: 20px; justify-content: center;">
                <a href="tel:${data.mobile}" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; display: inline-block;">
                  📞 Call Student (${data.mobile})
                </a>
                <a href="https://wa.me/91${cleanMobile}?text=${encodeURIComponent(`Hello ${data.name}, thank you for contacting Fluency Nest! We received your enquiry for ${data.course}. How can we assist you?`)}" style="background: #22c55e; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; display: inline-block;">
                  💬 WhatsApp Student
                </a>
              </div>
              
              <div style="background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                ${[
                  ["⚡ Lead Source", data.source],
                  ["📅 Date & Time", data.timestamp],
                  ["👤 Full Name", data.name],
                  ["📞 Phone Number", data.mobile],
                  ["✉️ Email Address", data.email || "Not provided"],
                  ["📚 Course Interest", data.course],
                  ["🎓 Learning Mode", data.mode],
                  ["📍 Student City", data.city || "Not provided"],
                  ["⏰ Preferred Timing", data.timing || "Flexible / Not specified"],
                  ["🎯 Primary Goal", data.goal || "Not specified"],
                  ["💬 Student Message", data.message || "Requested direct phone callback"],
                ].map(([label, value], i) => `
                  <div style="display: flex; padding: 12px 20px; background: ${i % 2 === 0 ? "#ffffff" : "#f8fafc"}; gap: 16px; border-bottom: 1px solid #edf2f7;">
                    <strong style="color: #64748b; font-size: 0.85rem; min-width: 140px; flex-shrink: 0;">${label}</strong>
                    <span style="color: #0f172a; font-size: 0.92rem; font-weight: 500;">${value}</span>
                  </div>
                `).join("")}
              </div>
              
              <div style="margin-top: 20px; padding: 14px 18px; background: #fef2f2; border-radius: 10px; border: 1px solid #fee2e2; text-align: center;">
                <p style="color: #991b1b; font-size: 0.85rem; margin: 0; font-weight: 600;">
                  ⚡ Tip: Calling leads within 15 minutes increases student enrollment conversion by over 40%!
                </p>
              </div>
            </div>
          `,
        });

        emailSuccess = true;
      } catch (emailErr) {
        console.error("Email notification error:", emailErr);
      }
    }

    // ── 3. Fallback Console Log (always) ──
    console.log("[FLUENT NEST ENQUIRY]", JSON.stringify(data, null, 2));

    // Success if either sheet or email worked, or if neither is configured (log only mode)
    const success = sheetSuccess || emailSuccess || (!GOOGLE_SHEET_WEBHOOK_URL && !EMAIL_USER);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Enquiry received successfully.",
      });
    } else {
      // If both integrations failed but were configured
      return NextResponse.json(
        {
          success: false,
          message: "We received your enquiry but encountered a technical issue. Please contact us directly.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}

// Only POST is allowed
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
