# Manual PPSR Processing Workflow

## Current Setup

When a customer pays $14.99:
1. ✅ Stripe webhook stores order in Supabase as "pending"
2. ❌ **No email is sent automatically** (you do this manually)

---

## Simple Manual Process (Recommended for MVP)

### Step 1: Check Stripe Dashboard for New Payments

Go to: https://dashboard.stripe.com/payments

Look for recent $14.99 payments. Click to see:
- Customer email
- Vehicle info (in metadata):
  - VIN: `metadata.vehicleVin`
  - OR Rego: `metadata.vehicleRego` + State: `metadata.vehicleState`

### Step 2: Run PPSR Check

**Option A: Manual (Current)**
1. Go to https://www.ppsr.gov.au
2. Click "Vehicle Search"
3. Enter VIN or Rego + State
4. Pay $2 (or use your bulk account)
5. Download PDF certificate

**Option B: API (Future Automation)**
- Coming later when volume increases
- Auto-generate and email PDF

### Step 3: Email Customer

**Send email to customer with:**
- Subject: "Your PPSR Certificate - [REGO/VIN]"
- Body: Simple message (template below)
- Attachment: PPSR certificate PDF

**Email Template:**
```
Hi,

Your PPSR check is complete!

Attached is your official PPSR certificate for [VIN/REGO].

This certificate shows:
✅ Finance owing status
✅ Stolen vehicle status
✅ Write-off history

If you have any questions, just reply to this email.

Thanks,
Car Verify Team
```

### Step 4: Mark as Complete (Optional)

In Supabase, update the report status from "pending" → "completed"

---

## Even Simpler Option (No Supabase Needed)

Since Stripe already emails you when payments come in:

1. **Get payment notification email from Stripe**
2. **Click "View payment" in email**
3. **See customer email + vehicle info in metadata**
4. **Run PPSR check**
5. **Email PDF to customer**
6. **Done!**

You don't even need to check Supabase - Stripe has everything.

---

## Future Automation (When You Get 10+ Orders/Day)

When volume increases, we can automate:

1. **Webhook receives payment**
2. **Auto-run PPSR API** (integrate ppsr.gov.au API)
3. **Auto-generate PDF** (from PPSR response)
4. **Auto-send email** (via SendGrid/Resend)
5. **Customer gets PDF in 60 seconds**

But for now, manual is fine and takes 2-3 minutes per order.

---

## Quick Reference

**Where to find customer info:**
- Stripe Dashboard → Payments → Click payment → See metadata
- OR Supabase → Reports table → See vehicle_identifier

**What to send:**
- PPSR certificate PDF (from ppsr.gov.au)
- Simple email explaining what's in it

**How long it takes:**
- 2-3 minutes per order
- At 5 orders/day = 10-15 minutes of work

**When to automate:**
- When you hit 10+ orders/day
- Or when manual work > 30 min/day

---

## Email Sending Options

**Option 1: Gmail (Current)**
- Free
- Just reply to Stripe notification
- Attach PDF manually

**Option 2: SendGrid/Resend (Future)**
- Programmatic email sending
- Can automate later
- ~$10-20/month

**Option 3: Supabase Edge Functions (Future)**
- Fully automated workflow
- Webhook → PPSR API → Email → Done
- For when you want hands-off operation

---

## Bottom Line

**For MVP (now):**
- Manual is fine
- Takes 2-3 min per order
- Use Stripe dashboard + Gmail
- No code changes needed

**For scale (later):**
- Automate when volume justifies it
- We can build auto-email when ready
- Keep it simple until then
