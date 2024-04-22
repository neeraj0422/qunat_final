// emailService.js
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set to true if your SMTP server requires a secure connection (e.g., Gmail)
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });
}

// function sendEmail(email, subject, htmlContent) {
function sendEmail(email, subject, dynamicData) {
  const transporter = createTransporter();

  // Load the HTML email template
  const templatePath = path.join(__dirname, "../templates/OTPTemplate.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  const htmlContent = replacePlaceholders(template, dynamicData);

  const mailOptions = {
    // from: process.env.FROM_EMAIL,
    from: `Quant11<${process.env.FROM_EMAIL}>`,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}

function replacePlaceholders(template, dynamicData) {
  Object.keys(dynamicData).forEach((key) => {
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    template = template.replace(placeholder, dynamicData[key]);
  });

  return template;
}

module.exports = {
  sendEmail,
};
