import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateAdminEmailTemplate,
  generateClientEmailTemplate,
  IntakeEmailPayload,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      serviceInterest,
      travelScope,
      operationalBrief,
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (fullName, email, phone)." },
        { status: 400 }
      );
    }

    const intakeId = `HWL-INTAKE-${Math.floor(100000 + Math.random() * 900000)}`;
    const payload: IntakeEmailPayload = {
      intakeId,
      fullName,
      email,
      phone,
      serviceInterest: serviceInterest || "Executive Protection / Consultation",
      travelScope: travelScope || "Florida Regional",
      operationalBrief: operationalBrief || "No specific brief details provided.",
      submittedAt: new Date().toUTCString(),
    };

    // SMTP Credentials from Environment Variables (.env / .env.local)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Owner / Admin destination email
    const ownerEmail =
      process.env.ADMIN_EMAIL ||
      process.env.OWNER_EMAIL ||
      process.env.DISPATCH_RECEIVER_EMAIL ||
      process.env.SMTP_USER ||
      "dispatch@howlsecuritygroup.com";

    let emailSent = false;
    let transportError: string | null = null;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // 1. Send complete intake transmission to OWNER / ADMIN
        await transporter.sendMail({
          from: `"HOWL Command Console" <${smtpUser}>`,
          to: ownerEmail,
          replyTo: email,
          subject: `[NEW INTAKE ${intakeId}] ${fullName} - ${payload.serviceInterest}`,
          html: generateAdminEmailTemplate(payload),
        });

        // 2. Send "Thank you for submitting" notification to SUBMITTER (Sender's Email)
        await transporter.sendMail({
          from: `"HOWL Security Group" <${smtpUser}>`,
          to: email,
          subject: `Thank you for submitting your intake request [Ref: ${intakeId}] - HOWL Security Group`,
          html: generateClientEmailTemplate(payload),
        });

        emailSent = true;
        console.log(`[HOWL EMAIL] Successfully delivered Admin alert to ${ownerEmail} and Confirmation to ${email}`);
      } catch (err: unknown) {
        console.error("[HOWL SMTP ERROR]:", err);
        transportError = err instanceof Error ? err.message : "SMTP Transport Error";
      }
    } else {
      // Local development simulation fallback when SMTP is not configured yet
      console.log("=== [HOWL NODEMAILER SIMULATION] ===");
      console.log(`Intake ID: ${intakeId}`);
      console.log(`Owner/Admin Recipient: ${ownerEmail}`);
      console.log(`Submitter Email (User): ${fullName} <${email}>`);
      console.log(`Service: ${payload.serviceInterest}`);
      console.log(`Scope: ${payload.travelScope}`);
      console.log("====================================");
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      intakeId,
      emailSent,
      transportError,
      message: "Intake transmission processed successfully by Howl Security Group Operations Command.",
    });
  } catch (error: unknown) {
    console.error("[API Intake Handler Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing intake transmission." },
      { status: 500 }
    );
  }
}
