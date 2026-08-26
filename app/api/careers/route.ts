import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateCareerAdminEmailTemplate,
  generateCareerApplicantEmailTemplate,
  CareerApplicationPayload,
} from "@/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fullName = (formData.get("fullName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const phone = (formData.get("phone") as string)?.trim();
    const branch = (formData.get("branch") as string)?.trim();
    const licenseNumbers = (formData.get("licenseNumbers") as string)?.trim();
    const resumeFile = formData.get("resume") as File | null;

    // Server-side validations
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Full legal name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid operative email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { error: "Valid direct contact phone number is required." },
        { status: 400 }
      );
    }

    if (!branch || branch.length < 2) {
      return NextResponse.json(
        { error: "Military or law enforcement branch/unit is required." },
        { status: 400 }
      );
    }

    if (!licenseNumbers || licenseNumbers.length < 2) {
      return NextResponse.json(
        { error: "Florida security license numbers (D/G/CC) or pending status are required." },
        { status: 400 }
      );
    }

    if (!resumeFile || typeof resumeFile === "string" || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Operational CV / Resume file is required (PDF or DOCX, max 15MB)." },
        { status: 400 }
      );
    }

    // Check file size (15MB limit)
    const MAX_FILE_SIZE = 15 * 1024 * 1024;
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 15MB limit. Please upload a smaller document." },
        { status: 400 }
      );
    }

    // Check file extension
    const allowedExtensions = [".pdf", ".docx", ".doc"];
    const fileName = resumeFile.name || "resume.pdf";
    const fileExt = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      return NextResponse.json(
        { error: "Invalid file format. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    const formattedFileSize =
      resumeFile.size > 1024 * 1024
        ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(resumeFile.size / 1024).toFixed(1)} KB`;

    // Convert file to buffer for email attachment
    const arrayBuffer = await resumeFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Generate Tactical Dossier ID
    const applicationId = `HWL-OP-${Math.floor(100000 + Math.random() * 900000)}`;

    const payload: CareerApplicationPayload = {
      applicationId,
      fullName,
      email,
      phone,
      branch,
      licenseNumbers,
      fileName,
      fileSize: formattedFileSize,
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
      process.env.CAREERS_EMAIL ||
      process.env.OWNER_EMAIL ||
      process.env.DISPATCH_RECEIVER_EMAIL ||
      process.env.SMTP_USER ||
      "careers@howlsecuritygroup.com";

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

        // 1. Send complete transmission with CV attachment to ADMIN / RECRUITMENT COMMAND
        await transporter.sendMail({
          from: `"HOWL Recruitment Desk" <${smtpUser}>`,
          to: ownerEmail,
          replyTo: email,
          subject: `[OPERATIVE DOSSIER ${applicationId}] ${fullName} - ${branch}`,
          html: generateCareerAdminEmailTemplate(payload),
          attachments: [
            {
              filename: fileName,
              content: fileBuffer,
              contentType: resumeFile.type || "application/octet-stream",
            },
          ],
        });

        // 2. Send confirmation receipt to the APPLICANT (Sender's Email)
        await transporter.sendMail({
          from: `"HOWL Security Group" <${smtpUser}>`,
          to: email,
          subject: `Operative Profile Intake Confirmation [Ref: ${applicationId}] - HOWL Security Group`,
          html: generateCareerApplicantEmailTemplate(payload),
        });

        emailSent = true;
        console.log(
          `[HOWL CAREERS] Successfully delivered Dossier to ${ownerEmail} and Confirmation to ${email}`
        );
      } catch (err: unknown) {
        console.error("[HOWL CAREERS SMTP ERROR]:", err);
        transportError = err instanceof Error ? err.message : "SMTP Transport Error";
      }
    } else {
      // Local development simulation fallback
      console.log("=== [HOWL CAREERS NODEMAILER SIMULATION] ===");
      console.log(`Dossier ID: ${applicationId}`);
      console.log(`Command Recipient: ${ownerEmail}`);
      console.log(`Applicant: ${fullName} <${email}>`);
      console.log(`Branch / Unit: ${branch}`);
      console.log(`Licenses: ${licenseNumbers}`);
      console.log(`Attached Document: ${fileName} (${formattedFileSize})`);
      console.log("============================================");
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      applicationId,
      emailSent,
      transportError,
      message: "Operative profile transmission logged into vetting sequence.",
    });
  } catch (error: unknown) {
    console.error("[API Careers Route Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing operative profile submission." },
      { status: 500 }
    );
  }
}
