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

export function generateClubLeaderWelcomeEmailTemplate({ name, email, password }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Club Leader Account Created</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f4f4f4;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background: #ffffff;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #4f46e5;
      padding: 16px;
      border-radius: 10px 10px 0 0;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
    }
    p {
      font-size: 16px;
      color: #333333;
      line-height: 1.5;
      margin: 12px 0;
    }
    .info-box {
      background-color: #f9f9f9;
      padding: 16px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: left;
    }
    .info-box p {
      margin: 6px 0;
      font-size: 15px;
    }
    .button {
      display: inline-block;
      background-color: #4f46e5;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 20px;
    }
    .footer {
      font-size: 14px;
      margin-top: 25px;
      color: #555555;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        padding: 15px !important;
      }
      .button {
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
    <p>Hello <strong>${name}</strong>,</p>
    <p>Your Club Leader account has been <strong>successfully created</strong> by an admin.</p>
    <div class="info-box">
      <p><strong>Login Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
    </div>
    <p>For your security, please log in and <strong>update your password</strong> immediately.</p>
    <a href="#" class="button">Update Password</a>
    <div class="footer">
      🎉 Welcome aboard! <br />
      <strong>The Swift Event Scheduler Team</strong>
    </div>
  </div>
</body>
</html>
`;
}


export function generateVerificationSuccessEmailTemplate(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Account Verified</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
      body {
        font-family: 'Poppins', Arial, sans-serif;
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: #fff;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #1f1f1f;
        border-radius: 16px;
        padding: 40px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        text-align: center;
      }
      h1 {
        font-size: 2.8rem;
        margin-bottom: 10px;
        animation: fadeInDown 1s ease forwards;
      }
      p {
        font-size: 1.1rem;
        margin: 20px 0 40px;
        line-height: 1.5;
        animation: fadeInUp 1s ease forwards;
      }
      .checkmark {
        font-size: 4rem;
        color: #4caf50;
        animation: popIn 0.8s ease forwards;
      }
      .footer {
        font-size: 0.85rem;
        color: #aaa;
        margin-top: 30px;
      }
      /* Animations */
      @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        80% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); }
      }
      @keyframes fadeInDown {
        0% { opacity: 0; transform: translateY(-20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .highlight {
        background: linear-gradient(45deg, #ff6a00, #ee0979);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
      }
      a.button {
        display: inline-block;
        padding: 12px 28px;
        background: #2575fc;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        text-decoration: none;
        box-shadow: 0 6px 15px rgba(37,117,252,0.6);
        transition: background 0.3s ease;
      }
      a.button:hover {
        background: #1b52c1;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="checkmark">✅</div>
      <h1>Hi ${name},</h1>
      <p>Your account with <span class="highlight">Swift Event Scheduler</span> has been <strong>successfully verified!</strong></p>
      <p>You're all set to join exciting events and manage your schedule like a pro.</p>
      <a href="https://yourappdomain.com/login" class="button" target="_blank" rel="noopener noreferrer">
        Go to Dashboard
      </a>
      <div class="footer">
        <p>This is an automated message, please do not reply.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}



