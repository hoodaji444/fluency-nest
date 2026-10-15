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
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";

interface EnquiryData {
  fullName: string;
  mobile: string;
  email?: string;
  course: string;
  mode: string;
  city?: string;
  timing?: string;
  goal?: string;
  message?: string;
  consent: boolean;
  submittedAt: string;
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
  "german-a1": "German A1 — Beginner",
  "german-a2": "German A2 — Elementary",
  "german-b1": "German B1 — Intermediate",
  "german-b2": "German B2 — Upper Intermediate",
  "german-c1": "German C1 — Advanced",
  "german-c2": "German C2 — Mastery",
  "french": "French Language",
  "english": "English Language",
  "not-sure": "Not Sure — Need Guidance",
};

const MODE_LABELS: Record<string, string> = {
  "offline": "Offline Classes (Sonipat)",
  "online": "Online Classes",
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

    if (!body.course) {
      return NextResponse.json(
        { success: false, message: "Course selection is required." },
        { status: 400 }
      );
    }

    if (!body.mode) {
      return NextResponse.json(
        { success: false, message: "Learning mode selection is required." },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, message: "Consent is required." },
        { status: 400 }
      );
    }

    // ── Prepare Clean Data ──
    const data = {
      timestamp: new Date(body.submittedAt || new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      name: sanitize(body.fullName),
      mobile: sanitize(body.mobile),
      email: sanitize(body.email || ""),
      course: COURSE_LABELS[body.course] || sanitize(body.course),
      mode: MODE_LABELS[body.mode] || sanitize(body.mode),
      city: sanitize(body.city || ""),
      timing: sanitize(body.timing || ""),
      goal: GOAL_LABELS[body.goal || ""] || sanitize(body.goal || ""),
      message: sanitize(body.message || ""),
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
        // Dynamically import nodemailer to avoid build errors if not configured
        const nodemailer = (await import("nodemailer")).default;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Fluency Nest Website" <${EMAIL_USER}>`,
          to: NOTIFY_EMAIL,
          subject: `New Enquiry: ${data.name} — ${data.course}`,
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f5f0; padding: 32px; border-radius: 16px;">
              <div style="background: #0d1b2e; padding: 24px 32px; border-radius: 12px; margin-bottom: 24px;">
                <h1 style="color: white; font-size: 1.4rem; margin: 0;">New Student Enquiry</h1>
                <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 0.875rem;">Received via Fluency Nest website</p>
              </div>
              
              <div style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
                ${[
                  ["📅 Received", data.timestamp],
                  ["👤 Name", data.name],
                  ["📞 Mobile", data.mobile],
                  ["✉️ Email", data.email || "Not provided"],
                  ["📚 Course", data.course],
                  ["🎓 Learning Mode", data.mode],
                  ["📍 City", data.city || "Not provided"],
                  ["⏰ Preferred Timing", data.timing || "Not specified"],
                  ["🎯 Learning Goal", data.goal || "Not specified"],
                  ["💬 Message", data.message || "No additional message"],
                ].map(([label, value], i) => `
                  <div style="display: flex; padding: 14px 20px; background: ${i % 2 === 0 ? "#fff" : "#f8f9fa"}; gap: 16px; border-bottom: 1px solid #f0f0f0;">
                    <strong style="color: #4a5568; font-size: 0.85rem; min-width: 140px; flex-shrink: 0;">${label}</strong>
                    <span style="color: #0d1b2e; font-size: 0.9rem;">${value}</span>
                  </div>
                `).join("")}
              </div>
              
              <div style="margin-top: 24px; padding: 16px 20px; background: rgba(200,16,46,0.08); border-radius: 10px; border: 1px solid rgba(200,16,46,0.2);">
                <p style="color: #c8102e; font-size: 0.85rem; margin: 0; font-weight: 600;">
                  Please contact this student within 24 hours of receiving this enquiry.
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
