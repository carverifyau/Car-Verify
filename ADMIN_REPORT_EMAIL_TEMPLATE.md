# Admin Email Template - Sending PPSR Reports

When sending completed PPSR reports to customers, use this email template to include their account access instructions.

---

## Email Template

**Subject:** Your PPSR Report is Ready - [REGO/VIN]

**Body:**

```
Hi [Customer Name],

Your PPSR certificate is ready! Please find your official PPSR report attached.

📄 REPORT DETAILS:
• Vehicle: [Rego/VIN]
• Report Date: [Date]
• Status: [Clear/Encumbered]

🎉 YOUR CAR VERIFY ACCOUNT IS NOW ACTIVE

We've set up your subscription account where you can:
✅ View all your PPSR reports
✅ Manage your subscription (10 checks per month for $20)
✅ Download reports anytime
✅ Track your usage

HOW TO ACCESS YOUR ACCOUNT:
1. Visit: https://www.carverify.com.au/login
2. Enter your email: [customer@email.com]
3. We'll send you a 6-digit code
4. Enter the code and you're in!

YOUR SUBSCRIPTION:
• First payment: $1.00 (already paid ✓)
• Monthly: $20/month (starting next month)
• Includes: 10 PPSR checks per month
• Cancel anytime with no penalties

Need help or have questions?
Just reply to this email!

Best regards,
The Car Verify Team

---
Car Verify - Official PPSR Certificate Checks
https://www.carverify.com.au
```

---

## Quick Steps for Admin

1. **Process the PPSR report** manually as usual
2. **Attach the PPSR PDF** to email
3. **Copy the template above** and customize:
   - Replace `[Customer Name]` with their name
   - Replace `[REGO/VIN]` with vehicle details
   - Replace `[Date]` with current date
   - Replace `[Clear/Encumbered]` with report status
   - Replace `[customer@email.com]` with their email
4. **Send from:** carverifyau@gmail.com
5. **Done!** Customer gets report + account access at the same time

---

## Why This Works Better

✅ Customer receives report and account access together
✅ No confusing "account ready" email before report arrives
✅ Customer only needs to think about their account when they have something to view
✅ Better user experience - everything arrives at once

---

## Notes

- The customer's account was **already created** when they paid $1
- They just need to **login for the first time** at /login
- Supabase will send them a 6-digit OTP code via email
- The code is valid for 1 hour
- They can login anytime in the future using the same process
