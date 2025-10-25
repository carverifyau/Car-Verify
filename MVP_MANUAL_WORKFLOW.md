# Rego Reports MVP - Manual Processing Workflow

## Overview
The MVP version of Rego Reports processes vehicle reports manually while maintaining a professional customer experience. This approach allows us to launch quickly while validating the business model.

## Customer Journey

### 1. Homepage
- Customer enters vehicle registration or VIN
- Clean conversion funnel design (no pricing shown)
- Professional positioning against budget competitors

### 2. Checkout Process
- Two pricing options: Standard ($29) and Premium ($39)
- Default selection on Premium for revenue optimization
- Stripe payment processing with test keys for development

### 3. Payment Success
- Custom success page explaining manual processing
- Clear expectations: 2-4 hours during business hours
- Professional messaging about expert review process

### 4. Manual Processing (Admin)
- Admin dashboard at `/admin` for processing queue
- Manual PPSR searches using government portal
- Report compilation and email delivery

## Manual Processing Steps

### For Each Report Request:
1. **PPSR Check**: Log into PPSR portal and search vehicle
2. **NEVDIS Check**: Check write-off and stolen status
3. **Pricing Research**: Use RedBook/Glass for market valuation
4. **Report Compilation**: Create comprehensive report
5. **Email Delivery**: Send completed report to customer

### Processing Times:
- Standard Report: 2-3 hours
- Premium Report: 3-4 hours
- Business Hours: Mon-Fri, 9AM-5PM AEST

## Technical Implementation

### Mock Data System
- 6 realistic test scenarios available (clean, finance owing, written off, stolen, etc.)
- Use patterns like `ABC123`, `CLEAN`, `FINANCE`, `STOLEN` to trigger scenarios
- Full mock data in `/src/lib/mock-data.ts`

### Admin Interface
- Simple dashboard for viewing pending reports
- Manual processing workflow
- Status tracking (pending → processing → completed)

### Payment Processing
- Stripe integration with test keys
- Two-tier pricing strategy
- Automated order creation and tracking

## Environment Setup

### Required Environment Variables:
```bash
# Stripe (test keys for MVP)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Rego Reports"
```

## Testing Instructions

### End-to-End Test:
1. Visit homepage
2. Enter test registration: `ABC123` (NSW)
3. Complete checkout with test card: `4242 4242 4242 4242`
4. Visit `/admin` to see pending report
5. Process report manually
6. Verify customer receives success messaging

### Test Scenarios:
- Clean Vehicle: `ABC123`, `CLEAN`
- Finance Owing: `DEF456`, `FINANCE`
- Written Off: `GHI789`, `WRITEOFF`
- Stolen Vehicle: `JKL012`, `STOLEN`
- Multiple Issues: `MNO345`, `PROBLEM`
- Luxury Vehicle: `PQR678`, `LUXURY`

## Migration to Automated Processing

### When Ready for APIs:
1. Set up PPSR B2G credentials
2. Configure NEVDIS API access
3. Integrate RedBook/Glass pricing APIs
4. Modify report service to use real APIs instead of mock data
5. Maintain admin interface for exception handling

### Database Schema Ready:
- Report status includes `PENDING_MANUAL_REVIEW`
- Full audit trail for manual processing
- Ready for automated API integration

## Key URLs

- **Homepage**: `/`
- **Checkout**: `/checkout`
- **Success**: `/checkout/success`
- **Admin Dashboard**: `/admin`
- **Sample Report**: `/sample-report` (mock demonstration)

## Business Benefits

### MVP Advantages:
- Quick market entry without complex API setup
- Personal attention to each report ensures quality
- Validates pricing and demand before scaling
- Builds customer base and testimonials
- Professional experience maintains premium positioning

### Success Metrics:
- Conversion rate from homepage to checkout
- Average order value (Standard vs Premium)
- Customer satisfaction with manual processing
- Processing time efficiency
- Revenue per report processed

This manual approach positions us as premium experts while we build towards full automation.