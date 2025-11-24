import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface SendAccountAccessEmailParams {
  to: string
  name: string
  magicLink: string
  subscriptionAmount: string
}

export async function sendAccountAccessEmail({
  to,
  name,
  magicLink,
  subscriptionAmount,
}: SendAccountAccessEmailParams) {
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 10px 10px;
    }
    .button {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .info-box {
      background: #f0f9ff;
      border-left: 4px solid #2563eb;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      color: #6b7280;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .checklist {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .checklist li {
      margin: 10px 0;
      padding-left: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">🎉 Welcome to Car Verify!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your account is ready</p>
  </div>

  <div class="content">
    <h2>Hi ${name},</h2>

    <p><strong>Thank you for your payment of ${subscriptionAmount}!</strong></p>

    <p>Your Car Verify account has been created and your PPSR check is being processed. We've set up everything you need to manage your subscription and access your reports.</p>

    <div class="info-box">
      <strong>🔐 Secure Login - No Password Needed</strong><br>
      Click the button below to instantly access your account. This magic link is valid for 1 hour.
    </div>

    <div style="text-align: center;">
      <a href="${magicLink}" class="button">Access My Account</a>
    </div>

    <p style="font-size: 14px; color: #6b7280;">
      Or copy this link into your browser:<br>
      <a href="${magicLink}" style="color: #2563eb; word-break: break-all;">${magicLink}</a>
    </p>

    <div class="checklist">
      <h3 style="margin-top: 0;">What You Can Do In Your Account:</h3>
      <ul style="list-style: none; padding: 0;">
        <li>✅ View all your PPSR reports</li>
        <li>✅ Download completed certificates</li>
        <li>✅ Track your usage (10 checks per month)</li>
        <li>✅ Manage your subscription</li>
        <li>✅ Update billing information</li>
      </ul>
    </div>

    <div class="info-box">
      <strong>📊 Your Subscription Details:</strong><br>
      • First payment: ${subscriptionAmount}<br>
      • Recurring: $20/month (starting next month)<br>
      • Includes: 10 PPSR checks per month<br>
      • Cancel anytime with no penalties
    </div>

    <h3>Your PPSR Report Status:</h3>
    <p>Your vehicle report is currently being processed. You'll receive a separate email with your official PPSR certificate within 2-4 hours during business hours (Mon-Fri, 9AM-5PM AEST).</p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <h3>Need to Login Later?</h3>
    <p>Visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" style="color: #2563eb;">carverify.com.au/login</a> and enter your email to receive a new magic link anytime.</p>

    <p style="margin-top: 30px;">
      <strong>Questions or need help?</strong><br>
      Reply to this email or contact us at <a href="mailto:support@carverify.com.au" style="color: #2563eb;">support@carverify.com.au</a>
    </p>

    <p>Thanks for choosing Car Verify!</p>

    <p style="margin-top: 20px;">
      Best regards,<br>
      <strong>The Car Verify Team</strong>
    </p>
  </div>

  <div class="footer">
    <p>Car Verify - Official PPSR Certificate Checks</p>
    <p>You're receiving this email because you purchased a PPSR check from Car Verify.</p>
    <p style="margin-top: 10px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/account" style="color: #2563eb;">My Account</a> •
      <a href="mailto:support@carverify.com.au" style="color: #2563eb;">Support</a>
    </p>
  </div>
</body>
</html>
  `

  const emailText = `
Welcome to Car Verify!

Hi ${name},

Thank you for your payment of ${subscriptionAmount}!

Your Car Verify account has been created and your PPSR check is being processed.

ACCESS YOUR ACCOUNT:
Click here to login: ${magicLink}
(This link is valid for 1 hour)

WHAT YOU CAN DO IN YOUR ACCOUNT:
✅ View all your PPSR reports
✅ Download completed certificates
✅ Track your usage (10 checks per month)
✅ Manage your subscription
✅ Update billing information

YOUR SUBSCRIPTION DETAILS:
• First payment: ${subscriptionAmount}
• Recurring: $20/month (starting next month)
• Includes: 10 PPSR checks per month
• Cancel anytime with no penalties

YOUR PPSR REPORT STATUS:
Your vehicle report is currently being processed. You'll receive a separate email with your official PPSR certificate within 2-4 hours during business hours (Mon-Fri, 9AM-5PM AEST).

NEED TO LOGIN LATER?
Visit ${process.env.NEXT_PUBLIC_APP_URL}/login and enter your email to receive a new magic link anytime.

Questions or need help?
Email: support@carverify.com.au

Thanks for choosing Car Verify!

Best regards,
The Car Verify Team
  `

  await transporter.sendMail({
    from: `"Car Verify" <${process.env.SMTP_USER}>`,
    to,
    subject: '🎉 Welcome to Car Verify - Your Account is Ready!',
    text: emailText,
    html: emailHtml,
  })

  console.log('✅ Account access email sent to:', to)
}
