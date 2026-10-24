const verificationEmailTemplate = (UserName, OTP) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email - ProVity</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f7;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 520px;
          margin: 40px auto;
          padding: 32px 24px;
          background-color: #ffffff;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
        ">

          <h1 style="
            margin: 0 0 28px;
            text-align: center;
            color: #6c4cff;
            font-size: 30px;
          ">
            ProVity
          </h1>

          <h2 style="
            color: #18181b;
            font-size: 23px;
            margin-bottom: 12px;
          ">
            Verify your email address
          </h2>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.7;
          ">
            Hi ${escapeHtml(UserName)},
          </p>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.7;
          ">
            Thanks for joining ProVity! Please use the verification
            code below to complete your registration.
          </p>

          <div style="
            margin: 28px 0;
            padding: 22px;
            text-align: center;
            background-color: #f5f3ff;
            border: 1px dashed #8b5cf6;
            border-radius: 10px;
          ">

            <p style="
              margin: 0 0 10px;
              color: #71717a;
              font-size: 13px;
            ">
              YOUR VERIFICATION CODE
            </p>

            <h1 style="
              margin: 0;
              color: #6c4cff;
              font-size: 36px;
              letter-spacing: 10px;
            ">
              ${OTP}
            </h1>

          </div>

          <p style="
            color: #52525b;
            font-size: 14px;
            line-height: 1.7;
          ">
            This code expires in <strong>5 minutes</strong>.
            For your security, never share this code with anyone.
          </p>

          <p style="
            color: #52525b;
            font-size: 14px;
            line-height: 1.7;
          ">
            If you didn't create a ProVity account, you can safely
            ignore this email.
          </p>

          <hr style="
            margin: 28px 0 18px;
            border: none;
            border-top: 1px solid #e5e7eb;
          " />

          <p style="
            margin: 0;
            text-align: center;
            color: #71717a;
            font-size: 12px;
            line-height: 1.7;
          ">
            © ${new Date().getFullYear()} ProVity. All rights reserved.
            <br />
            Simple productivity. Better progress.
          </p>

        </div>

      </body>
    </html>
  `;
};

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export default verificationEmailTemplate;
