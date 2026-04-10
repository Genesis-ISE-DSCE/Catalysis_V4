// lib/emailService.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailParams {
  to: string;
  name: string;
  eventName: string;
  teamName?: string;
}

export const sendRegistrationEmail = async ({ to, name, eventName, teamName }: EmailParams) => {
  // Theme colors from your UI
  const themeRed = "#dd273e";
  const bgPink = "#f5eaea";

  const htmlContent = `
    <div style="background-color: ${bgPink}; padding: 40px 20px; font-family: 'Arial', sans-serif; text-align: center;">
      <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 4px solid #000000; border-radius: 20px; overflow: hidden; box-shadow: 6px 6px 0px 0px #000000;">
        
        <div style="background-color: ${themeRed}; padding: 20px; border-bottom: 4px solid #000000;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">
            Trainer Registered!
          </h1>
        </div>

        <div style="padding: 30px 20px; color: #2d1216;">
          <div style="font-size: 40px; margin-bottom: 10px;">🎉</div>
          <h2 style="margin-top: 0; font-size: 22px;">Welcome, Trainer ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.5; opacity: 0.8; font-weight: bold;">
            Your registration was successful. Your details have been recorded and your adventure begins now.
          </p>

          <div style="background-color: #fdf3d7; border: 2px solid #000000; border-radius: 12px; padding: 15px; margin: 25px 0; text-align: left;">
            <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>⚔️ BATTLEGROUND:</strong> <span style="color: ${themeRed}; font-weight: bold;">${eventName}</span></p>
            ${teamName ? `<p style="margin: 0; font-size: 14px;"><strong>🛡️ TEAM:</strong> ${teamName}</p>` : ''}
          </div>

          <div style="background-color: #d4edda; border: 2px solid #000000; border-radius: 12px; padding: 15px; margin: 25px 0; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">📢 Join the Participants Community</p>
            <p style="margin: 0 0 12px 0; font-size: 13px; opacity: 0.8;">Stay updated with all event announcements, schedules, and important notices.</p>
            <a href="https://chat.whatsapp.com/K814lnQORHWIQ9KvggySGF" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: bold; border: 2px solid #000000;">
              💬 Join WhatsApp Group
            </a>
          </div>

          <p style="font-size: 16px; font-weight: bold; margin-bottom: 0;">
            See you at the battleground!
          </p>
        </div>
      </div>
      
      <div style="margin-top: 20px; font-size: 12px; color: #a0a0a0;">
        <p>This is an automated message. Please do not reply.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Event Registration" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Registration Confirmed: ${eventName} 🎉`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Success email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // We don't throw here to avoid crashing the whole registration if email fails
  }
};