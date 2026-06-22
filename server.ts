import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON payloads
  app.use(express.json());

  // Allow search engine indexing (Google, Bing, etc.) while blocking AI crawlers (GPTBot, ClaudeBot, etc.)
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(
      "User-agent: Googlebot\n" +
      "Allow: /\n\n" +
      "User-agent: Bingbot\n" +
      "Allow: /\n\n" +
      "User-agent: DuckDuckBot\n" +
      "Allow: /\n\n" +
      "User-agent: GPTBot\n" +
      "Disallow: /\n\n" +
      "User-agent: ChatGPT-User\n" +
      "Disallow: /\n\n" +
      "User-agent: ClaudeBot\n" +
      "Disallow: /\n\n" +
      "User-agent: CCBot\n" +
      "Disallow: /\n\n" +
      "User-agent: Google-Extended\n" +
      "Disallow: /\n\n" +
      "User-agent: PerplexityBot\n" +
      "Disallow: /\n\n" +
      "User-agent: *\n" +
      "Allow: /"
    );
  });

  // API endpoint for submitting contact form requests
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, projectType, budget, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and message are required fields.",
        });
      }

      // Configure Nodemailer with SMTP credentials provided
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER || "techanalyst41@gmail.com";
      const smtpPass = process.env.SMTP_PASS || "techanalyst41@gmail.com";
      const recipient = process.env.CONTACT_RECIPIENT || "alxokeyo15@gmail.com";

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          // Do not fail on invalid certificates
          rejectUnauthorized: false
        }
      });

      // Prepare an elegant HTML layout for the email
      const mailOptions = {
        from: `"${name}" <${smtpUser}>`, // SMTP authentication typically requires sender to match user
        replyTo: email,
        to: recipient,
        subject: `New Enterprise Inquiry: ${projectType || "General Consultation"} from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Company: ${company || "N/A"}
Project Type: ${projectType || "N/A"}
Budget Range: ${budget || "N/A"}

Message:
${message}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Contact Inquiry</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 8px 0; color: #0f172a;">${phone || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company:</td>
                <td style="padding: 8px 0; color: #0f172a;">${company || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Type:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${projectType || "General Consultation"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Est. Budget:</td>
                <td style="padding: 8px 0; color: #0f172a; color: #059669; font-weight: bold;">${budget || "Not specified"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #4f46e5; border-radius: 4px;">
              <h4 style="margin-top: 0; margin-bottom: 10px; color: #1e293b;">Inquiry Message:</h4>
              <p style="color: #334155; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>

            <p style="font-size: 11px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
              This notification was generated automatically by the Tech Ninja portal custom backend.
            </p>
          </div>
        `,
      };

      // Send mail
      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    } catch (error: any) {
      console.error("Error sending dynamic contact email via SMTP:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to send email. Check your SMTP configuration or try again.",
        details: error?.message || "",
      });
    }
  });

  // Vite middleware configuration for serving the asset pipeline safely
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production client bundle hosting
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // PORT and host matching configuration instructions perfectly
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
