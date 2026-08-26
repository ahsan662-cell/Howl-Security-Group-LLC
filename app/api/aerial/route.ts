import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateAerialAdminEmailTemplate,
  generateAerialClientEmailTemplate,
  AerialSurveyPayload,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      organization,
      operationType,
      siteLocation,
      timeframe,
      missionDetails,
    } = body;

    // Server-side Validations
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Principal or requestor name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Valid direct email address is required for flight briefs." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Contact phone number is required for pilot coordination." },
        { status: 400 }
      );
    }

    if (!operationType || typeof operationType !== "string" || !operationType.trim()) {
      return NextResponse.json(
        { error: "Please select an aerial operation vector." },
        { status: 400 }
      );
    }

    if (!siteLocation || typeof siteLocation !== "string" || !siteLocation.trim()) {
      return NextResponse.json(
        { error: "Target site, address, or geographic region is required." },
        { status: 400 }
      );
    }

    if (!timeframe || typeof timeframe !== "string" || !timeframe.trim()) {
      return NextResponse.json(
        { error: "Deployment timeframe or target date is required." },
        { status: 400 }
      );
    }

    if (!missionDetails || typeof missionDetails !== "string" || missionDetails.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide mission details or specific survey objectives (minimum 5 characters)." },
        { status: 400 }
      );
    }

    // Generate Tactical Flight Survey ID
    const surveyId = `HWL-UAV-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload: AerialSurveyPayload = {
      surveyId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      organization: organization ? organization.trim() : undefined,
      operationType: operationType.trim(),
      siteLocation: siteLocation.trim(),
      timeframe: timeframe.trim(),
      missionDetails: missionDetails.trim(),
      submittedAt: new Date().toUTCString(),
    };

    // SMTP Credentials
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const ownerEmail =
      process.env.ADMIN_EMAIL ||
      process.env.AERIAL_EMAIL ||
      process.env.DISPATCH_RECEIVER_EMAIL ||
      process.env.OWNER_EMAIL ||
      process.env.SMTP_USER ||
      "drone-ops@howlsecuritygroup.com";

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

        // 1. Send urgent flight request to DRONE OVERWATCH / ADMIN
        await transporter.sendMail({
          from: `"HOWL Drone Flight Desk" <${smtpUser}>`,
          to: ownerEmail,
          replyTo: payload.email,
          subject: `[AERIAL OVERWATCH ${surveyId}] ${payload.fullName} - ${payload.operationType}`,
          html: generateAerialAdminEmailTemplate(payload),
        });

        // 2. Send confirmation to CLIENT / SENDER
        await transporter.sendMail({
          from: `"HOWL Tactical Air Support" <${smtpUser}>`,
          to: payload.email,
          subject: `Aerial Survey Request Confirmed [Ref: ${surveyId}] - HOWL Security Group`,
          html: generateAerialClientEmailTemplate(payload),
        });

        emailSent = true;
        console.log(
          `[HOWL AERIAL] Sent mission alert to ${ownerEmail} and confirmation to ${payload.email}`
        );
      } catch (err: unknown) {
        console.error("[HOWL AERIAL SMTP ERROR]:", err);
        transportError = err instanceof Error ? err.message : "SMTP Transport Error";
      }
    } else {
      // Local development simulation fallback
      console.log("=== [HOWL AERIAL NODEMAILER SIMULATION] ===");
      console.log(`Mission ID: ${surveyId}`);
      console.log(`Command Recipient: ${ownerEmail}`);
      console.log(`Client: ${payload.fullName} <${payload.email}>`);
      console.log(`Vector: ${payload.operationType}`);
      console.log(`Target Site: ${payload.siteLocation}`);
      console.log(`Timeframe: ${payload.timeframe}`);
      console.log("===========================================");
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      surveyId,
      emailSent,
      transportError,
      message: "Aerial reconnaissance survey mission logged successfully.",
    });
  } catch (error: unknown) {
    console.error("[API Aerial Route Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing aerial survey mission request." },
      { status: 500 }
    );
  }
}
