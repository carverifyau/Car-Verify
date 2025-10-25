# 🎭 Mock Report Testing Guide

This guide shows you how to test different vehicle scenarios using our enhanced mock data system.

## 🧪 Test Scenarios Available

### 1. Clean Vehicle (No Issues)
**Triggers**: Use any of these values
- **VIN**: `WVWZZZ1JZ3W386752` or anything containing "CLEAN"
- **Rego**: `ABC123` or anything containing "GOOD"

**Expected Results**:
- ✅ No finance owing
- ✅ Not stolen
- ✅ Not written off
- ✅ No recalls
- ✅ Good market value ($32,500)
- ✅ High price confidence

### 2. Finance Owing
**Triggers**:
- **VIN**: Anything containing "FINANCE" or "LOAN"
- **Rego**: `DEF456`

**Expected Results**:
- ⚠️ Finance owing: $28,500 to Westpac
- ⚠️ Outstanding Takata airbag recall
- 📊 Below market pricing ($24,500)

### 3. Written Off Vehicle
**Triggers**:
- **VIN**: Anything containing "WRITEOFF", "DAMAGE", or "ACCIDENT"
- **Rego**: `GHI789`

**Expected Results**:
- 🚨 Previously written off (repairable)
- 📉 Significantly reduced value ($15,500)
- ⚠️ Low price confidence

### 4. Stolen Vehicle (Worst Case)
**Triggers**:
- **VIN**: Anything containing "STOLEN" or "THEFT"
- **Rego**: `JKL012`

**Expected Results**:
- 🚨 Reported as stolen
- ⚠️ Finance owing: $42,000 to BMW Financial
- 🛑 DO NOT PURCHASE warning

### 5. Multiple Issues
**Triggers**:
- **VIN**: Anything containing "PROBLEM", "BAD", or "ISSUES"
- **Rego**: `MNO345`

**Expected Results**:
- 🚨 Written off (total loss)
- ⚠️ Finance owing: $35,000 + $15,000 lease
- ⚠️ Multiple outstanding recalls
- 📉 Very poor value ($22,000)

### 6. Luxury Vehicle
**Triggers**:
- **VIN**: Anything containing "LUXURY", "PREMIUM", or "PORSCHE"
- **Rego**: `PQR678`

**Expected Results**:
- ✅ Clean history
- 💰 High value ($245,000)
- ✅ Premium vehicle details
- ✅ High market confidence

## 🔬 How to Test

### Method 1: Using the Website
1. Go to the homepage
2. Enter one of the test patterns above
3. Select any Australian state
4. Click "Get Vehicle Report Now"
5. Complete checkout process
6. View the generated report

### Method 2: Direct API Testing
```bash
# Test clean vehicle
curl -X POST http://localhost:3000/api/generate-report \
  -H "Content-Type: application/json" \
  -d '{"vehicleInfo": {"type": "rego", "rego": "ABC123", "state": "NSW"}, "reportType": "premium"}'

# Test problematic vehicle
curl -X POST http://localhost:3000/api/generate-report \
  -H "Content-Type: application/json" \
  -d '{"vehicleInfo": {"type": "vin", "vin": "PROBLEMVIN123456"}, "reportType": "standard"}'
```

## 📊 Mock Data Features

### Realistic Timing
- PPSR queries: 0.5-1.5 seconds
- NEVDIS queries: 1-2.5 seconds
- Pricing queries: 0.5-1.5 seconds
- Total report generation: 2-4 seconds

### Comprehensive Vehicle Data
- Make, model, year, series
- Engine, transmission, fuel type
- Build date, compliance date
- Tare weight, GVM
- Body type, colour

### Financial Information
- Security interests with amounts
- Secured party details
- Registration dates
- Multiple interest types

### Safety & Compliance
- Recall information with status
- ANCAP safety ratings
- ADR compliance data

### Market Valuation
- Retail, trade, private values
- Market position analysis
- Price confidence levels
- Historical price trends
- Comparable sales data

## 🎯 Testing Checklist

### Before Real API Integration:
- [ ] Test all 6 scenarios successfully generate reports
- [ ] Verify different report types (Standard vs Premium)
- [ ] Check payment processing works end-to-end
- [ ] Confirm email delivery (if implemented)
- [ ] Test mobile responsiveness
- [ ] Verify loading states and animations
- [ ] Check error handling for invalid inputs

### Performance Testing:
- [ ] Multiple concurrent report generations
- [ ] Large VIN/rego number batches
- [ ] Network timeout scenarios
- [ ] Memory usage under load

### UI/UX Testing:
- [ ] Form validation messages
- [ ] Progress indicators during generation
- [ ] Report readability and formatting
- [ ] Print-friendly report layout
- [ ] PDF generation (if implemented)

## 🛠 Debugging Mock Data

### Console Logging
The mock system logs which scenario is being used:
```
🎭 Mock scenario: Clean Vehicle - No issues, perfect for demonstrating clean reports
🎭 NEVDIS Mock scenario: Clean Vehicle
🎭 Pricing Mock scenario: Clean Vehicle
```

### Accessing Raw Mock Data
All services include `rawData` with mock information:
```javascript
// In report response
{
  ppsr: {
    rawData: {
      mock: true,
      scenario: "Clean Vehicle",
      vehicleData: {...},
      nevdisData: {...},
      pricingData: {...}
    }
  }
}
```

## 🚀 Ready for Real APIs

When you're ready to switch to real APIs:

1. **Set environment variables**:
   ```bash
   PPSR_B2G_ENDPOINT="https://b2g.ppsr.gov.au/ws/VehicleSearchService"
   PPSR_B2G_USERNAME="your_username"
   PPSR_B2G_PASSWORD="your_password"
   ```

2. **The system automatically switches** from mock to real APIs when credentials are available

3. **Keep mock data** for testing edge cases and development

## 📞 Support During Testing

If you encounter issues:
1. Check browser console for error messages
2. Look for scenario logging messages
3. Verify the correct test patterns are being used
4. Check network tab for API call timing

The mock system is designed to be as realistic as possible while providing comprehensive test coverage for all scenarios you'll encounter in production! 🎭