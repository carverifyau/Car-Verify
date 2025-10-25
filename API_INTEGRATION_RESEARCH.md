# PPSR API Integration Research & Options

## Overview
This document outlines the research findings for integrating PPSR (Personal Property Securities Register) data into our vehicle history report platform.

## Option 1: Direct PPSR B2G API Access

### Official Government PPSR B2G (Business to Government) Channel
- **Provider**: Australian Financial Security Authority (AFSA)
- **Type**: Direct government API access
- **Technology**: SOAP-based WS-Security authentication

### Access Process
1. **Discovery Environment (Testing)**
   - Apply via PPSR Discovery Environment B2G Access Request form
   - Submit to: enquiries@ppsr.gov.au
   - Provide external IP addresses for whitelisting
   - Free testing environment for development and integration testing

2. **Production Environment**
   - Apply after successful Discovery testing
   - B2G account application form required
   - Minimum credit limit: $5000 for credit accounts
   - Payment terms: Net 30 days

### Technical Requirements
- SOAP API with WS-Security authentication
- Username/password as UserNameToken in WS-Security header
- Custom client interface development required
- IP whitelisting for security

### Pros
- Direct access to official PPSR data
- No third-party markup
- Complete control over integration

### Cons
- Complex SOAP implementation
- High minimum credit requirements
- Significant development overhead
- Direct government contract requirements

## Option 2: MotorWeb Australia API

### About MotorWeb
- **Provider**: MotorWeb Australia
- **Experience**: 20+ years in vehicle data services
- **Coverage**: Australia's leading NEVDIS broker
- **Technology**: RESTful APIs with real-time data access

### Services Offered
- Real-time PPSR checks
- NEVDIS database access
- VIN lookups and validation
- Registration status reports
- Stolen vehicle checks
- Write-off vehicle records
- Ownership history data

### Data Sources
- NEVDIS (National Exchange of Vehicle and Driver Information System)
- PPSR data integration
- 1000+ data points aggregated from multiple sources
- Real-time API access to trusted data providers

### Integration Benefits
- RESTful API (easier than SOAP)
- Pre-built vehicle data aggregation
- Comprehensive data coverage beyond just PPSR
- Established commercial service
- Per-transaction billing model

### Target Market
- Insurers
- Fleet managers
- Software development teams
- Government platforms
- eCommerce platforms

### Contact Required
- Custom pricing based on volume
- Demo/trial access available
- Contact via motorweb.au for pricing and API documentation

## Option 3: Other Third-Party Providers

### Equifax Australia
- Offers PPSR solutions for business and enterprise
- Established credit and data services provider
- Would require direct contact for API capabilities

### National Credit Insurance (NCI)
- Provides PPSR services
- Focus on credit and financial services
- Likely higher cost, specialized for finance industry

## Recommendation

Based on our research, **MotorWeb Australia** appears to be the best option for initial implementation:

### Why MotorWeb is Recommended:
1. **Easier Integration**: RESTful APIs vs complex SOAP implementation
2. **Lower Barrier to Entry**: No $5000 minimum credit requirements
3. **Comprehensive Data**: NEVDIS + PPSR + additional vehicle data
4. **Established Service**: 20+ years experience, proven reliability
5. **Per-Transaction Billing**: More suitable for startup/scaling business model
6. **Ready-to-Use**: Less development overhead compared to direct PPSR API

### Next Steps:
1. Contact MotorWeb Australia for:
   - API documentation
   - Pricing structure
   - Demo/trial access
   - Integration timeline

2. Evaluate MotorWeb trial before committing to direct PPSR B2G if:
   - Volume reaches enterprise levels
   - Cost per transaction with MotorWeb becomes prohibitive
   - Custom PPSR integration requirements emerge

## Implementation Timeline

### Phase 1: MotorWeb Integration (Recommended)
1. Contact MotorWeb for trial access
2. Review API documentation
3. Develop integration with SimpleReportBuilder
4. Test with sample data
5. Production deployment

### Phase 2: Evaluate Direct PPSR (Future)
1. Monitor transaction volumes
2. Calculate cost comparison
3. Apply for PPSR Discovery environment if warranted
4. Develop parallel integration option

## Technical Integration Points

### Current System Integration
Our new SimpleReportBuilder component has been designed with API integration in mind:
- Step 3: "PPSR Check" section ready for real data
- Form fields match PPSR data requirements
- State management prepared for async API calls

### Required Development
1. API service layer for MotorWeb integration
2. Error handling and retry logic
3. Data transformation to match our report format
4. Caching strategy for cost optimization
5. Admin dashboard integration for real-time data

## Cost Considerations

### MotorWeb
- Per-transaction billing
- Volume discounts available
- Contact required for specific pricing

### Direct PPSR
- Minimum $5000 credit account
- Per-search fees (government rates)
- Additional development costs for SOAP integration

## Security & Compliance

Both options provide:
- Secure API access
- Data encryption in transit
- Compliance with Australian data regulations
- Audit trails for data access

---

*Document created: October 2025*
*Research completed for Rego Reports platform*