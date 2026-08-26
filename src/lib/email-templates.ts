export interface IntakeEmailPayload {
  intakeId: string;
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  travelScope: string;
  operationalBrief: string;
  submittedAt: string;
}

export function generateAdminEmailTemplate(data: IntakeEmailPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HOWL Security Group - New Tactical Intake</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; }
    .logo-text { color: #E58518; font-size: 20px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .badge { display: inline-block; background: #1C1917; border: 1px solid #E58518; color: #E58518; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .section-title { font-size: 14px; font-family: monospace; color: #E58518; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; font-weight: bold; }
    .table-spec { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-spec td { padding: 12px 14px; border-bottom: 1px solid #1F2430; font-size: 13px; }
    .table-spec td.label { width: 35%; color: #9CA3AF; font-family: monospace; text-transform: uppercase; font-size: 11px; }
    .table-spec td.value { color: #FFFFFF; font-weight: 600; }
    .brief-box { background: #07090E; border: 1px solid #27272A; border-left: 3px solid #E58518; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #D4D4D8; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">VIGILANCE. STRENGTH. UNITY.</div>
      <div class="badge">[ SECURE INTAKE TRANSMISSION: ${data.intakeId} ]</div>
    </div>
    <div class="content">
      <div class="section-title">// APPLICANT & OPERATIONAL PARAMETERS</div>
      <table class="table-spec">
        <tr>
          <td class="label">Full Legal Name:</td>
          <td class="value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Secure Email:</td>
          <td class="value"><a href="mailto:${data.email}" style="color: #E58518; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Direct Phone:</td>
          <td class="value"><a href="tel:${data.phone}" style="color: #E58518; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Service Interest:</td>
          <td class="value" style="color: #FBBF24;">${data.serviceInterest}</td>
        </tr>
        <tr>
          <td class="label">Location / Scope:</td>
          <td class="value">${data.travelScope}</td>
        </tr>
        <tr>
          <td class="label">Timestamp:</td>
          <td class="value">${data.submittedAt}</td>
        </tr>
      </table>

      <div class="section-title">// OPERATIONAL BRIEF / MISSION GOALS</div>
      <div class="brief-box">
        ${data.operationalBrief.replace(/\n/g, "<br/>")}
      </div>
    </div>
    <div class="footer">
      HOWL Security Group LLC | FL Agency License # B-3800282 | 24/7 Dispatch Desk: (772) 940-4114
    </div>
  </div>
</body>
</html>
  `;
}

export function generateClientEmailTemplate(data: IntakeEmailPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank you for submitting your intake request - HOWL Security Group</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; text-align: center; }
    .logo-text { color: #E58518; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #D4D4D8; }
    .status-card { background: #07090E; border: 1px solid #27272A; border-radius: 6px; padding: 18px; margin: 20px 0; text-align: left; }
    .badge-code { color: #E58518; font-family: monospace; font-weight: bold; font-size: 14px; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">VIGILANCE. STRENGTH. UNITY.</div>
    </div>
    <div class="content">
      <h2 style="color: #FFFFFF; font-size: 18px; text-transform: uppercase; margin-top: 0;">THANK YOU FOR YOUR SUBMISSION</h2>
      <p>Dear <strong>${data.fullName}</strong>,</p>
      <p>Thank you for submitting your consultation and training intake request. Your transmission has been securely logged into the <strong>Howl Security Group Operations Command</strong> system.</p>
      
      <div class="status-card">
        <div style="font-family: monospace; font-size: 11px; color: #9CA3AF; margin-bottom: 6px;">YOUR INTAKE TRACKING ID:</div>
        <div class="badge-code">${data.intakeId}</div>
        <div style="font-size: 12px; color: #A1A1AA; margin-top: 10px; line-height: 1.5;">
          <strong>Requested Service:</strong> <span style="color: #F3F4F6;">${data.serviceInterest}</span><br/>
          <strong>Deployment Scope:</strong> <span style="color: #F3F4F6;">${data.travelScope}</span>
        </div>
      </div>

      <p style="font-size: 13px; color: #A1A1AA;">
        All transmissions are processed under bilateral non-disclosure and strict confidentiality standards. An operational commander will review your brief and contact you directly via your secured phone number (<strong>${data.phone}</strong>).
      </p>

      <p style="margin-top: 24px; font-size: 12px; color: #71717A; font-family: monospace;">
        For urgent deployments or direct command inquiries, please contact us 24/7 at <strong>(772) 940-4114</strong>.
      </p>
    </div>
    <div class="footer">
      HOWL Security Group LLC | FL Agency License # B-3800282 | Fort Pierce Tactical Command Center
    </div>
  </div>
</body>
</html>
  `;
}

export interface CareerApplicationPayload {
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  licenseNumbers: string;
  fileName?: string;
  fileSize?: string;
  submittedAt: string;
}

export function generateCareerAdminEmailTemplate(data: CareerApplicationPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HOWL Security Group - New Operative Profile Submission</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; }
    .logo-text { color: #E58518; font-size: 20px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .badge { display: inline-block; background: #1C1917; border: 1px solid #E58518; color: #E58518; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .section-title { font-size: 13px; font-family: monospace; color: #E58518; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; font-weight: bold; }
    .table-spec { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-spec td { padding: 12px 14px; border-bottom: 1px solid #1F2430; font-size: 13px; }
    .table-spec td.label { width: 38%; color: #9CA3AF; font-family: monospace; text-transform: uppercase; font-size: 11px; }
    .table-spec td.value { color: #FFFFFF; font-weight: 600; }
    .alert-box { background: #14100C; border: 1px solid #78350F; border-left: 3px solid #E58518; padding: 14px 16px; border-radius: 4px; font-size: 12px; color: #FDE68A; margin-top: 10px; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">OPERATIVE INTAKE // RECRUITMENT PIPELINE</div>
      <div class="badge">[ DOSSIER ID: ${data.applicationId} ]</div>
    </div>
    <div class="content">
      <div class="section-title">// CANDIDATE VETTING PARAMETERS</div>
      <table class="table-spec">
        <tr>
          <td class="label">Operative Legal Name:</td>
          <td class="value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Secure Email:</td>
          <td class="value"><a href="mailto:${data.email}" style="color: #E58518; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Direct Contact Phone:</td>
          <td class="value"><a href="tel:${data.phone}" style="color: #E58518; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Military / LE Branch:</td>
          <td class="value" style="color: #FBBF24;">${data.branch}</td>
        </tr>
        <tr>
          <td class="label">FL Security Licenses:</td>
          <td class="value">${data.licenseNumbers}</td>
        </tr>
        <tr>
          <td class="label">Attached CV / Resume:</td>
          <td class="value" style="color: #60A5FA;">${data.fileName || "Uploaded as attachment"} ${data.fileSize ? `(${data.fileSize})` : ""}</td>
        </tr>
        <tr>
          <td class="label">Transmission Time:</td>
          <td class="value">${data.submittedAt}</td>
        </tr>
      </table>

      <div class="alert-box">
        <strong>VETTING PROTOCOL INITIATED:</strong> Please review credentials against Florida DBPR Division of Licensing and verify service records (DD-214 / Agency Verification).
      </div>
    </div>
    <div class="footer">
      HOWL Security Group LLC | Recruitment & Operative Intake Division | Confidential Dossier
    </div>
  </div>
</body>
</html>
  `;
}

export function generateCareerApplicantEmailTemplate(data: CareerApplicationPayload): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Operative Profile Intake Confirmation - HOWL Security Group</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; text-align: center; }
    .logo-text { color: #E58518; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #D4D4D8; }
    .status-card { background: #07090E; border: 1px solid #27272A; border-radius: 6px; padding: 18px; margin: 20px 0; text-align: left; }
    .badge-code { color: #E58518; font-family: monospace; font-weight: bold; font-size: 14px; }
    .step-list { margin: 16px 0; padding-left: 20px; }
    .step-list li { margin-bottom: 8px; font-size: 13px; color: #CBD5E1; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">DISCIPLINE. PRECISION. VIGILANCE.</div>
    </div>
    <div class="content">
      <h2 style="color: #FFFFFF; font-size: 18px; text-transform: uppercase; margin-top: 0;">OPERATIVE PROFILE TRANSMISSION RECEIVED</h2>
      <p>Operative <strong>${data.fullName}</strong>,</p>
      <p>Your candidate profile and operational credentials have been securely transmitted to the <strong>Howl Security Group Recruitment Command</strong>.</p>
      
      <div class="status-card">
        <div style="font-family: monospace; font-size: 11px; color: #9CA3AF; margin-bottom: 6px;">DOSSIER TRACKING DESIGNATOR:</div>
        <div class="badge-code">${data.applicationId}</div>
        <div style="font-size: 12px; color: #A1A1AA; margin-top: 10px; line-height: 1.5;">
          <strong>Branch / Unit:</strong> <span style="color: #F3F4F6;">${data.branch}</span><br/>
          <strong>Licensing Reference:</strong> <span style="color: #F3F4F6;">${data.licenseNumbers}</span><br/>
          <strong>CV / Document:</strong> <span style="color: #F3F4F6;">${data.fileName || "Uploaded & Encrypted"}</span>
        </div>
      </div>

      <p style="font-size: 13px; color: #E2E8F0; font-weight: bold;">
        WHAT HAPPENS NEXT IN THE VETTING SEQUENCE:
      </p>
      <ol class="step-list">
        <li><strong>Credential & License Verification:</strong> Florida Class D/G/CC license validation with state authorities.</li>
        <li><strong>Service Record Review:</strong> Military DD-214 and law enforcement background audit.</li>
        <li><strong>Direct Interview:</strong> In-person tactical assessment with command staff if profile criteria align.</li>
      </ol>

      <p style="font-size: 12px; color: #94A3B8;">
        All submitted documentation is processed under strict confidentiality and stored according to military-grade AES-256 standard protocols.
      </p>
    </div>
    <div class="footer">
      HOWL Security Group LLC | FL Agency License # B-3800282 | Fort Pierce Operations Command
    </div>
  </div>
</body>
</html>
  `;
}

export interface ConsultationDispatchPayload {
  dispatchId: string;
  fullName: string;
  organization?: string;
  email: string;
  serviceRequired: string;
  targetStartDate: string;
  urgencyLevel: string;
  operationsArea: string;
  confidentialMessage: string;
  submittedAt: string;
}

export function generateConsultationDispatchAdminEmailTemplate(
  data: ConsultationDispatchPayload
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HOWL Security Group - Confidential Consultation Request</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; }
    .logo-text { color: #E58518; font-size: 20px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .badge { display: inline-block; background: #1C1917; border: 1px solid #E58518; color: #E58518; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .section-title { font-size: 13px; font-family: monospace; color: #E58518; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; font-weight: bold; }
    .table-spec { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-spec td { padding: 12px 14px; border-bottom: 1px solid #1F2430; font-size: 13px; }
    .table-spec td.label { width: 38%; color: #9CA3AF; font-family: monospace; text-transform: uppercase; font-size: 11px; }
    .table-spec td.value { color: #FFFFFF; font-weight: 600; }
    .brief-box { background: #07090E; border: 1px solid #27272A; border-left: 3px solid #E58518; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #D4D4D8; }
    .urgency-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 11px; font-weight: bold; background: #451a03; color: #f97316; border: 1px solid #f97316; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">CONFIDENTIAL DISPATCH PORTAL // 24/7 COMMAND DESK</div>
      <div class="badge">[ TRANSMISSION ID: ${data.dispatchId} ]</div>
    </div>
    <div class="content">
      <div class="section-title">// CONSULTATION & MISSION SPECIFICATIONS</div>
      <table class="table-spec">
        <tr>
          <td class="label">Principal / Client Name:</td>
          <td class="value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Organization / Entity:</td>
          <td class="value">${data.organization || "Private Individual"}</td>
        </tr>
        <tr>
          <td class="label">Direct Email:</td>
          <td class="value"><a href="mailto:${data.email}" style="color: #E58518; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Service Required:</td>
          <td class="value" style="color: #FBBF24;">${data.serviceRequired}</td>
        </tr>
        <tr>
          <td class="label">Urgency Level:</td>
          <td class="value"><span class="urgency-badge">${data.urgencyLevel}</span></td>
        </tr>
        <tr>
          <td class="label">Target Start Date:</td>
          <td class="value">${data.targetStartDate}</td>
        </tr>
        <tr>
          <td class="label">Operations Area:</td>
          <td class="value">${data.operationsArea}</td>
        </tr>
        <tr>
          <td class="label">Transmission Timestamp:</td>
          <td class="value">${data.submittedAt}</td>
        </tr>
      </table>

      <div class="section-title">// CONFIDENTIAL OPERATIONAL MESSAGE</div>
      <div class="brief-box">
        ${data.confidentialMessage.replace(/\n/g, "<br/>")}
      </div>
    </div>
    <div class="footer">
      HOWL Security Group LLC | Tactical Dispatch Desk | Bilateral NDA Protected
    </div>
  </div>
</body>
</html>
  `;
}

export function generateConsultationDispatchClientEmailTemplate(
  data: ConsultationDispatchPayload
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confidential Consultation Received - HOWL Security Group</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; text-align: center; }
    .logo-text { color: #E58518; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #D4D4D8; }
    .status-card { background: #07090E; border: 1px solid #27272A; border-radius: 6px; padding: 18px; margin: 20px 0; text-align: left; }
    .badge-code { color: #E58518; font-family: monospace; font-weight: bold; font-size: 14px; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">VIGILANCE. DISCIPLINE. ZERO-TRACE SECURITY.</div>
    </div>
    <div class="content">
      <h2 style="color: #FFFFFF; font-size: 18px; text-transform: uppercase; margin-top: 0;">CONFIDENTIAL INQUIRY LOGGED</h2>
      <p>Dear <strong>${data.fullName}</strong>,</p>
      <p>Thank you for submitting your consultation and dispatch request. Your transmission has been securely logged into the <strong>HOWL Security Group Operations Command</strong> console.</p>
      
      <div class="status-card">
        <div style="font-family: monospace; font-size: 11px; color: #9CA3AF; margin-bottom: 6px;">DISPATCH TRACKING DESIGNATOR:</div>
        <div class="badge-code">${data.dispatchId}</div>
        <div style="font-size: 12px; color: #A1A1AA; margin-top: 10px; line-height: 1.5;">
          <strong>Service Vector:</strong> <span style="color: #F3F4F6;">${data.serviceRequired}</span><br/>
          <strong>Urgency Level:</strong> <span style="color: #F3F4F6;">${data.urgencyLevel}</span><br/>
          <strong>Operations Area:</strong> <span style="color: #F3F4F6;">${data.operationsArea}</span>
        </div>
      </div>

      <p style="font-size: 13px; color: #CBD5E1;">
        All transmissions are processed under bilateral non-disclosure agreements and strict military-grade confidentiality standards. An operations commander will review your brief and coordinate with you directly.
      </p>

      <p style="margin-top: 24px; font-size: 12px; color: #71717A; font-family: monospace;">
        For immediate emergency response, call our 24/7 Command Desk at <strong>(772) 940-4114</strong>.
      </p>
    </div>
    <div class="footer">
      HOWL Security Group LLC | FL Agency License # B-3800282 | Fort Pierce Operations Command
    </div>
  </div>
</body>
</html>
  `;
}

export interface TrainingInquiryPayload {
  inquiryId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  trainingInterest: string;
  preferredDate: string;
  timeWindow: string;
  goals: string;
  submittedAt: string;
}

export function generateTrainingAdminEmailTemplate(
  data: TrainingInquiryPayload
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HOWL Security Group - New Training Inquiry & Registration</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; }
    .logo-text { color: #E58518; font-size: 20px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .badge { display: inline-block; background: #1C1917; border: 1px solid #E58518; color: #E58518; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .section-title { font-size: 13px; font-family: monospace; color: #E58518; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; font-weight: bold; }
    .table-spec { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-spec td { padding: 12px 14px; border-bottom: 1px solid #1F2430; font-size: 13px; }
    .table-spec td.label { width: 38%; color: #9CA3AF; font-family: monospace; text-transform: uppercase; font-size: 11px; }
    .table-spec td.value { color: #FFFFFF; font-weight: 600; }
    .brief-box { background: #07090E; border: 1px solid #27272A; border-left: 3px solid #E58518; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #D4D4D8; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL COMBATIVES ACADEMY</div>
      <div class="tagline">DIRECT TRAINING INQUIRY // SIFU GERALD HAZELLIEF</div>
      <div class="badge">[ REGISTRATION ID: ${data.inquiryId} ]</div>
    </div>
    <div class="content">
      <div class="section-title">// APPOINTMENT & STUDENT SPECIFICATIONS</div>
      <table class="table-spec">
        <tr>
          <td class="label">Student Name:</td>
          <td class="value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Direct Email:</td>
          <td class="value"><a href="mailto:${data.email}" style="color: #E58518; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Contact Phone:</td>
          <td class="value"><a href="tel:${data.phone}" style="color: #E58518; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Preferred Location:</td>
          <td class="value" style="color: #60A5FA;">${data.location}</td>
        </tr>
        <tr>
          <td class="label">Training Program:</td>
          <td class="value" style="color: #FBBF24;">${data.trainingInterest}</td>
        </tr>
        <tr>
          <td class="label">Preferred Date:</td>
          <td class="value">${data.preferredDate}</td>
        </tr>
        <tr>
          <td class="label">Time Window:</td>
          <td class="value">${data.timeWindow}</td>
        </tr>
        <tr>
          <td class="label">Submission Timestamp:</td>
          <td class="value">${data.submittedAt}</td>
        </tr>
      </table>

      <div class="section-title">// PRIOR EXPERIENCE OR SPECIFIC GOALS</div>
      <div class="brief-box">
        ${data.goals.replace(/\n/g, "<br/>")}
      </div>
    </div>
    <div class="footer">
      HOWL Security Group LLC | Ving Tsun Combatives Academy | Fort Pierce & Vero Beach
    </div>
  </div>
</body>
</html>
  `;
}

export function generateTrainingClientEmailTemplate(
  data: TrainingInquiryPayload
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Training Appointment Request Confirmed - HOWL Security Group</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; text-align: center; }
    .logo-text { color: #E58518; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #D4D4D8; }
    .status-card { background: #07090E; border: 1px solid #27272A; border-radius: 6px; padding: 18px; margin: 20px 0; text-align: left; }
    .badge-code { color: #E58518; font-family: monospace; font-weight: bold; font-size: 14px; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL COMBATIVES ACADEMY</div>
      <div class="tagline">AUTHENTIC VING TSUN // SIFU GERALD HAZELLIEF</div>
    </div>
    <div class="content">
      <h2 style="color: #FFFFFF; font-size: 18px; text-transform: uppercase; margin-top: 0;">TRAINING INQUIRY CONFIRMED</h2>
      <p>Dear <strong>${data.fullName}</strong>,</p>
      <p>Thank you for submitting your direct training inquiry with <strong>Sifu Gerald Hazellief</strong>. Your registration has been securely received by our academy desk.</p>
      
      <div class="status-card">
        <div style="font-family: monospace; font-size: 11px; color: #9CA3AF; margin-bottom: 6px;">YOUR APPOINTMENT TRACKING ID:</div>
        <div class="badge-code">${data.inquiryId}</div>
        <div style="font-size: 12px; color: #A1A1AA; margin-top: 10px; line-height: 1.5;">
          <strong>Program:</strong> <span style="color: #F3F4F6;">${data.trainingInterest}</span><br/>
          <strong>Location:</strong> <span style="color: #F3F4F6;">${data.location}</span><br/>
          <strong>Requested Date/Window:</strong> <span style="color: #F3F4F6;">${data.preferredDate} (${data.timeWindow})</span>
        </div>
      </div>

      <p style="font-size: 13px; color: #CBD5E1;">
        Our team will review your requested date and contact you directly via your phone (<strong>${data.phone}</strong>) or email to confirm your studio appointment.
      </p>

      <p style="margin-top: 24px; font-size: 12px; color: #71717A; font-family: monospace;">
        For direct studio inquiries or urgent appointment changes, contact us at <strong>(772) 932-8282</strong>.
      </p>
    </div>
    <div class="footer">
      HOWL Security Group LLC | Ving Tsun Combatives Academy | Fort Pierce & Vero Beach
    </div>
  </div>
</body>
</html>
  `;
}

export interface AerialSurveyPayload {
  surveyId: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  operationType: string;
  siteLocation: string;
  timeframe: string;
  missionDetails: string;
  submittedAt: string;
}

export function generateAerialAdminEmailTemplate(
  data: AerialSurveyPayload
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HOWL Security Group - Urgent Aerial Drone Recon Request</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; }
    .logo-text { color: #E58518; font-size: 20px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .badge { display: inline-block; background: #1C1917; border: 1px solid #E58518; color: #E58518; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; margin-top: 12px; }
    .content { padding: 28px 24px; }
    .section-title { font-size: 13px; font-family: monospace; color: #E58518; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; font-weight: bold; }
    .table-spec { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-spec td { padding: 12px 14px; border-bottom: 1px solid #1F2430; font-size: 13px; }
    .table-spec td.label { width: 38%; color: #9CA3AF; font-family: monospace; text-transform: uppercase; font-size: 11px; }
    .table-spec td.value { color: #FFFFFF; font-weight: 600; }
    .brief-box { background: #07090E; border: 1px solid #27272A; border-left: 3px solid #E58518; padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #D4D4D8; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL TACTICAL AIR OVERWATCH</div>
      <div class="tagline">FAA PART 107 CERTIFIED // RAPID DEPLOYMENT DESK</div>
      <div class="badge">[ MISSION ID: ${data.surveyId} ]</div>
    </div>
    <div class="content">
      <div class="section-title">// MISSION & TARGET SITE SPECIFICATIONS</div>
      <table class="table-spec">
        <tr>
          <td class="label">Principal / Client:</td>
          <td class="value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Entity / Agency:</td>
          <td class="value">${data.organization || "Private Client"}</td>
        </tr>
        <tr>
          <td class="label">Direct Email:</td>
          <td class="value"><a href="mailto:${data.email}" style="color: #E58518; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Contact Phone:</td>
          <td class="value"><a href="tel:${data.phone}" style="color: #E58518; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Operation Vector:</td>
          <td class="value" style="color: #FBBF24;">${data.operationType}</td>
        </tr>
        <tr>
          <td class="label">Target Site / Region:</td>
          <td class="value" style="color: #60A5FA;">${data.siteLocation}</td>
        </tr>
        <tr>
          <td class="label">Deployment Timeframe:</td>
          <td class="value">${data.timeframe}</td>
        </tr>
        <tr>
          <td class="label">Transmission Time:</td>
          <td class="value">${data.submittedAt}</td>
        </tr>
      </table>

      <div class="section-title">// MISSION SCOPE & OPERATIONAL REQUIREMENTS</div>
      <div class="brief-box">
        ${data.missionDetails.replace(/\n/g, "<br/>")}
      </div>
    </div>
    <div class="footer">
      HOWL Security Group LLC | Tactical Drone Overwatch Desk | FL & South Florida Regional Operations
    </div>
  </div>
</body>
</html>
  `;
}

export function generateAerialClientEmailTemplate(
  data: AerialSurveyPayload
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Aerial Survey Request Logged - HOWL Security Group</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #07090E; color: #F3F4F6; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0C1018; border: 1px solid #27272A; border-radius: 8px; overflow: hidden; }
    .header { background: #0A0D15; padding: 24px; border-bottom: 2px solid #E58518; text-align: center; }
    .logo-text { color: #E58518; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .tagline { color: #A1A1AA; font-size: 10px; letter-spacing: 3px; font-family: monospace; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #D4D4D8; }
    .status-card { background: #07090E; border: 1px solid #27272A; border-radius: 6px; padding: 18px; margin: 20px 0; text-align: left; }
    .badge-code { color: #E58518; font-family: monospace; font-weight: bold; font-size: 14px; }
    .footer { background: #07090E; padding: 20px; border-top: 1px solid #1F2430; text-align: center; font-size: 11px; font-family: monospace; color: #71717A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">HOWL SECURITY GROUP</div>
      <div class="tagline">TACTICAL AERIAL OVERWATCH // FAA PART 107</div>
    </div>
    <div class="content">
      <h2 style="color: #FFFFFF; font-size: 18px; text-transform: uppercase; margin-top: 0;">AERIAL SURVEY REQUEST CONFIRMED</h2>
      <p>Dear <strong>${data.fullName}</strong>,</p>
      <p>Your request for tactical aerial reconnaissance and drone overwatch has been securely logged into our <strong>Flight Operations Command</strong> console.</p>
      
      <div class="status-card">
        <div style="font-family: monospace; font-size: 11px; color: #9CA3AF; margin-bottom: 6px;">MISSION TRACKING DESIGNATOR:</div>
        <div class="badge-code">${data.surveyId}</div>
        <div style="font-size: 12px; color: #A1A1AA; margin-top: 10px; line-height: 1.5;">
          <strong>Operation Vector:</strong> <span style="color: #F3F4F6;">${data.operationType}</span><br/>
          <strong>Target Site:</strong> <span style="color: #F3F4F6;">${data.siteLocation}</span><br/>
          <strong>Timeframe:</strong> <span style="color: #F3F4F6;">${data.timeframe}</span>
        </div>
      </div>

      <p style="font-size: 13px; color: #CBD5E1;">
        A certified remote pilot (FAA Part 107) and tactical air coordinator will analyze the airspace feasibility, local NOTAMs, and reach out to you directly at <strong>${data.phone}</strong> or via this email.
      </p>

      <p style="margin-top: 24px; font-size: 12px; color: #71717A; font-family: monospace;">
        For urgent active emergency aerial dispatch, contact our 24/7 Operations Desk at <strong>(772) 940-4114</strong>.
      </p>
    </div>
    <div class="footer">
      HOWL Security Group LLC | Tactical Drone Overwatch Division | Fort Pierce, FL
    </div>
  </div>
</body>
</html>
  `;
}




