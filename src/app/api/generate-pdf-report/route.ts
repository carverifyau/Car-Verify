import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

interface ReportData {
  customerRego: string
  customerState: string
  customerName?: string
  customerEmail: string
  make: string
  model: string
  year: string
  vin?: string
  bodyType?: string
  color?: string
  engineSize?: string
  odometer?: string
  transmission?: string
  fuelType?: string
  driveType?: string
  doors?: string
  seats?: string
  registrationExpiry?: string
  ppsrStatus: string
  securityInterests: any[]
  stolenStatus: string
  writeOffStatus: string
  retailValue?: string
  tradeValue?: string
  privateValue?: string
  status: string
  aiMarketResearch?: {
    tradeInValue: {
      low: number
      high: number
      average: number
    }
    privateSaleValue: {
      low: number
      high: number
      average: number
    }
    retailValue: {
      low: number
      high: number
      average: number
    }
    marketAnalysis: {
      demand: string
      trend: string
      keyFactors: string[]
      reliability: string
      knownIssues: string[]
      marketNotes: string
    }
    dataSource: string
    lastUpdated: string
    confidence: string
    generatedAt: string
    vehicleQueried: any
  }
}

function generateReportHTML(data: ReportData): string {
  const currentDate = new Date().toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const getStatusIcon = (status: string) => {
    return status === 'clear' ? '✓' : '⚠️'
  }

  const getStatusColor = (status: string) => {
    return status === 'clear' ? '#28a745' : '#dc3545'
  }

  // Helper function to generate pricing chart
  const generatePricingChart = (aiData: any) => {
    if (!aiData) return ''

    const maxValue = Math.max(
      aiData.tradeInValue?.high || 0,
      aiData.privateSaleValue?.high || 0,
      aiData.retailValue?.high || 0
    )

    const tradeHeight = ((aiData.tradeInValue?.average || 0) / maxValue) * 150
    const privateHeight = ((aiData.privateSaleValue?.average || 0) / maxValue) * 150
    const retailHeight = ((aiData.retailValue?.average || 0) / maxValue) * 150

    return `
      <div class="chart-container">
        <h3 style="text-align: center; margin-bottom: 20px; color: #1f2937;">🔄 AI Market Valuation Analysis</h3>
        <div class="bar-chart">
          <div class="bar" style="height: ${tradeHeight}px;">
            <div class="bar-value">$${(aiData.tradeInValue?.average || 0).toLocaleString()}</div>
            <div class="bar-label">Trade-In<br>Value</div>
          </div>
          <div class="bar" style="height: ${privateHeight}px;">
            <div class="bar-value">$${(aiData.privateSaleValue?.average || 0).toLocaleString()}</div>
            <div class="bar-label">Private Sale<br>Value</div>
          </div>
          <div class="bar" style="height: ${retailHeight}px;">
            <div class="bar-value">$${(aiData.retailValue?.average || 0).toLocaleString()}</div>
            <div class="bar-label">Retail<br>Value</div>
          </div>
        </div>
      </div>
    `
  }

  // Helper function to get demand class
  const getDemandClass = (demand: string) => {
    switch(demand?.toLowerCase()) {
      case 'high': return 'demand-high'
      case 'medium': return 'demand-medium'
      case 'low': return 'demand-low'
      default: return 'demand-medium'
    }
  }

  // Helper function to get trend class
  const getTrendClass = (trend: string) => {
    switch(trend?.toLowerCase()) {
      case 'increasing': return 'trend-up'
      case 'stable': return 'trend-stable'
      case 'decreasing': return 'trend-down'
      default: return 'trend-stable'
    }
  }

  // Helper function to get confidence class
  const getConfidenceClass = (confidence: string) => {
    switch(confidence?.toLowerCase()) {
      case 'high': return 'confidence-high'
      case 'medium': return 'confidence-medium'
      case 'low': return 'confidence-low'
      default: return 'confidence-medium'
    }
  }

  // Helper function to calculate risk score
  const calculateRiskScore = (aiData: any) => {
    if (!aiData || !aiData.marketAnalysis) return null

    let riskScore = 70 // Base score
    const marketAnalysis = aiData.marketAnalysis

    // Adjust based on demand
    if (marketAnalysis.demand === 'High') riskScore += 15
    else if (marketAnalysis.demand === 'Low') riskScore -= 15

    // Adjust based on trend
    if (marketAnalysis.trend === 'Increasing') riskScore += 10
    else if (marketAnalysis.trend === 'Decreasing') riskScore -= 10

    // Adjust based on known issues
    if (marketAnalysis.knownIssues?.length > 0) riskScore -= (marketAnalysis.knownIssues.length * 10)

    // Adjust based on reliability
    if (marketAnalysis.reliability === 'Excellent') riskScore += 10
    else if (marketAnalysis.reliability === 'Poor') riskScore -= 15

    // Keep between 0-100
    return Math.max(0, Math.min(100, Math.round(riskScore)))
  }

  // Helper function to get risk score class
  const getRiskScoreClass = (score: number) => {
    if (score >= 80) return 'risk-excellent'
    if (score >= 60) return 'risk-good'
    if (score >= 40) return 'risk-fair'
    return 'risk-poor'
  }

  // Helper function to get market position
  const getMarketPosition = (aiData: any) => {
    if (!aiData) return null

    const avgPrice = aiData.privateSaleValue.average
    const range = aiData.privateSaleValue.high - aiData.privateSaleValue.low
    const position = ((avgPrice - aiData.privateSaleValue.low) / range) * 100

    if (position >= 80) return { text: 'Premium Market', class: 'position-premium' }
    if (position >= 60) return { text: 'Above Average', class: 'position-above' }
    if (position >= 40) return { text: 'Market Average', class: 'position-average' }
    if (position >= 20) return { text: 'Below Average', class: 'position-below' }
    return { text: 'Budget Market', class: 'position-budget' }
  }

  // Helper function to generate quick insights
  const generateQuickInsights = (aiData: any) => {
    if (!aiData) return []

    const insights = []

    // Price insights
    const range = aiData.privateSaleValue.high - aiData.privateSaleValue.low
    const variance = (range / aiData.privateSaleValue.average) * 100
    if (variance > 30) {
      insights.push({ type: 'warning', text: `High price variance (${Math.round(variance)}%) - negotiate carefully` })
    }

    // Demand insights
    if (aiData.marketAnalysis.demand === 'High' && aiData.marketAnalysis.trend === 'Increasing') {
      insights.push({ type: 'success', text: 'Strong seller\'s market - prices may continue rising' })
    } else if (aiData.marketAnalysis.demand === 'Low') {
      insights.push({ type: 'info', text: 'Buyer\'s market - good negotiation opportunities' })
    }

    // Reliability insights
    if (aiData.marketAnalysis.reliability === 'Excellent') {
      insights.push({ type: 'success', text: 'Excellent reliability rating - lower ownership costs expected' })
    } else if (aiData.marketAnalysis.reliability === 'Poor') {
      insights.push({ type: 'warning', text: 'Poor reliability rating - factor in potential repair costs' })
    }

    // Known issues
    if (aiData.marketAnalysis.knownIssues?.length > 0) {
      insights.push({ type: 'warning', text: `${aiData.marketAnalysis.knownIssues.length} known issue(s) identified - review carefully` })
    }

    return insights.slice(0, 3) // Limit to 3 insights
  }

  // Helper function to format unavailable data
  const formatValue = (value: any, defaultText: string = 'Data Not Available') => {
    if (value === null || value === undefined || value === '' || value === 'Unknown') {
      return `<span class="info-value-unavailable">${defaultText}</span>`
    }
    return value
  }

  // Helper function to calculate market heat
  const getMarketHeat = (aiData: any) => {
    if (!aiData) return null

    let heatScore = 0

    // Demand factor
    if (aiData.marketAnalysis.demand === 'High') heatScore += 3
    else if (aiData.marketAnalysis.demand === 'Medium') heatScore += 2
    else heatScore += 1

    // Trend factor
    if (aiData.marketAnalysis.trend === 'Increasing') heatScore += 2
    else if (aiData.marketAnalysis.trend === 'Stable') heatScore += 1

    // Price variance factor (low variance = hot market)
    const range = aiData.privateSaleValue.high - aiData.privateSaleValue.low
    const variance = (range / aiData.privateSaleValue.average) * 100
    if (variance < 20) heatScore += 1

    if (heatScore >= 5) return { text: '🔥 Hot Market', class: 'market-hot', desc: 'High demand, prices rising' }
    if (heatScore >= 3) return { text: '🌡️ Warm Market', class: 'market-warm', desc: 'Steady demand, stable prices' }
    return { text: '❄️ Cool Market', class: 'market-cool', desc: 'Lower demand, good for buyers' }
  }

  // Helper function to generate AI-powered negotiation tips
  const generateNegotiationTips = (aiData: any) => {
    if (!aiData) {
      return [
        "Research similar vehicles in your area before negotiating",
        "Get a pre-purchase inspection to identify potential issues",
        "Be prepared to walk away if the price doesn't meet your expectations",
        "Consider the vehicle's condition and mileage in your offer",
        "Negotiate on the total price, not monthly payments"
      ]
    }

    const tips = []
    const marketAnalysis = aiData.marketAnalysis || {}
    const demand = marketAnalysis.demand?.toLowerCase() || 'medium'
    const trend = marketAnalysis.trend?.toLowerCase() || 'stable'
    const reliability = marketAnalysis.reliability?.toLowerCase() || 'average'

    // Base tips everyone should know
    tips.push("Research similar vehicles in your area to support your negotiation")
    tips.push("Get a pre-purchase inspection to identify any potential issues")

    // Market-specific tips
    if (demand === 'high') {
      tips.push("High demand market - be prepared to act quickly and negotiate less aggressively")
    } else if (demand === 'low') {
      tips.push("Low demand market - you have more negotiating power, use it wisely")
    } else {
      tips.push("Moderate demand - standard negotiation tactics should work well")
    }

    // Trend-specific tips
    if (trend === 'increasing') {
      tips.push("Values are rising - consider purchasing sooner rather than later")
    } else if (trend === 'decreasing') {
      tips.push("Values are declining - emphasize this trend in your negotiation")
    }

    // Reliability-specific tips
    if (reliability === 'excellent') {
      tips.push("Excellent reliability record - expect to pay closer to asking price")
    } else if (reliability === 'poor') {
      tips.push("Poor reliability history - use this to negotiate a lower price")
    }

    // Known issues tips
    if (marketAnalysis.knownIssues && marketAnalysis.knownIssues.length > 0) {
      tips.push(`Research common issues: ${marketAnalysis.knownIssues.slice(0, 2).join(', ')}`)
    }

    tips.push("Be prepared to walk away if the deal doesn't meet your expectations")
    tips.push("Consider timing - end of month/quarter may offer better deals")

    return tips.slice(0, 6) // Limit to 6 tips for readability
  }

  // Helper function to generate star ratings
  const generateStarRating = (reliability: string) => {
    const ratings = {
      'Excellent': { stars: 5, color: '#059669' },
      'Very Good': { stars: 4, color: '#0891b2' },
      'Good': { stars: 4, color: '#0891b2' },
      'Average': { stars: 3, color: '#d97706' },
      'Fair': { stars: 2, color: '#dc2626' },
      'Poor': { stars: 1, color: '#dc2626' }
    }

    const rating = ratings[reliability] || ratings['Average']
    const filledStars = '★'.repeat(rating.stars)
    const emptyStars = '☆'.repeat(5 - rating.stars)

    return {
      display: filledStars + emptyStars,
      color: rating.color,
      count: rating.stars
    }
  }

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Vehicle History Report - ${data.customerRego}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            background: white;
        }

        .report-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: center;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }

        .report-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .report-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }

        .vehicle-info {
            text-align: left;
        }

        .report-date {
            text-align: right;
        }

        .summary-section {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .summary-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #2563eb;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .summary-item {
            display: flex;
            align-items: center;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e9ecef;
        }

        .status-icon {
            font-size: 16px;
            margin-right: 10px;
            font-weight: bold;
        }

        .status-good { color: #28a745; }
        .status-warning { color: #dc3545; }

        .section {
            margin-bottom: 30px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            overflow: hidden;
        }

        .section-header {
            background: #2563eb;
            color: white;
            padding: 15px 20px;
            font-size: 14px;
            font-weight: bold;
        }

        .section-content {
            padding: 20px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .info-item {
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 8px;
        }

        .info-label {
            font-weight: bold;
            color: #666;
            margin-bottom: 3px;
        }

        .info-value {
            color: #333;
        }

        .info-value-unavailable {
            color: #9ca3af;
            font-style: italic;
        }

        .security-interest {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 10px;
        }

        .security-interest h4 {
            color: #856404;
            margin-bottom: 10px;
        }

        .valuation-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .valuation-item {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .valuation-label {
            font-weight: bold;
            color: #666;
            margin-bottom: 8px;
        }

        .valuation-value {
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            text-align: center;
            color: #666;
            font-size: 10px;
        }

        .disclaimer {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            font-size: 10px;
            color: #666;
        }

        /* AI Market Research Styles */
        .ai-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
            page-break-inside: avoid;
        }

        .ai-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #2563eb;
        }

        .ai-badge {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
        }

        .chart-container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .bar-chart {
            display: flex;
            align-items: end;
            height: 200px;
            gap: 30px;
            padding: 20px 0;
            margin: 20px 0;
        }

        .bar {
            background: linear-gradient(to top, #2563eb, #60a5fa);
            border-radius: 4px 4px 0 0;
            min-width: 80px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .bar-label {
            position: absolute;
            bottom: -25px;
            font-size: 11px;
            font-weight: bold;
            color: #374151;
            text-align: center;
            width: 100%;
        }

        .bar-value {
            position: absolute;
            top: -25px;
            font-size: 12px;
            font-weight: bold;
            color: #1f2937;
            text-align: center;
            width: 100%;
        }

        .market-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }

        .market-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
        }

        .market-card h4 {
            color: #2563eb;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .demand-indicator {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }

        .demand-high { color: #059669; }
        .demand-medium { color: #d97706; }
        .demand-low { color: #dc2626; }

        .trend-up { color: #059669; }
        .trend-stable { color: #d97706; }
        .trend-down { color: #dc2626; }

        .factors-list {
            list-style: none;
            padding: 0;
            margin: 10px 0;
        }

        .factors-list li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
        }

        .factors-list li:before {
            content: "▶";
            position: absolute;
            left: 0;
            color: #2563eb;
            font-size: 10px;
        }

        .confidence-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            margin-top: 10px;
        }

        .confidence-high {
            background: #d1fae5;
            color: #065f46;
        }

        .confidence-medium {
            background: #fef3c7;
            color: #92400e;
        }

        .confidence-low {
            background: #fee2e2;
            color: #991b1b;
        }

        .price-comparison {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }

        .price-range {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 8px 0;
            padding: 8px;
            background: white;
            border-radius: 4px;
        }

        .price-type {
            font-weight: bold;
            color: #374151;
            flex: 1;
        }

        .price-values {
            display: flex;
            gap: 15px;
            flex: 2;
            justify-content: space-around;
        }

        .price-low { color: #059669; }
        .price-avg { color: #2563eb; font-weight: bold; }
        .price-high { color: #dc2626; }

        /* AI Market Research Specific Styles */
        .market-overview-grid {
            display: flex;
            gap: 20px;
            margin: 20px 0;
            page-break-inside: avoid;
        }

        .pricing-chart-container {
            flex: 1;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin-right: 10px;
        }

        .market-summary-card {
            flex: 1;
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin-left: 10px;
        }

        .pricing-chart-container h4,
        .market-summary-card h4 {
            color: #1f2937;
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 15px 0;
            text-align: center;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
        }

        .chart {
            display: flex;
            justify-content: center;
            align-items: end;
            height: 160px;
            gap: 25px;
            padding: 30px 10px 40px 10px;
            margin: 10px 0;
            background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
            border-radius: 8px;
            border: 1px solid #f3f4f6;
        }

        .bar {
            background: linear-gradient(to top, #2563eb, #60a5fa);
            border-radius: 6px 6px 0 0;
            min-width: 60px;
            max-width: 80px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .bar-label {
            position: absolute;
            bottom: -35px;
            font-size: 11px;
            font-weight: bold;
            color: #374151;
            text-align: center;
            width: 100%;
            line-height: 1.2;
        }

        .bar-value {
            position: absolute;
            top: -30px;
            font-size: 11px;
            font-weight: bold;
            color: #1f2937;
            text-align: center;
            width: 120%;
            left: -10%;
            background: rgba(255,255,255,0.9);
            border-radius: 4px;
            padding: 2px 4px;
            border: 1px solid #e5e7eb;
        }

        .summary-stats {
            display: grid;
            gap: 12px;
        }

        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: white;
            border-radius: 6px;
            border-left: 3px solid #2563eb;
        }

        .stat-label {
            font-weight: 600;
            color: #374151;
            font-size: 12px;
        }

        .stat-value {
            font-weight: bold;
            font-size: 12px;
        }

        .price-breakdown-section {
            margin: 25px 0;
            page-break-inside: avoid;
        }

        .price-breakdown-section h4 {
            color: #1f2937;
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 15px 0;
            text-align: center;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
        }

        .price-comparison-table {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
        }

        .price-row {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
            align-items: center;
            min-height: 45px;
        }

        .price-row.header-row {
            background: #f8fafc;
            font-weight: bold;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
        }

        .price-row:not(.header-row) {
            border-bottom: 1px solid #f3f4f6;
        }

        .price-row:not(.header-row):last-child {
            border-bottom: none;
        }

        .price-cell {
            padding: 12px 15px;
            font-size: 12px;
            text-align: center;
        }

        .price-cell:first-child {
            text-align: left;
            font-weight: 600;
        }

        .price-cell:last-child {
            text-align: left;
            font-style: italic;
            color: #6b7280;
        }

        .market-analysis-section {
            margin: 25px 0;
            page-break-inside: avoid;
        }

        .analysis-grid {
            display: flex;
            gap: 20px;
        }

        .analysis-card {
            flex: 1;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
        }

        .analysis-card.warning-card {
            background: #fef3c7;
            border-color: #f59e0b;
        }

        .analysis-card h4 {
            color: #1f2937;
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 12px 0;
        }

        .warning-card h4 {
            color: #92400e;
        }

        .factor-list,
        .issue-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .factor-list li,
        .issue-list li {
            padding: 6px 0;
            padding-left: 18px;
            position: relative;
            font-size: 12px;
            line-height: 1.4;
        }

        .factor-list li:before {
            content: "▶";
            position: absolute;
            left: 0;
            color: #2563eb;
            font-size: 10px;
        }

        .issue-list li:before {
            content: "⚠";
            position: absolute;
            left: 0;
            color: #f59e0b;
            font-size: 12px;
        }

        .market-notes-section {
            margin: 25px 0;
            page-break-inside: avoid;
        }

        .market-notes-section h4 {
            color: #1f2937;
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 15px 0;
            text-align: center;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
        }

        .market-notes-content {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
        }

        .market-notes-content p {
            margin: 0;
            line-height: 1.6;
            font-size: 13px;
            color: #374151;
        }

        .data-source-section {
            margin: 20px 0;
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
        }

        .source-info {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            font-size: 11px;
        }

        .source-item {
            color: #6b7280;
        }

        .source-item strong {
            color: #374151;
        }

        /* AI Section Specific Styling */
        .ai-market-research-section {
            background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }

        .ai-market-research-section .section-header {
            background: linear-gradient(135deg, #2563eb, #60a5fa);
            color: white;
            margin: -25px -25px 25px -25px;
            padding: 20px 25px;
            border-radius: 10px 10px 0 0;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }

        /* Compact spacing for AI section */
        .ai-market-research-section .market-overview-grid {
            margin: 15px 0;
        }

        .ai-market-research-section .price-breakdown-section {
            margin: 20px 0;
        }

        .ai-market-research-section .market-analysis-section {
            margin: 20px 0;
        }

        .ai-market-research-section .market-notes-section {
            margin: 15px 0;
        }

        .ai-market-research-section .data-source-section {
            margin: 15px 0;
        }

        /* Risk Score and Market Position Styles */
        .risk-score-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0;
        }

        .risk-score-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            color: white;
            margin-right: 15px;
        }

        .risk-excellent { background: linear-gradient(135deg, #059669, #10b981); }
        .risk-good { background: linear-gradient(135deg, #0891b2, #06b6d4); }
        .risk-fair { background: linear-gradient(135deg, #d97706, #f59e0b); }
        .risk-poor { background: linear-gradient(135deg, #dc2626, #ef4444); }

        .risk-details h5 {
            margin: 0 0 5px 0;
            font-size: 14px;
            color: #1f2937;
        }

        .risk-details p {
            margin: 0;
            font-size: 12px;
            color: #6b7280;
        }

        .market-position-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin: 5px 0;
        }

        .position-premium { background: #fef3c7; color: #92400e; border: 2px solid #f59e0b; }
        .position-above { background: #d1fae5; color: #065f46; border: 2px solid #10b981; }
        .position-average { background: #e0e7ff; color: #3730a3; border: 2px solid #6366f1; }
        .position-below { background: #fef2f2; color: #991b1b; border: 2px solid #ef4444; }
        .position-budget { background: #f3f4f6; color: #374151; border: 2px solid #6b7280; }

        .insights-section {
            margin: 20px 0;
        }

        .insights-grid {
            display: grid;
            gap: 10px;
        }

        .insight-item {
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            border-left: 4px solid;
            display: flex;
            align-items: center;
        }

        .insight-item.success {
            background: #f0fdf4;
            border-left-color: #22c55e;
            color: #166534;
        }

        .insight-item.warning {
            background: #fffbeb;
            border-left-color: #f59e0b;
            color: #92400e;
        }

        .insight-item.info {
            background: #f0f9ff;
            border-left-color: #3b82f6;
            color: #1e40af;
        }

        .insight-item::before {
            content: "💡";
            margin-right: 8px;
            font-size: 14px;
        }

        .insight-item.success::before { content: "✅"; }
        .insight-item.warning::before { content: "⚠️"; }
        .insight-item.info::before { content: "ℹ️"; }

        /* Market Heat Indicator Styles */
        .market-heat-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
            text-align: center;
        }

        .market-hot {
            background: linear-gradient(135deg, #dc2626, #ef4444);
            color: white;
            box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
        }

        .market-warm {
            background: linear-gradient(135deg, #d97706, #f59e0b);
            color: white;
            box-shadow: 0 0 10px rgba(217, 119, 6, 0.3);
        }

        .market-cool {
            background: linear-gradient(135deg, #0891b2, #06b6d4);
            color: white;
            box-shadow: 0 0 10px rgba(8, 145, 178, 0.3);
        }

        /* Negotiation Range Styles */
        .negotiation-section {
            background: #f8fafc;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin: 15px 0;
        }

        .negotiation-range {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 15px 0;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }

        .range-item {
            text-align: center;
            flex: 1;
        }

        .range-label {
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .range-value {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
        }

        .range-separator {
            color: #9ca3af;
            font-size: 20px;
            margin: 0 10px;
        }

        .savings-highlight {
            background: #d1fae5;
            color: #065f46;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
        }

        /* Star Rating Styles */
        .star-rating {
            display: inline-block;
            font-size: 18px;
            margin: 0 5px;
        }

        .reliability-section {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            background: white;
            border-radius: 8px;
            margin: 10px 0;
        }

        .reliability-label {
            font-size: 14px;
            font-weight: bold;
            color: #374151;
            margin-right: 10px;
        }

        .reliability-text {
            font-size: 12px;
            color: #6b7280;
            margin-left: 10px;
        }

        @media print {
            .report-container {
                max-width: none;
                padding: 15px;
            }

            .section {
                page-break-before: auto;
                page-break-after: auto;
                page-break-inside: avoid;
                margin-bottom: 30px;
            }

            .market-overview-grid {
                page-break-inside: avoid;
                page-break-before: auto;
                page-break-after: auto;
            }

            .price-breakdown-section {
                page-break-inside: avoid;
                page-break-before: auto;
                page-break-after: auto;
            }

            .market-analysis-section {
                page-break-inside: avoid;
                page-break-before: auto;
                page-break-after: auto;
            }

            .market-notes-section {
                page-break-inside: avoid;
                page-break-before: auto;
                page-break-after: auto;
            }

            .ai-section {
                page-break-inside: avoid;
            }

            .chart-container {
                page-break-inside: avoid;
            }

            /* AI Section specific print styling */
            .ai-market-research-section {
                page-break-inside: avoid;
                page-break-before: auto;
                margin-bottom: 0;
                min-height: 600px; /* Encourage page break if less than this space available */
            }

            .ai-market-research-section .section-content {
                page-break-inside: auto;
            }

            /* Force smaller spacing in print */
            .ai-market-research-section .market-overview-grid,
            .ai-market-research-section .price-breakdown-section,
            .ai-market-research-section .market-analysis-section,
            .ai-market-research-section .market-notes-section,
            .ai-market-research-section .data-source-section {
                margin: 10px 0;
            }

            /* Reduce chart height for better fit */
            .ai-market-research-section .chart {
                height: 140px;
                padding: 20px 10px 30px 10px;
            }

            .ai-market-research-section .pricing-chart-container,
            .ai-market-research-section .market-summary-card {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">🚗 CAR VERIFY</div>
            <div class="report-title">Vehicle History Report</div>
            <div class="report-info">
                <div class="vehicle-info">
                    <strong>${data.year || 'Unknown'} ${data.make || 'Unknown'} ${data.model || 'Unknown'}</strong><br>
                    Registration: ${data.customerRego} (${data.customerState})
                </div>
                <div class="report-date">
                    Report Date: ${currentDate}<br>
                    Report ID: ${Date.now()}
                </div>
            </div>
        </div>

        <!-- Quick Summary -->
        <div class="summary-section">
            <div class="summary-title">📊 Quick Summary</div>
            <div class="summary-grid">
                <div class="summary-item">
                    <span class="status-icon ${data.ppsrStatus === 'clear' ? 'status-good' : 'status-warning'}">${getStatusIcon(data.ppsrStatus)}</span>
                    <span>Finance Check: ${data.ppsrStatus === 'clear' ? 'Clear' : 'Encumbered'}</span>
                </div>
                <div class="summary-item">
                    <span class="status-icon ${data.stolenStatus === 'clear' ? 'status-good' : 'status-warning'}">${getStatusIcon(data.stolenStatus)}</span>
                    <span>Stolen Check: ${data.stolenStatus === 'clear' ? 'Clear' : 'Reported Stolen'}</span>
                </div>
                <div class="summary-item">
                    <span class="status-icon ${data.writeOffStatus === 'clear' ? 'status-good' : 'status-warning'}">${getStatusIcon(data.writeOffStatus)}</span>
                    <span>Write-off Check: ${data.writeOffStatus === 'clear' ? 'Clear' : 'Written Off'}</span>
                </div>
                <div class="summary-item">
                    <span class="status-icon status-good">✓</span>
                    <span>Registration: Current</span>
                </div>
            </div>
        </div>

        <!-- Vehicle Details -->
        <div class="section">
            <div class="section-header">🚙 Vehicle Information</div>
            <div class="section-content">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Make</div>
                        <div class="info-value">${formatValue(data.make)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Model</div>
                        <div class="info-value">${formatValue(data.model)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Year</div>
                        <div class="info-value">${formatValue(data.year)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Body Type</div>
                        <div class="info-value">${formatValue(data.bodyType)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">VIN</div>
                        <div class="info-value">${formatValue(data.vin)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Color</div>
                        <div class="info-value">${formatValue(data.color)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Engine Size</div>
                        <div class="info-value">${formatValue(data.engineSize)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Fuel Type</div>
                        <div class="info-value">${formatValue(data.fuelType)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Transmission</div>
                        <div class="info-value">${formatValue(data.transmission)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Odometer</div>
                        <div class="info-value">${formatValue(data.odometer)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Drive Type</div>
                        <div class="info-value">${formatValue(data.driveType)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Doors</div>
                        <div class="info-value">${formatValue(data.doors)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Seats</div>
                        <div class="info-value">${formatValue(data.seats)}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Registration Expiry</div>
                        <div class="info-value">${formatValue(data.registrationExpiry)}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PPSR Security Interests -->
        <div class="section">
            <div class="section-header">🛡️ PPSR Security Interest Check</div>
            <div class="section-content">
                ${data.ppsrStatus === 'clear' ?
                    '<p style="color: #28a745; font-weight: bold;">✓ No active security interests found</p>' :
                    data.securityInterests.map(interest => `
                        <div class="security-interest">
                            <h4>⚠️ Security Interest Found</h4>
                            <p><strong>Secured Party:</strong> ${interest.securedParty || 'Not specified'}</p>
                            <p><strong>Type:</strong> ${interest.type || 'Not specified'}</p>
                            <p><strong>Date Registered:</strong> ${interest.dateRegistered || 'Not specified'}</p>
                            <p><strong>Amount:</strong> ${interest.amount || 'Not specified'}</p>
                            <p><strong>Status:</strong> ${interest.status || 'Active'}</p>
                        </div>
                    `).join('')
                }
            </div>
        </div>

        <!-- AI Market Research & Analysis -->
        ${data.aiMarketResearch ? `
        <div class="section ai-market-research-section">
            <div class="section-header">📊 Expert Market Research & Analysis</div>
            <div class="section-content">
                <!-- Comprehensive Pricing Charts -->
                <div class="market-overview-grid">
                    <div class="pricing-chart-container">
                        <h4>Market Pricing Analysis</h4>
                        ${generatePricingChart(data.aiMarketResearch)}
                    </div>

                    <div class="market-summary-card">
                        <h4>Market Summary</h4>
                        <div class="summary-stats">
                            <div class="stat-item">
                                <span class="stat-label">Market Demand:</span>
                                <span class="stat-value ${getDemandClass(data.aiMarketResearch.marketAnalysis?.demand || 'Medium')}">${data.aiMarketResearch.marketAnalysis?.demand || 'Medium'}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Price Trend:</span>
                                <span class="stat-value ${getTrendClass(data.aiMarketResearch.marketAnalysis?.trend || 'Stable')}">${data.aiMarketResearch.marketAnalysis?.trend || 'Stable'}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Reliability:</span>
                                <span class="stat-value">
                                    ${(() => {
                                        const reliability = data.aiMarketResearch.marketAnalysis?.reliability || 'Good'
                                        const starRating = generateStarRating(reliability)
                                        return `
                                        <span class="star-rating" style="color: ${starRating.color};">${starRating.display}</span>
                                        <span style="margin-left: 5px;">${reliability}</span>
                                        `
                                    })()}
                                </span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Data Confidence:</span>
                                <span class="stat-value ${getConfidenceClass(data.aiMarketResearch.confidence || 'High')}">${data.aiMarketResearch.confidence || 'High'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Risk Assessment & Market Position -->
                <div class="market-overview-grid">
                    <div class="pricing-chart-container">
                        <h4>🎯 AI Risk Assessment</h4>
                        ${(() => {
                            const riskScore = calculateRiskScore(data.aiMarketResearch)
                            const riskClass = getRiskScoreClass(riskScore)
                            return `
                            <div class="risk-score-container">
                                <div class="risk-score-circle ${riskClass}">
                                    ${riskScore}
                                </div>
                                <div class="risk-details">
                                    <h5>Investment Score</h5>
                                    <p>${riskScore >= 80 ? 'Excellent choice' : riskScore >= 60 ? 'Good investment' : riskScore >= 40 ? 'Fair option' : 'Higher risk'}</p>
                                </div>
                            </div>
                            `
                        })()}
                    </div>

                    <div class="market-summary-card">
                        <h4>📍 Market Position</h4>
                        ${(() => {
                            const position = getMarketPosition(data.aiMarketResearch)
                            return `
                            <div style="text-align: center; margin: 20px 0;">
                                <div class="market-position-badge ${position.class}">
                                    ${position.text}
                                </div>
                                <p style="margin: 10px 0; font-size: 12px; color: #6b7280;">
                                    Based on current market pricing analysis
                                </p>
                            </div>
                            `
                        })()}
                    </div>
                </div>

                <!-- Market Heat Indicator -->
                ${(() => {
                    const marketHeat = getMarketHeat(data.aiMarketResearch)
                    return `
                    <div class="market-heat-section">
                        <h4>🔥 Market Heat Indicator</h4>
                        <div style="text-align: center; margin: 20px 0;">
                            <div class="market-heat-badge ${marketHeat.class || 'heat-moderate'}">
                                <div class="heat-icon">${marketHeat.icon || '📊'}</div>
                                <div class="heat-text">${marketHeat.text || 'Market Analysis Unavailable'}</div>
                                <div class="heat-level">${marketHeat.level || 3}/5</div>
                            </div>
                            <p style="margin: 15px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">
                                ${marketHeat.description || 'Market analysis data not available'}
                            </p>
                        </div>
                    </div>
                    `
                })()}

                <!-- AI Negotiation Tips -->
                ${(() => {
                    const negotiationTips = generateNegotiationTips(data.aiMarketResearch)
                    return `
                    <div class="negotiation-section">
                        <h4>💡 Smart Negotiation Tips</h4>
                        <div class="negotiation-content">
                            <p style="font-size: 12px; color: #6b7280; margin-bottom: 15px; line-height: 1.4;">
                                AI-powered negotiation advice based on current market conditions and vehicle analysis:
                            </p>
                            <ul style="margin: 0; padding-left: 15px; font-size: 11px; color: #374151; line-height: 1.5;">
                                ${negotiationTips.map(tip => `<li style="margin-bottom: 8px; padding-left: 5px;">${tip}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    `
                })()}

                <!-- Quick AI Insights -->
                ${(() => {
                    const insights = generateQuickInsights(data.aiMarketResearch)
                    if (insights.length === 0) return ''
                    return `
                    <div class="insights-section">
                        <h4>💡 AI Market Insights</h4>
                        <div class="insights-grid">
                            ${insights.map(insight => `
                                <div class="insight-item ${insight.type}">
                                    ${insight.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    `
                })()}

                <!-- Detailed Price Breakdown -->
                <div class="price-breakdown-section">
                    <h4>Detailed Price Analysis</h4>
                    <div class="price-comparison-table">
                        <div class="price-row header-row">
                            <div class="price-cell">Valuation Type</div>
                            <div class="price-cell">Low Range</div>
                            <div class="price-cell">High Range</div>
                            <div class="price-cell">Average</div>
                            <div class="price-cell">Market Position</div>
                        </div>

                        <div class="price-row">
                            <div class="price-cell"><strong>Trade-in Value</strong></div>
                            <div class="price-cell">$${data.aiMarketResearch.tradeInValue.low?.toLocaleString() || 'N/A'}</div>
                            <div class="price-cell">$${data.aiMarketResearch.tradeInValue.high?.toLocaleString() || 'N/A'}</div>
                            <div class="price-cell"><strong>$${data.aiMarketResearch.tradeInValue.average?.toLocaleString() || 'N/A'}</strong></div>
                            <div class="price-cell">Dealer purchase price</div>
                        </div>

                        <div class="price-row">
                            <div class="price-cell"><strong>Private Sale Value</strong></div>
                            <div class="price-cell">$${data.aiMarketResearch.privateSaleValue.low?.toLocaleString() || 'N/A'}</div>
                            <div class="price-cell">$${data.aiMarketResearch.privateSaleValue.high?.toLocaleString() || 'N/A'}</div>
                            <div class="price-cell"><strong>$${data.aiMarketResearch.privateSaleValue.average?.toLocaleString() || 'N/A'}</strong></div>
                            <div class="price-cell">Private party sale</div>
                        </div>

                        <div class="price-row">
                            <div class="price-cell"><strong>Retail Value</strong></div>
                            <div class="price-cell">$${data.aiMarketResearch.retailValue.low?.toLocaleString() || 'N/A'}</div>
                            <div class="price-cell">$${data.aiMarketResearch.retailValue.high?.toLocaleString() || 'N/A'}</div>
                            <div class="price-cell"><strong>$${data.aiMarketResearch.retailValue.average?.toLocaleString() || 'N/A'}</strong></div>
                            <div class="price-cell">Dealer retail price</div>
                        </div>
                    </div>
                </div>

                <!-- Market Analysis Details -->
                <div class="market-analysis-section">
                    <div class="analysis-grid">
                        <div class="analysis-card">
                            <h4>🎯 Key Market Factors</h4>
                            <ul class="factor-list">
                                ${data.aiMarketResearch.marketAnalysis.keyFactors.map(factor => `<li>${factor}</li>`).join('')}
                            </ul>
                        </div>

                        ${data.aiMarketResearch.marketAnalysis.knownIssues.length > 0 ? `
                        <div class="analysis-card warning-card">
                            <h4>⚠️ Known Issues</h4>
                            <ul class="issue-list">
                                ${data.aiMarketResearch.marketAnalysis.knownIssues.map(issue => `<li>${issue}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Comprehensive Market Notes -->
                <div class="market-notes-section">
                    <h4>📊 Detailed Market Analysis</h4>
                    <div class="market-notes-content">
                        <p>${data.aiMarketResearch.marketAnalysis.marketNotes}</p>
                    </div>
                </div>

                <!-- Data Source and Timestamp -->
                <div class="data-source-section">
                    <div class="source-info">
                        <div class="source-item">
                            <strong>Data Source:</strong> ${data.aiMarketResearch.dataSource}
                        </div>
                        <div class="source-item">
                            <strong>Last Updated:</strong> ${new Date(data.aiMarketResearch.lastUpdated).toLocaleDateString()}
                        </div>
                        <div class="source-item">
                            <strong>Analysis Generated:</strong> ${new Date(data.aiMarketResearch.generatedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Market Valuation -->
        ${data.retailValue || data.privateValue || data.tradeValue ? `
        <div class="section">
            <div class="section-header">💰 Market Valuation</div>
            <div class="section-content">
                <div class="valuation-grid">
                    <div class="valuation-item">
                        <div class="valuation-label">Trade-in Value</div>
                        <div class="valuation-value">${data.tradeValue || 'N/A'}</div>
                    </div>
                    <div class="valuation-item">
                        <div class="valuation-label">Private Sale Value</div>
                        <div class="valuation-value">${data.privateValue || 'N/A'}</div>
                    </div>
                    <div class="valuation-item">
                        <div class="valuation-label">Retail Value</div>
                        <div class="valuation-value">${data.retailValue || 'N/A'}</div>
                    </div>
                </div>
                <p style="margin-top: 15px; font-size: 10px; color: #666;">
                    * Valuations are estimates based on current market conditions and vehicle specifications.
                </p>
            </div>
        </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
            <p><strong>Car Verify</strong> - Professional Vehicle History Reports</p>
            <p>Generated on ${currentDate} | Report ID: ${Date.now()}</p>

            <div class="disclaimer">
                <p><strong>DISCLAIMER:</strong> This report is based on information available at the time of generation.
                While every effort is made to ensure accuracy, Car Verify cannot guarantee the completeness or
                accuracy of all information. This report should be used as a guide only and professional advice
                should be sought before making any purchasing decisions.</p>

                <p style="margin-top: 10px;"><strong>DATA AVAILABILITY:</strong> Fields marked as <span class="info-value-unavailable">"Data Not Available"</span> indicate that the specific information could not be obtained from available data sources at the time of report generation. This may be due to limited API access or data source availability.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  let browser: any = null

  try {
    const reportData: ReportData = await request.json()

    console.log('Generating PDF for report:', reportData.customerRego)

    // Generate HTML content
    const htmlContent = generateReportHTML(reportData)
    console.log('HTML content generated, length:', htmlContent.length)

    // Launch Puppeteer with serverless-compatible settings
    console.log('Launching Puppeteer browser...')

    // Detect if we're in development or production
    const isDev = process.env.NODE_ENV === 'development'

    const launchOptions: any = {
      args: isDev
        ? [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-web-security'
          ]
        : chromium.args,
      headless: true,
      timeout: 30000
    }

    // In production, use serverless Chrome binary
    if (!isDev) {
      launchOptions.executablePath = await chromium.executablePath()
      launchOptions.defaultViewport = chromium.defaultViewport
    }
    // In development, use local Chrome (path auto-detected by puppeteer-core)
    else {
      // Try common Chrome paths for macOS
      const { execSync } = require('child_process')
      try {
        // Try to find Chrome using which command (works on macOS/Linux)
        const chromePath = execSync('which google-chrome-stable || which google-chrome || which chromium-browser || echo "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"')
          .toString()
          .trim()
        if (chromePath) {
          launchOptions.executablePath = chromePath
        }
      } catch (error) {
        // Fallback to common macOS Chrome location
        launchOptions.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      }
    }

    console.log('Launching browser with config:', { isDev, executablePath: launchOptions.executablePath?.substring(0, 50) })
    browser = await puppeteer.launch(launchOptions)
    console.log('Browser launched successfully')

    console.log('Creating new page...')
    const page = await browser.newPage()
    console.log('Page created successfully')

    // Set content and wait for fonts to load
    console.log('Setting page content...')
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    console.log('Page content set successfully')

    // Generate PDF
    console.log('Generating PDF...')
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    })
    console.log('PDF buffer generated, size:', pdfBuffer.length)

    await browser.close()
    console.log('Browser closed successfully')

    // Return PDF as base64 for easy handling
    // Ensure we have a proper Buffer and convert to base64 string
    const buffer = Buffer.from(pdfBuffer)
    const pdfBase64 = buffer.toString('base64')
    console.log('PDF converted to base64, size:', pdfBase64.length)

    // Ensure we return a proper string, not a Buffer
    const response = {
      success: true,
      pdf: String(pdfBase64), // Explicitly convert to string
      filename: `vehicle-report-${reportData.customerRego}-${Date.now()}.pdf`
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error generating PDF:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')

    // Ensure browser is closed on error
    if (browser) {
      try {
        await browser.close()
        console.log('Browser closed after error')
      } catch (closeError) {
        console.error('Error closing browser:', closeError)
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to generate PDF report',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : 'No details available'
      },
      { status: 500 }
    )
  }
}