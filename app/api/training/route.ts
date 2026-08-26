import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateTrainingAdminEmailTemplate,
  generateTrainingClientEmailTemplate,
  TrainingInquiryPayload,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      location,
      trainingInterest,
      preferredDate,
      timeWindow,
      goals,
    } = body;

    // Server-side Validations
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Full legal or student name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid direct email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Valid contact phone number is required." },
        { status: 400 }
      );
    }

    if (!location || typeof location !== "string" || !location.trim()) {
      return NextResponse.json(
        { error: "Preferred training location/studio is required." },
        { status: 400 }
      );
    }

    if (!trainingInterest || typeof trainingInterest !== "string" || !trainingInterest.trim()) {
      return NextResponse.json(
        { error: "Please select what you would like to discuss or train." },
        { status: 400 }
      );
    }

    if (!preferredDate || typeof preferredDate !== "string" || !preferredDate.trim()) {
      return NextResponse.json(
        { error: "Preferred appointment date is required." },
        { status: 400 }
      );
    }

    if (!timeWindow || typeof timeWindow !== "string" || !timeWindow.trim()) {
      return NextResponse.json(
        { error: "Preferred time window is required." },
        { status: 400 }
      );
    }

    if (!goals || typeof goals !== "string" || goals.trim().length < 5) {
      return NextResponse.json(
        { error: "Please briefly describe your prior experience or goals (minimum 5 characters)." },
        { status: 400 }
      );
    }

    // Generate Tactical Inquiry ID
    const inquiryId = `HWL-TRN-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload: TrainingInquiryPayload = {
      inquiryId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      location: location.trim(),
      trainingInterest: trainingInterest.trim(),
      preferredDate: preferredDate.trim(),
      timeWindow: timeWindow.trim(),
      goals: goals.trim(),
      submittedAt: new Date().toUTCString(),
    };

    // SMTP Credentials
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const ownerEmail =
      process.env.ADMIN_EMAIL ||
      process.env.TRAINING_EMAIL ||
      process.env.OWNER_EMAIL ||
      process.env.DISPATCH_RECEIVER_EMAIL ||
      process.env.SMTP_USER ||
      "training@howlsecuritygroup.com";

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

        // 1. Send inquiry transmission to SIFU GERALD / ADMIN
        await transporter.sendMail({
          from: `"HOWL Combatives Desk" <${smtpUser}>`,
          to: ownerEmail,
          replyTo: payload.email,
          subject: `[TRAINING INQUIRY ${inquiryId}] ${payload.fullName} - ${payload.trainingInterest}`,
          html: generateTrainingAdminEmailTemplate(payload),
        });

        // 2. Send confirmation receipt to STUDENT / SENDER
        await transporter.sendMail({
          from: `"HOWL Combatives Academy" <${smtpUser}>`,
          to: payload.email,
          subject: `Training Appointment Confirmation [Ref: ${inquiryId}] - HOWL Security Group`,
          html: generateTrainingClientEmailTemplate(payload),
        });

        emailSent = true;
        console.log(
          `[HOWL TRAINING] Dispatched alert to ${ownerEmail} and confirmation to ${payload.email}`
        );
      } catch (err: unknown) {
        console.error("[HOWL TRAINING SMTP ERROR]:", err);
        transportError = err instanceof Error ? err.message : "SMTP Transport Error";
      }
    } else {
      // Local development simulation fallback
      console.log("=== [HOWL TRAINING NODEMAILER SIMULATION] ===");
      console.log(`Inquiry ID: ${inquiryId}`);
      console.log(`Academy Recipient: ${ownerEmail}`);
      console.log(`Student: ${payload.fullName} <${payload.email}>`);
      console.log(`Program: ${payload.trainingInterest}`);
      console.log(`Location: ${payload.location}`);
      console.log(`Date / Window: ${payload.preferredDate} (${payload.timeWindow})`);
      console.log("=============================================");
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      emailSent,
      transportError,
      message: "Training inquiry and appointment registration logged successfully.",
    });
  } catch (error: unknown) {
    console.error("[API Training Route Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing training inquiry registration." },
      { status: 500 }
    );
  }
}
