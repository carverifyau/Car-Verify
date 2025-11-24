# Customer Account System - Complete Flow

## 🎯 Overview
After a customer pays $1 for their first PPSR check, they automatically receive an email with a magic link to access their account. No passwords needed!

---

## 📧 What Happens After Payment

### 1. **Customer Completes Payment** ($1.00)
- Customer enters their email and vehicle details
- Completes payment via Stripe ($1 with $19 discount)
- Redirected to success page

### 2. **Stripe Webhook Fires** (Instant)
The webhook (`src/app/api/webhooks/stripe/route.ts`) automatically:

✅ **Creates User Account in Supabase**
- Email: customer's email
- User confirmed (no email verification needed)
- User metadata includes name

✅ **Creates Customer Record**
- Links to Supabase user ID
- Stores Stripe customer ID
- Stores customer name and email

✅ **Creates Subscription Record**
- Status: Active
- Amount: $20/month (recurring)
- Checks: 10 per month
- Next billing date tracked

✅ **Creates Report Record**
- Links to customer account
- Vehicle details stored
- Status: Pending
- Ready for manual processing

✅ **Generates Magic Link**
- Secure one-time login link
- Valid for 1 hour
- No password needed

✅ **Sends Welcome Email**
Using Gmail SMTP (`src/lib/email.ts`):

```
Subject: 🎉 Welcome to Car Verify - Your Account is Ready!

Content:
- Welcome message with payment confirmation
- Big "Access My Account" button with magic link
- What they can do in their account
- Subscription details ($1 today, $20/month after)
- PPSR report processing timeline
- Instructions for future logins
```

### 3. **Customer Receives Email** (Within seconds)
Email sent to: **carverifyau@gmail.com** → **customer's email**

The email includes:
- 🎉 Welcome message
- 🔐 Magic link button (1-hour expiry)
- ✅ Account features list
- 📊 Subscription details
- 📧 How to login in the future

### 4. **Customer Clicks Magic Link**
- Automatically logged in (no password)
- Redirected to `/account` dashboard
- Can immediately manage their subscription

---

## 🏠 Customer Account Dashboard (`/account`)

### Features Available:

**Subscription Status Card**
- Active/Canceled status
- Plan: $20/month
- Checks used: X / 10
- Checks remaining: Y
- Next billing date
- Cancel subscription button

**Quick Stats**
- Total reports generated
- Checks remaining this month
- Value used this month

**Reports History**
- All PPSR reports
- Download links (when completed)
- Vehicle details (rego/VIN)
- Status (Pending/Completed)
- Date created

**Account Actions**
- Cancel subscription (keeps access until period end)
- Sign out
- Request new reports (if checks remaining)

---

## 🔐 Future Logins

### Option 1: Magic Link from Email
If customer still has the original email:
1. Click the magic link again
2. Instant access (if not expired)

### Option 2: Request New Magic Link (`/login`)
1. Customer visits: `carverify.com.au/login`
2. Enters their email
3. Clicks "Send Magic Link"
4. Receives new email with fresh link
5. Clicks link → Logged in instantly

**No passwords ever needed!**

---

## 🛡️ Security Features

### Protected Routes
Middleware (`src/middleware.ts`) automatically:
- Checks if user is authenticated
- Redirects to `/login` if not
- Preserves the intended destination

### Row Level Security (RLS)
Database policies ensure:
- Customers can only see their own reports
- Customers can only access their own subscription
- Service role (webhooks) has full access

### Magic Link Security
- One-time use
- 1-hour expiration
- Secure token generation
- HTTPS only

---

## 📊 Database Schema

### Tables Created:

**`customers`**
```sql
- id (UUID, links to auth.users)
- email (unique)
- name
- stripe_customer_id (unique)
- created_at
- updated_at
```

**`subscriptions`**
```sql
- id (UUID)
- customer_id (FK to customers)
- stripe_subscription_id (unique)
- status (active, canceled, etc.)
- current_period_start
- current_period_end
- cancel_at
- checks_used (tracks usage)
- checks_limit (default: 10)
- created_at
- updated_at
```

**`reports`** (updated)
```sql
- ... existing fields ...
- customer_id (FK to customers) [NEW]
```

---

## 🔧 Technical Details

### Email Configuration
Uses Gmail SMTP:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=carverifyau@gmail.com
SMTP_PASS=neslopgxkcfmukxn (app password)
```

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://bmqyuoxyqzfzvwvwmsma.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]
SUPABASE_SERVICE_ROLE_KEY=[key]
```

### Webhook Flow
```
Payment Success (Stripe)
    ↓
Stripe sends webhook to: /api/webhooks/stripe
    ↓
1. Retrieve subscription details
2. Create user (if new)
3. Create customer record
4. Create subscription record
5. Link report to customer
6. Generate magic link
7. Send welcome email
    ↓
Customer receives email instantly
```

---

## ✅ Testing Checklist

### Before Going Live:

1. **Run SQL Schema**
   - Go to Supabase SQL Editor
   - Run `supabase-customers-schema.sql`
   - Verify tables created

2. **Test Payment Flow**
   - Make test payment with Stripe test card
   - Check webhook logs for account creation
   - Verify email is sent
   - Click magic link
   - Verify account dashboard loads

3. **Test Magic Link Login**
   - Visit `/login`
   - Enter test email
   - Check for new magic link email
   - Click link and verify login

4. **Test Subscription Management**
   - Login to account
   - Click "Cancel Subscription"
   - Verify status updates to "ending on [date]"
   - Check Stripe dashboard

5. **Verify Email Delivery**
   - Check Gmail sent folder
   - Test with different email providers
   - Verify links work in email clients

---

## 🚀 Production Deployment

### Environment Variables Needed:
```
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Stripe (already configured)
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...

# Email (already configured)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=carverifyau@gmail.com
SMTP_PASS=...

# App URL (update for production)
NEXT_PUBLIC_APP_URL=https://www.carverify.com.au
```

### Supabase Setup:
1. Enable Email Auth provider
2. Configure email templates (optional)
3. Set redirect URLs: `https://www.carverify.com.au/account`
4. Run SQL schema in production

---

## 📝 Customer Journey Summary

```
1. Visit carverify.com.au
2. Enter vehicle details
3. Pay $1
4. ✅ SUCCESS PAGE
5. 📧 CHECK EMAIL (within seconds)
6. 🔗 CLICK MAGIC LINK
7. 🏠 VIEW ACCOUNT DASHBOARD
8. ✅ Manage subscription, view reports, track usage
9. 🔄 Future: Visit /login to get new magic link
```

**Total time from payment to account access: < 1 minute**

---

## 💡 Key Benefits

✅ **Zero friction** - No password setup required
✅ **Instant access** - Magic link sent immediately after payment
✅ **Secure** - One-time links with expiration
✅ **Simple** - "Forgot password" never needed
✅ **Professional** - Beautiful welcome email
✅ **Transparent** - Clear subscription terms
✅ **Flexible** - Easy cancellation anytime

---

## 🎯 Next Steps

1. ✅ Account system is fully implemented
2. ⏳ Run the SQL schema in Supabase
3. ⏳ Test with a real payment
4. ⏳ Verify email delivery
5. ⏳ Enable Supabase email auth
6. ⏳ Deploy to production

**You're ready to give customers full account access!** 🚀
