# 🔗 API Setup Guide for Rego Reports

This guide covers all API integrations needed for full functionality.

## 🚨 CRITICAL: PPSR B2G API Setup

### 1. PPSR B2G Application Process

**Timeline**: 2-4 weeks
**Cost**: $2-3 per search + monthly fees
**Priority**: CRITICAL - Cannot launch without this

#### Required Documentation:
- [ ] Australian Business Number (ABN)
- [ ] Business Registration Certificate
- [ ] Professional Indemnity Insurance
- [ ] Compliance Declaration
- [ ] Technical Integration Plan

#### Application Steps:
1. Visit: https://www.ppsr.gov.au/b2g-hub/b2g-technical-resources
2. Download B2G Application Form
3. Complete technical specifications document
4. Submit with business documentation
5. Wait for approval (2-4 weeks)
6. Receive B2G credentials

#### Technical Requirements:
- [ ] Implement SOAP XML namespaces
- [ ] Handle fault codes properly
- [ ] Implement Australian timezone handling
- [ ] Secure credential storage
- [ ] Regular password rotation

### 2. Environment Variables Setup

Copy `.env.example` to `.env.local` and configure:

```bash
# PPSR B2G API (CRITICAL)
PPSR_B2G_ENDPOINT="https://b2g.ppsr.gov.au/ws/VehicleSearchService"
PPSR_B2G_USERNAME="your_ppsr_username"
PPSR_B2G_PASSWORD="your_ppsr_password"
```

### 3. Testing PPSR Integration

```bash
# Test B2G connection
npm run test:ppsr

# Test with real VIN
npm run test:ppsr -- --vin WVWZZZ1JZ3W386752

# Test with registration
npm run test:ppsr -- --rego ABC123 --state NSW
```

## 📋 SECONDARY APIs (Post-Launch)

### NEVDIS Data (Enhanced Write-offs)
**Provider**: InfoTrack, CITEC, or PropertyExchange
**Cost**: $3-5 per search
**Timeline**: 1-2 weeks after PPSR

```bash
NEVDIS_API_URL="https://api.infotrack.com.au/nevdis"
NEVDIS_API_KEY="your_nevdis_api_key"
```

### RedBook Valuations (Premium Reports)
**Provider**: RedBook Australia
**Cost**: $1-2 per valuation
**Timeline**: 1-2 weeks

```bash
REDBOOK_API_URL="https://api.redbook.com.au"
REDBOOK_API_KEY="your_redbook_api_key"
```

### ANCAP Safety Data
**Provider**: ANCAP
**Cost**: Often free for basic data
**Timeline**: 1 week

```bash
ANCAP_API_URL="https://api.ancap.com.au"
ANCAP_API_KEY="your_ancap_api_key"
```

## 🔐 Security Requirements

### API Key Management
- Store all credentials in environment variables
- Use different keys for development/production
- Implement automatic key rotation
- Monitor API usage and costs

### Rate Limiting
```bash
RATE_LIMIT_REQUESTS_PER_MINUTE="100"
```

### SSL/TLS Requirements
- All API calls must use HTTPS
- Implement certificate pinning for PPSR
- Validate SSL certificates

## 💰 Cost Breakdown per Report

### Standard Report ($29):
- PPSR B2G: $2.50
- Processing: $0.50
- **Total Cost**: $3.00
- **Gross Margin**: $26.00 (89.6%)

### Premium Report ($39):
- PPSR B2G: $2.50
- NEVDIS: $4.00
- RedBook: $1.50
- ANCAP: $0.50
- **Total Cost**: $8.50
- **Gross Margin**: $30.50 (78.2%)

## 🚀 Launch Strategy

### Phase 1: MVP (PPSR Only)
- [x] PPSR B2G integration
- [x] Basic report generation
- [x] Payment processing
- [ ] Production deployment

### Phase 2: Enhanced Data
- [ ] NEVDIS integration
- [ ] RedBook valuations
- [ ] Enhanced reporting

### Phase 3: Premium Features
- [ ] ANCAP safety data
- [ ] Real-time monitoring
- [ ] API for dealers

## 🧪 Testing Checklist

### PPSR B2G Testing:
- [ ] Connection test passes
- [ ] VIN search works
- [ ] Registration search works
- [ ] Error handling works
- [ ] Certificate generation works
- [ ] Fault codes handled properly

### Security Testing:
- [ ] Credentials properly encrypted
- [ ] No API keys in logs
- [ ] Rate limiting works
- [ ] SSL certificates valid

### Performance Testing:
- [ ] Reports generate in <3 seconds
- [ ] Handles concurrent requests
- [ ] Proper timeout handling
- [ ] Error recovery works

## 📞 Support Contacts

### PPSR B2G Support:
- Email: b2g.support@ppsr.gov.au
- Phone: 1300 007 777
- Hours: 8am-6pm AEST

### Technical Issues:
- Review B2G technical documentation
- Check fault code reference
- Verify namespaces and endpoints

## ⚠️ Critical Launch Requirements

**Cannot launch without:**
1. ✅ PPSR B2G credentials and working integration
2. ✅ Stripe payment processing
3. ✅ SSL certificate for production domain
4. ✅ Error monitoring and logging

**Should have for better experience:**
1. NEVDIS data integration
2. RedBook valuations
3. Live chat support
4. API monitoring dashboard

## 📊 Monitoring & Analytics

### API Monitoring:
- Track response times
- Monitor error rates
- Watch API costs
- Set up alerts for failures

### Business Metrics:
- Conversion rates by report type
- Revenue per user
- API cost per report
- Customer satisfaction scores

---

**Next Action**: Apply for PPSR B2G access immediately - this is the longest lead time and blocks everything else! 🚨