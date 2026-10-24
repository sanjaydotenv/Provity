import { _config } from "../config/config.js";
import transporter from "../services/sendEmail.service.js";

const sendEmail = async (to, subject, text, html) => {
    console.log(to,subject,text,html)
  try {
    const info = await transporter.sendMail({
      from: `ProVity ${_config.USER_EMAIL}`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
