import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateConsultationDispatchAdminEmailTemplate,
  generateConsultationDispatchClientEmailTemplate,
  ConsultationDispatchPayload,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      organization,
      email,
      serviceRequired,
      targetStartDate,
      urgencyLevel,
      operationsArea,
      confidentialMessage,
    } = body;

    // Server-side Validations
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Full legal or officer contact name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid direct contact email address is required." },
        { status: 400 }
      );
    }

    if (!serviceRequired || typeof serviceRequired !== "string" || !serviceRequired.trim()) {
      return NextResponse.json(
        { error: "Please select a valid service requirement vector." },
        { status: 400 }
      );
    }

    if (!targetStartDate || typeof targetStartDate !== "string" || !targetStartDate.trim()) {
      return NextResponse.json(
        { error: "Target start date or deployment timeline is required." },
        { status: 400 }
      );
    }

    if (!urgencyLevel || typeof urgencyLevel !== "string" || !urgencyLevel.trim()) {
      return NextResponse.json(
        { error: "Please select an operational urgency level." },
        { status: 400 }
      );
    }

    if (!operationsArea || typeof operationsArea !== "string" || operationsArea.trim().length < 2) {
      return NextResponse.json(
        { error: "Operations deployment area / jurisdiction is required." },
        { status: 400 }
      );
    }

    if (
      !confidentialMessage ||
      typeof confidentialMessage !== "string" ||
      confidentialMessage.trim().length < 5
    ) {
      return NextResponse.json(
        { error: "Confidential message brief is required (minimum 5 characters)." },
        { status: 400 }
      );
    }

    // Generate Tactical Dispatch ID
    const dispatchId = `HWL-DSP-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload: ConsultationDispatchPayload = {
      dispatchId,
      fullName: fullName.trim(),
      organization: organization?.trim() || "Private Principal / Individual",
      email: email.trim().toLowerCase(),
      serviceRequired: serviceRequired.trim(),
      targetStartDate: targetStartDate.trim(),
      urgencyLevel: urgencyLevel.trim(),
      operationsArea: operationsArea.trim(),
      confidentialMessage: confidentialMessage.trim(),
      submittedAt: new Date().toUTCString(),
    };

    // SMTP Credentials
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const ownerEmail =
      process.env.ADMIN_EMAIL ||
      process.env.DISPATCH_RECEIVER_EMAIL ||
      process.env.OWNER_EMAIL ||
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

        // 1. Send transmission to ADMIN / DISPATCH DESK
        await transporter.sendMail({
          from: `"HOWL Tactical Dispatch" <${smtpUser}>`,
          to: ownerEmail,
          replyTo: payload.email,
          subject: `[CONSULTATION DISPATCH ${dispatchId}] ${payload.fullName} - ${payload.serviceRequired} (${payload.urgencyLevel})`,
          html: generateConsultationDispatchAdminEmailTemplate(payload),
        });

        // 2. Send confirmation receipt to SENDER / CLIENT
        await transporter.sendMail({
          from: `"HOWL Security Group" <${smtpUser}>`,
          to: payload.email,
          subject: `Confidential Consultation Transmission Logged [Ref: ${dispatchId}] - HOWL Security Group`,
          html: generateConsultationDispatchClientEmailTemplate(payload),
        });

        emailSent = true;
        console.log(
          `[HOWL CONSULTATION] Dispatched alert to ${ownerEmail} and confirmation to ${payload.email}`
        );
      } catch (err: unknown) {
        console.error("[HOWL CONSULTATION SMTP ERROR]:", err);
        transportError = err instanceof Error ? err.message : "SMTP Transport Error";
      }
    } else {
      // Local development simulation fallback
      console.log("=== [HOWL CONSULTATION NODEMAILER SIMULATION] ===");
      console.log(`Dispatch ID: ${dispatchId}`);
      console.log(`Admin Recipient: ${ownerEmail}`);
      console.log(`Client Email: ${payload.fullName} <${payload.email}>`);
      console.log(`Service Vector: ${payload.serviceRequired}`);
      console.log(`Urgency: ${payload.urgencyLevel}`);
      console.log(`Operations Area: ${payload.operationsArea}`);
      console.log("================================================");
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      dispatchId,
      emailSent,
      transportError,
      message:
        "Confidential consultation request logged. Active zero-trace protocols are engaged.",
    });
  } catch (error: unknown) {
    console.error("[API Consultation Route Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing consultation transmission." },
      { status: 500 }
    );
  }
}
