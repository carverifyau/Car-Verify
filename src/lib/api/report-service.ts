/* eslint-disable @typescript-eslint/no-explicit-any */
import { VehicleIdentifier } from '@/lib/vehicle-validation'
import { ppsrService, PPSRResponse } from './ppsr-service'
import { nevdisService, NEVDISResponse } from './nevdis-service'
import { pricingService, VehiclePricing, PricingRequest } from './pricing-service'
type ReportType = 'BASIC' | 'STANDARD' | 'PREMIUM'

export interface VehicleReport {
  id: string
  vehicleIdentifier: VehicleIdentifier
  reportType: ReportType
  generatedAt: string

  // Core data
  ppsr: PPSRResponse
  nevdis?: NEVDISResponse
  pricing?: VehiclePricing

  // Analysis
  riskScore: number // 0-100, higher is riskier
  riskFactors: string[]
  recommendations: string[]

  // Summary
  summary: {
    isFinanceOwing: boolean
    isStolen: boolean
    isWrittenOff: boolean
    marketValue?: number
    riskLevel: 'low' | 'medium' | 'high'
  }

  // Meta
  dataQuality: 'complete' | 'partial' | 'limited'
  completionTime: number // milliseconds
  errors?: string[]
}

export interface ReportGenerationOptions {
  vehicleIdentifier: VehicleIdentifier
  reportType: ReportType
  userId?: string
  orderId?: string
}

class ReportService {
  async generateReport(options: ReportGenerationOptions): Promise<VehicleReport> {
    const startTime = Date.now()
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    try {
      // Always get PPSR data (required for all report types)
      const ppsr = await ppsrService.searchVehicle(options.vehicleIdentifier)

      let nevdis: NEVDISResponse | undefined
      let pricing: VehiclePricing | undefined
      const errors: string[] = []

      // Get additional data based on report type
      if (options.reportType === 'STANDARD' || options.reportType === 'PREMIUM') {
        try {
          nevdis = await nevdisService.searchVehicle(options.vehicleIdentifier)
        } catch (error) {
          console.error('NEVDIS service error:', error)
          errors.push('Unable to retrieve write-off data')
        }

        try {
          const pricingRequest: PricingRequest = {
            vin: options.vehicleIdentifier.type === 'vin' ? options.vehicleIdentifier.vin : undefined,
            rego: options.vehicleIdentifier.type === 'rego' ? options.vehicleIdentifier.rego : undefined,
            state: options.vehicleIdentifier.type === 'rego' ? options.vehicleIdentifier.state : undefined,
            make: nevdis?.make,
            model: nevdis?.model,
            year: nevdis?.year,
          }
          pricing = await pricingService.getVehiclePricing(pricingRequest) || undefined
        } catch (error) {
          console.error('Pricing service error:', error)
          errors.push('Unable to retrieve pricing data')
        }
      }

      // Analyze risk factors
      const analysis = this.analyzeVehicle(ppsr, nevdis, pricing)

      const completionTime = Date.now() - startTime

      const report: VehicleReport = {
        id: reportId,
        vehicleIdentifier: options.vehicleIdentifier,
        reportType: options.reportType,
        generatedAt: new Date().toISOString(),
        ppsr,
        nevdis,
        pricing,
        riskScore: analysis.riskScore,
        riskFactors: analysis.riskFactors,
        recommendations: analysis.recommendations,
        summary: {
          isFinanceOwing: ppsr.isFinanceOwing,
          isStolen: ppsr.isStolen || (nevdis?.isStolen ?? false),
          isWrittenOff: ppsr.isWrittenOff || (nevdis?.isWrittenOff ?? false),
          marketValue: pricing?.retailValue,
          riskLevel: analysis.riskLevel,
        },
        dataQuality: errors.length === 0 ? 'complete' : errors.length === 1 ? 'partial' : 'limited',
        completionTime,
        errors: errors.length > 0 ? errors : undefined,
      }

      return report
    } catch (error) {
      console.error('Report generation error:', error)
      throw new Error('Failed to generate vehicle report')
    }
  }

  private analyzeVehicle(
    ppsr: PPSRResponse,
    nevdis?: NEVDISResponse,
    pricing?: VehiclePricing
  ): {
    riskScore: number
    riskFactors: string[]
    recommendations: string[]
    riskLevel: 'low' | 'medium' | 'high'
  } {
    let riskScore = 0
    const riskFactors: string[] = []
    const recommendations: string[] = []

    // PPSR risk factors
    if (ppsr.isFinanceOwing) {
      riskScore += 40
      riskFactors.push('Finance still owing on vehicle')
      recommendations.push('Ensure finance is cleared before purchase')
    }

    if (ppsr.isStolen) {
      riskScore += 50
      riskFactors.push('Vehicle reported as stolen')
      recommendations.push('DO NOT PURCHASE - Contact authorities')
    }

    if (ppsr.isWrittenOff) {
      riskScore += 30
      riskFactors.push('Vehicle previously written off')
      recommendations.push('Get professional inspection before purchase')
    }

    // NEVDIS risk factors
    if (nevdis?.isWrittenOff && nevdis.writeOffType === 'total-loss') {
      riskScore += 20
      riskFactors.push('Classified as total loss write-off')
      recommendations.push('Vehicle may have significant damage history')
    }

    if (nevdis?.isStolen) {
      riskScore += 50
      riskFactors.push('Vehicle in stolen vehicle database')
      recommendations.push('DO NOT PURCHASE - Contact authorities')
    }

    // Pricing risk factors
    if (pricing?.marketPosition === 'below') {
      riskScore += 10
      riskFactors.push('Priced below market average')
      recommendations.push('Investigate why price is below market value')
    }

    if (pricing?.priceConfidence === 'low') {
      riskScore += 5
      riskFactors.push('Limited pricing data available')
      recommendations.push('Get additional vehicle valuation')
    }

    // Additional recommendations based on data
    if (!nevdis && !pricing) {
      recommendations.push('Consider upgrading to Standard report for more details')
    }

    if (riskScore === 0) {
      recommendations.push('Vehicle appears to have clean history')
      recommendations.push('Still recommend professional inspection')
    }

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high'
    if (riskScore >= 40) {
      riskLevel = 'high'
    } else if (riskScore >= 15) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'low'
    }

    return {
      riskScore: Math.min(riskScore, 100),
      riskFactors,
      recommendations,
      riskLevel,
    }
  }

  async getReportById(reportId: string): Promise<VehicleReport | null> {
    // TODO: Implement database lookup
    // For now, this would typically fetch from database
    console.log(`Looking up report: ${reportId}`)
    return null
  }

  async saveReport(report: VehicleReport, orderId?: string): Promise<void> {
    // TODO: Implement database save
    // This would save the report to the database
    console.log(`Saving report: ${report.id} for order: ${orderId}`)
  }

  async createManualReport(options: ReportGenerationOptions): Promise<{ id: string; status: string }> {
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // For MVP, instead of generating the report immediately, we create a pending entry
    // that will be processed manually

    console.log(`📋 Manual report request created: ${reportId}`)
    console.log(`Vehicle: ${options.vehicleIdentifier.type === 'vin' ? options.vehicleIdentifier.vin : `${options.vehicleIdentifier.rego} (${options.vehicleIdentifier.state})`}`)
    console.log(`Report Type: ${options.reportType}`)
    console.log(`Order ID: ${options.orderId}`)

    // In a real implementation, this would save to database with PENDING_MANUAL_REVIEW status
    // For now, we'll use mock data but mark it as manual

    try {
      // ⚠️ DISABLED: No longer generating mock reports to prevent duplicates in MVP mode
      console.log('📋 Created pending report entry - no mock report generated')

      return {
        id: reportId,
        status: 'pending_manual_review'
      }
    } catch (error) {
      console.error('Failed to create manual report request:', error)
      throw new Error('Failed to create report request')
    }
  }
}

export const reportService = new ReportService()