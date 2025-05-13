export function generateVerificationOtpEmailTemplate(OTP) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Swift Event Scheduler - OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      h1 {
        color: #1e293b;
        font-size: 24px;
        margin-bottom: 20px;
      }
      .otp-box {
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 8px;
        color: #0f172a;
        background-color: #f1f5f9;
        padding: 12px 24px;
        border-radius: 6px;
        display: inline-block;
        margin: 20px 0;
      }
      p {
        color: #334155;
        line-height: 1.6;
        font-size: 16px;
        margin: 10px 0;
      }
      .footer {
        font-size: 12px;
        color: #94a3b8;
        text-align: center;
        margin-top: 30px;
      }

      @media only screen and (max-width: 480px) {
        .container {
          width: 90% !important;
          padding: 20px !important;
        }
        h1 {
          font-size: 20px !important;
        }
        .otp-box {
          font-size: 22px !important;
          padding: 10px 20px !important;
          letter-spacing: 6px !important;
        }
        p {
          font-size: 15px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verify Your Email</h1>
      <p>Thank you for signing up with <strong>Swift Event Scheduler</strong>.</p>
      <p>To complete your registration, please enter the following One-Time Password (OTP) to verify your email address:</p>
      <div class="otp-box">${OTP}</div>
      <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
      <p>If you did not request this, please ignore this email.</p>
      <div class="footer">
        &copy; 2025 Swift Event Scheduler. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
}


export function generateForgotPasswordEmailTemplate(resetPassword) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f4f4f4;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #6c5ce7;
      padding: 15px;
      border-radius: 10px 10px 0 0;
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
    }
    p {
      font-size: 16px;
      color: #333333;
      line-height: 1.5;
      margin: 10px 0;
    }
    .reset-button {
      display: inline-block;
      background-color: #6c5ce7;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 15px;
    }
    .footer {
      font-size: 14px;
      margin-top: 20px;
      color: #555555;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        padding: 15px !important;
      }
      .reset-button {
        width: 100% !important;
        padding: 12px 0 !important;
        font-size: 16px !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Swift Event Scheduler</div>
    <p>Hello,</p>
    <p>We received a request to reset your password.</p>
    <p>Click the button below to set a new password:</p>
    <a href="${resetPassword}" class="reset-button">Reset Password</a>
    <p>If the button above doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all;">${resetPassword}</p>
    <p>If you didn’t request this, please ignore this email.</p>
    <div class="footer">
      🎉 Stay organized, stay swift! <br>
      <b>Swift Event Scheduler Team</b>
    </div>
  </div>
</body>
</html>
`;
}



