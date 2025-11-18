# Analytics Setup Guide

## What's Being Tracked

We've implemented comprehensive conversion funnel tracking to understand where users drop off and why.

### Tracked Events:

1. **form_submitted** - User fills out homepage form
   - Tracks: vehicle_type (vin/rego), vehicle_id

2. **checkout_viewed** - User arrives at checkout page
   - Tracks: vehicle_info

3. **email_entered** - User enters valid email on checkout
   - Triggers when email field loses focus with valid email

4. **payment_button_clicked** - User clicks final payment button
   - Tracks: email_provided (true/false)

5. **redirected_to_stripe** - Successfully redirected to Stripe

6. **purchase_completed** - Conversion! (Success page)
   - Tracks: session_id

### Funnel Steps Tracked:

Each event also fires a `funnel_step` event for easy funnel visualization in Google Analytics.

---

## Setup Instructions

### Step 1: Create Google Analytics 4 Property

1. Go to https://analytics.google.com
2. Create new GA4 property for "Car Verify"
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)

### Step 2: Add Measurement ID

Edit `src/app/layout.tsx` and replace `G-XXXXXXXXXX` with your actual ID:

```typescript
// Replace this line (line 71):
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"

// And this line (line 81):
gtag('config', 'G-XXXXXXXXXX', {
```

### Step 3: Verify Tracking

1. Deploy to production
2. Go to Google Analytics → Reports → Realtime
3. Visit your site and go through the checkout flow
4. You should see events firing in realtime

---

## Viewing Analytics Data

### Conversion Funnel:

Go to **Google Analytics → Explore → Funnel Exploration**

Create funnel with these steps:
1. form_submitted
2. checkout_viewed
3. email_entered
4. payment_button_clicked
5. redirected_to_stripe
6. purchase_completed (conversion!)

This will show you EXACTLY where users drop off:
- Homepage to checkout (form abandonment)
- Checkout viewed but no email (price shock?)
- Email entered but didn't click pay (last minute hesitation)
- Clicked pay but didn't redirect (technical error)

### Key Questions Analytics Will Answer:

**Q: Are users reaching checkout but not converting due to price?**
- Compare `checkout_viewed` vs `email_entered`
- Big drop = price shock

**Q: Are users entering email but abandoning at payment?**
- Compare `email_entered` vs `payment_button_clicked`
- Big drop = commitment fear

**Q: Are technical issues blocking conversions?**
- Compare `payment_button_clicked` vs `redirected_to_stripe`
- Drop = API errors

---

## Current Setup (Already Done):

✅ Analytics library created (`src/lib/analytics.ts`)
✅ Homepage form tracking integrated
✅ Checkout page tracking integrated
✅ Email entry tracking (onBlur event)
✅ Payment button tracking
✅ Stripe redirect tracking
✅ Success page tracking (already had conversion event)

---

## Next Steps:

1. **Get your GA4 Measurement ID** from Google Analytics
2. **Replace `G-XXXXXXXXXX`** in layout.tsx with your real ID
3. **Deploy to production**
4. **Test the funnel** yourself
5. **Monitor for 24-48 hours**
6. **Analyze drop-off points** in GA4 Funnel Exploration

---

## Expected Insights After 100 Visitors:

With 100 visitors, you'll see patterns like:
- **90 form submissions** → 10% bounce on homepage (good)
- **85 checkout views** → 5 people back out during scanning (fine)
- **70 email entries** → 15 people see price and leave (18% price shock)
- **60 payment clicks** → 10 people abandon after email (commitment fear)
- **55 Stripe redirects** → 5 technical failures (need to fix)
- **3-5 conversions** → ~3-5% conversion rate

This data will tell you EXACTLY what to optimize next!
