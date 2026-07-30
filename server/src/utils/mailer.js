import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

/**
 * Sends a plain notification email. Failures are logged, not thrown —
 * a broken mail server should never fail the API request that triggered it
 * (e.g. a visitor's contact form submission still succeeds and is saved).
 */
export async function sendMail({ to, subject, text, html }) {
  try {
    await getTransporter().sendMail({
      from: `"Portfolio Site" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[mailer] Failed to send email:", err.message);
  }
}

export async function sendVerificationEmail(to, otp) {
  await sendMail({
    to,
    subject: "Verify your email",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>It expires in 10 minutes.</p>`,
  });
}

export async function sendPasswordResetEmail(to, resetUrl) {
  await sendMail({
    to,
    subject: "Reset your password",
    text: `Reset your password using this link (valid for 30 minutes): ${resetUrl}`,
    html: `<p>Reset your password using the link below. It's valid for 30 minutes.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  });
}
