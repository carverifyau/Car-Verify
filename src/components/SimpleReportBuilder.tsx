'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, Save, Eye, CheckCircle, AlertTriangle, FileText, Car, Shield, DollarSign, Bot, Loader2, Sparkles, Upload, X } from 'lucide-react'

interface SimpleReportBuilderProps {
  reportId?: string
  onSave: (report: any) => void
  onPreview: (report: any) => void
}

export default function SimpleReportBuilder({ reportId, onSave, onPreview }: SimpleReportBuilderProps) {
  console.log('🔥 SimpleReportBuilder mounted with reportId:', reportId)
  const [currentStep, setCurrentStep] = useState(1)
  const [customerData, setCustomerData] = useState<any>(null)
  const [isResearchingValues, setIsResearchingValues] = useState(false)
  const [aiValuationData, setAiValuationData] = useState<any>(null)
  const [reportData, setReportData] = useState({
    // Customer provided data (pre-filled)
    customerRego: '',
    customerState: '',
    customerVin: '',
    customerEmail: '',
    customerName: '',

    // Vehicle details to complete
    make: '',
    model: '',
    year: '',
    bodyType: '',
    color: '',
    engineSize: '',

    // PPSR Check
    ppsrStatus: 'clear', // clear, encumbered
    securityInterests: [] as any[],
    ppsrCertificate: null as File | null,
    ppsrCertificateUrl: '',

    // Additional vehicle details
    vin: '',
    odometer: '',
    transmission: '',
    fuelType: '',
    driveType: '',
    doors: '',
    seats: '',
    registrationExpiry: '',
    lastServiceDate: '',
    lastServiceKm: '',

    // Other checks
    stolenStatus: 'clear', // clear, stolen
    writeOffStatus: 'clear', // clear, written-off

    // Market valuation
    retailValue: '',
    tradeValue: '',
    privateValue: '',

    // Report status
    status: 'draft'
  })

  // Load customer data on mount
  useEffect(() => {
    const loadReportData = async () => {
      if (reportId && typeof window !== 'undefined') {
        let customerReport = null

        // Check API reports first (webhook reports)
        try {
          const response = await fetch('/api/admin/reports')
          if (response.ok) {
            const data = await response.json()
            const apiReports = data.reports || []
            customerReport = apiReports.find((r: any) => r.id === reportId)
          }
        } catch (error) {
          console.error('Failed to fetch API reports:', error)
        }

        // If not found in API, check localStorage
        if (!customerReport) {
          const pendingReports = JSON.parse(localStorage.getItem('pendingReports') || '[]')
          customerReport = pendingReports.find((r: any) => r.id === reportId)
        }

        if (!customerReport) {
          const savedReports = JSON.parse(localStorage.getItem('savedReports') || '[]')
          customerReport = savedReports.find((r: any) => r.id === reportId)
        }

        if (customerReport) {
          setCustomerData(customerReport)
          setReportData(prev => ({
            ...prev,
            customerRego: customerReport.rego || '',
            customerState: customerReport.state || '',
            customerEmail: customerReport.customerEmail || '',
            customerName: customerReport.customerName || '',

            // Load previously saved data if available
            make: customerReport.make || '',
            model: customerReport.model || '',
            year: customerReport.year || '',
            bodyType: customerReport.bodyType || '',
            color: customerReport.color || '',
            engineSize: customerReport.engineSize || '',
            vin: customerReport.vin || '',
            odometer: customerReport.odometer || '',
            transmission: customerReport.transmission || '',
            fuelType: customerReport.fuelType || '',
            driveType: customerReport.driveType || '',
            doors: customerReport.doors || '',
            seats: customerReport.seats || '',
            registrationExpiry: customerReport.registrationExpiry || '',
            lastServiceDate: customerReport.lastServiceDate || '',
            lastServiceKm: customerReport.lastServiceKm || '',
            ppsrStatus: customerReport.ppsrStatus || 'clear',
            securityInterests: customerReport.securityInterests || [],
            stolenStatus: customerReport.stolenStatus || 'clear',
            writeOffStatus: customerReport.writeOffStatus || 'clear',
            retailValue: customerReport.retailValue || '',
            tradeValue: customerReport.tradeValue || '',
            privateValue: customerReport.privateValue || '',
            status: customerReport.status || 'draft'
          }))
        }
      }
    }

    loadReportData()
  }, [reportId])

  const steps = [
    { id: 1, name: 'Customer Request', icon: FileText, description: 'Review customer submission' },
    { id: 2, name: 'Vehicle Details', icon: Car, description: 'Complete vehicle information' },
    { id: 3, name: 'PPSR Check', icon: Shield, description: 'Finance and security checks' },
    { id: 4, name: 'Valuation', icon: DollarSign, description: 'Market value assessment' },
  ]

  const addSecurityInterest = () => {
    setReportData(prev => ({
      ...prev,
      securityInterests: [
        ...prev.securityInterests,
        {
          id: Date.now(),
          securedParty: '',
          dateRegistered: '',
          type: 'Purchase Money Security Interest',
          amount: '',
          status: 'Active'
        }
      ]
    }))
  }

  const updateSecurityInterest = (index: number, field: string, value: string) => {
    setReportData(prev => ({
      ...prev,
      securityInterests: prev.securityInterests.map((interest, i) =>
        i === index ? { ...interest, [field]: value } : interest
      )
    }))
  }

  const removeSecurityInterest = (index: number) => {
    setReportData(prev => ({
      ...prev,
      securityInterests: prev.securityInterests.filter((_, i) => i !== index)
    }))
  }

  const handlePpsrCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setReportData(prev => ({
        ...prev,
        ppsrCertificate: file,
        ppsrCertificateUrl: URL.createObjectURL(file)
      }))
    }
  }

  const removePpsrCertificate = () => {
    if (reportData.ppsrCertificateUrl) {
      URL.revokeObjectURL(reportData.ppsrCertificateUrl)
    }
    setReportData(prev => ({
      ...prev,
      ppsrCertificate: null,
      ppsrCertificateUrl: ''
    }))
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64 = reader.result.split(',')[1]
          resolve(base64)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = error => reject(error)
    })
  }

  const researchMarketValues = async () => {
    if (!reportData.make || !reportData.model || !reportData.year) {
      alert('Please complete the vehicle details (Make, Model, Year) before researching market values.')
      return
    }

    setIsResearchingValues(true)

    try {
      const response = await fetch('/api/admin/market-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicle: {
            make: reportData.make,
            model: reportData.model,
            year: parseInt(reportData.year),
            bodyType: reportData.bodyType,
            condition: 'Good',
            location: 'Australia'
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch valuation data')
      }

      const response_data = await response.json()

      if (response_data.success && response_data.marketData) {
        const marketData = response_data.marketData
        setAiValuationData(marketData)

        // Auto-populate the form fields
        setReportData(prev => ({
          ...prev,
          retailValue: `$${marketData.retailValue?.toLocaleString() || '0'}`,
          tradeValue: `$${marketData.tradeValue?.toLocaleString() || '0'}`,
          privateValue: `$${marketData.privateValue?.toLocaleString() || '0'}`,
          aiMarketResearch: marketData
        }))
      } else {
        throw new Error('Invalid response format')
      }

    } catch (error) {
      console.error('AI valuation error:', error)
      alert('Failed to research market values. Please try again or enter values manually.')
    } finally {
      setIsResearchingValues(false)
    }
  }

  const handleSave = () => {
    onSave({
      ...reportData,
      id: reportId,
      updatedAt: new Date().toISOString()
    })
  }

  const handlePreview = () => {
    onPreview({
      ...reportData,
      id: reportId
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Complete Vehicle Report</h2>
            <p className="text-gray-500 mt-1">
              {customerData ? `Customer request: ${customerData.rego} (${customerData.state})` : 'Loading customer data...'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button
              onClick={handlePreview}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Report
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-400">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {/* Step 1: Customer Request */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Submission Details</h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Customer Request Received</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-blue-700 font-medium">Registration:</span>
                  <div className="font-bold text-blue-900">{customerData?.rego || 'Loading...'}</div>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">State:</span>
                  <div className="font-bold text-blue-900">{customerData?.state || 'Loading...'}</div>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Submitted:</span>
                  <div className="font-bold text-blue-900">{customerData ? new Date(customerData.timestamp).toLocaleDateString() : 'Loading...'}</div>
                </div>
              </div>

              {/* Customer Contact Information */}
              <div className="border-t border-blue-200 pt-4">
                <h4 className="text-blue-900 font-medium mb-3">Customer Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Customer Name</label>
                    <input
                      type="text"
                      value={reportData.customerName}
                      onChange={(e) => setReportData(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Customer Email</label>
                    <input
                      type="email"
                      value={reportData.customerEmail}
                      onChange={(e) => setReportData(prev => ({ ...prev, customerEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      placeholder="customer@example.com"
                    />
                    <p className="text-xs text-blue-600 mt-1">Required to send completed report</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Review the customer submission above, then proceed to complete the vehicle details.
              </p>
              <button
                onClick={nextStep}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Report Completion
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Vehicle Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Complete Vehicle Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Make</label>
                <input
                  type="text"
                  value={reportData.make}
                  onChange={(e) => setReportData(prev => ({ ...prev, make: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., Toyota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Model</label>
                <input
                  type="text"
                  value={reportData.model}
                  onChange={(e) => setReportData(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., Camry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Year</label>
                <input
                  type="number"
                  value={reportData.year}
                  onChange={(e) => setReportData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Body Type</label>
                <select
                  value={reportData.bodyType}
                  onChange={(e) => setReportData(prev => ({ ...prev, bodyType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="">Select Body Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                  <option value="Wagon">Wagon</option>
                  <option value="Ute">Ute</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Color</label>
                <input
                  type="text"
                  value={reportData.color}
                  onChange={(e) => setReportData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., White"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">VIN Number</label>
                <input
                  type="text"
                  value={reportData.vin}
                  onChange={(e) => setReportData(prev => ({ ...prev, vin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., WVWZZZ1JZ3W000001"
                />
              </div>







              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Registration Expiry</label>
                <input
                  type="date"
                  value={reportData.registrationExpiry}
                  onChange={(e) => setReportData(prev => ({ ...prev, registrationExpiry: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Last Service Date</label>
                <input
                  type="date"
                  value={reportData.lastServiceDate}
                  onChange={(e) => setReportData(prev => ({ ...prev, lastServiceDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Last Service Odometer (km)</label>
                <input
                  type="number"
                  value={reportData.lastServiceKm}
                  onChange={(e) => setReportData(prev => ({ ...prev, lastServiceKm: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., 75000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: PPSR Check */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">PPSR & Security Checks</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">PPSR Status</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="clear"
                      checked={reportData.ppsrStatus === 'clear'}
                      onChange={(e) => setReportData(prev => ({ ...prev, ppsrStatus: e.target.value }))}
                      className="mr-2"
                    />
                    <span className="text-green-700">Clear - No finance owing</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="encumbered"
                      checked={reportData.ppsrStatus === 'encumbered'}
                      onChange={(e) => setReportData(prev => ({ ...prev, ppsrStatus: e.target.value }))}
                      className="mr-2"
                    />
                    <span className="text-orange-700">Encumbered - Finance owing</span>
                  </label>
                </div>
              </div>

              {/* PPSR Certificate Upload */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">PPSR Certificate</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Upload the official PPSR certificate to include in the report as evidence of the security check.
                </p>

                {!reportData.ppsrCertificate ? (
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm text-blue-700 mb-2">
                      <label htmlFor="ppsr-upload" className="cursor-pointer hover:text-blue-800">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </label>
                    </div>
                    <p className="text-xs text-blue-600">PDF, PNG, JPG up to 10MB</p>
                    <input
                      id="ppsr-upload"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handlePpsrCertificateUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="bg-white border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{reportData.ppsrCertificate.name}</p>
                          <p className="text-xs text-gray-500">
                            {(reportData.ppsrCertificate.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={removePpsrCertificate}
                        className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    {reportData.ppsrCertificateUrl && (
                      <div className="mt-3">
                        <a
                          href={reportData.ppsrCertificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Preview certificate
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {reportData.ppsrStatus === 'encumbered' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-orange-900">Security Interests</h4>
                    <button
                      onClick={addSecurityInterest}
                      className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm"
                    >
                      Add Security Interest
                    </button>
                  </div>

                  {reportData.securityInterests.map((interest, index) => (
                    <div key={interest.id} className="bg-white rounded-lg p-4 mb-3 border border-orange-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">Secured Party</label>
                          <input
                            type="text"
                            value={interest.securedParty}
                            onChange={(e) => updateSecurityInterest(index, 'securedParty', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Toyota Finance"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">Amount</label>
                          <input
                            type="text"
                            value={interest.amount}
                            onChange={(e) => updateSecurityInterest(index, 'amount', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                            placeholder="e.g., $25,000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">Date Registered</label>
                          <input
                            type="date"
                            value={interest.dateRegistered}
                            onChange={(e) => updateSecurityInterest(index, 'dateRegistered', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeSecurityInterest(index)}
                            className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Stolen Status</label>
                  <select
                    value={reportData.stolenStatus}
                    onChange={(e) => setReportData(prev => ({ ...prev, stolenStatus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="clear">Clear - Not stolen</option>
                    <option value="stolen">Stolen - Reported stolen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Write-off Status</label>
                  <select
                    value={reportData.writeOffStatus}
                    onChange={(e) => setReportData(prev => ({ ...prev, writeOffStatus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="clear">Clear - Not written off</option>
                    <option value="written-off">Written Off - Insurance total loss</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 4: Valuation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Market Valuation</h3>
              <button
                onClick={researchMarketValues}
                disabled={isResearchingValues || !reportData.make || !reportData.model || !reportData.year}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {isResearchingValues ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Researching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span>AI Research Values</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Research Notice */}
            {(!reportData.make || !reportData.model || !reportData.year) && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-amber-800 text-sm">
                    Complete vehicle details (Make, Model, Year) to enable AI market research
                  </span>
                </div>
              </div>
            )}

            {/* AI Valuation Results */}
            {aiValuationData && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Bot className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-purple-900">AI Market Research Results</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Trade-In Value</div>
                    <div className="font-semibold text-green-700">
                      ${aiValuationData.tradeValue?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Private Sale Value</div>
                    <div className="font-semibold text-blue-700">
                      ${aiValuationData.privateValue?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm text-gray-600">Retail Value</div>
                    <div className="font-semibold text-purple-700">
                      ${aiValuationData.retailValue?.toLocaleString() || 'N/A'}
                    </div>
                  </div>
                </div>

                {(aiValuationData.marketTrends || aiValuationData.sellingPoints || aiValuationData.concerns || aiValuationData.analysisNotes) && (
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Market Analysis</h5>

                    {aiValuationData.marketTrends && (
                      <div className="mb-3">
                        <span className="text-gray-600 font-medium">Market Trends:</span>
                        <p className="text-gray-700 text-sm mt-1">{aiValuationData.marketTrends}</p>
                      </div>
                    )}

                    {aiValuationData.sellingPoints && aiValuationData.sellingPoints.length > 0 && (
                      <div className="mb-3">
                        <span className="text-gray-600 font-medium">Key Selling Points:</span>
                        <ul className="text-gray-700 text-sm mt-1 list-disc list-inside">
                          {aiValuationData.sellingPoints.map((point: string, index: number) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiValuationData.concerns && aiValuationData.concerns.length > 0 && (
                      <div className="mb-3">
                        <span className="text-gray-600 font-medium">Potential Concerns:</span>
                        <ul className="text-gray-700 text-sm mt-1 list-disc list-inside">
                          {aiValuationData.concerns.map((concern: string, index: number) => (
                            <li key={index}>{concern}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiValuationData.analysisNotes && (
                      <div>
                        <span className="text-gray-600 font-medium">Analysis Notes:</span>
                        <p className="text-gray-700 text-sm mt-1">{aiValuationData.analysisNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Retail Value</label>
                <input
                  type="text"
                  value={reportData.retailValue}
                  onChange={(e) => setReportData(prev => ({ ...prev, retailValue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="$30,000"
                />
                <p className="text-xs text-gray-500 mt-1">Dealer sale price</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Trade Value</label>
                <input
                  type="text"
                  value={reportData.tradeValue}
                  onChange={(e) => setReportData(prev => ({ ...prev, tradeValue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="$25,000"
                />
                <p className="text-xs text-gray-500 mt-1">Trade-in value</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Private Value</label>
                <input
                  type="text"
                  value={reportData.privateValue}
                  onChange={(e) => setReportData(prev => ({ ...prev, privateValue: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="$27,500"
                />
                <p className="text-xs text-gray-500 mt-1">Private sale price</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Report Ready for Completion</span>
              </div>
              <p className="text-green-700 text-sm">
                All required information has been collected. Review the details and complete the report.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </button>

        <div className="text-sm text-gray-500">
          Step {currentStep} of {steps.length}
        </div>

        {currentStep < steps.length ? (
          <button
            onClick={nextStep}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={async () => {
              if (!reportData.customerEmail) {
                alert('Please enter customer email address before completing the report.')
                setCurrentStep(1) // Go back to step 1 to add email
                return
              }

              // Update status to completed
              const completedReport = { ...reportData, status: 'completed' }
              setReportData(completedReport)

              // Convert PPSR certificate to base64 if it exists
              let emailReportData = { ...completedReport }
              if (reportData.ppsrCertificate) {
                try {
                  console.log('Converting PPSR certificate to base64...')
                  const base64Data = await convertFileToBase64(reportData.ppsrCertificate)
                  emailReportData = {
                    ...completedReport,
                    ppsrCertificateData: base64Data,
                    ppsrCertificateFilename: reportData.ppsrCertificate.name,
                    ppsrCertificateType: reportData.ppsrCertificate.type
                  }
                  console.log('PPSR certificate converted successfully')
                } catch (error) {
                  console.error('Failed to convert PPSR certificate to base64:', error)
                  alert('Warning: Failed to include PPSR certificate in email. The report will be sent without the certificate attachment.')
                }
              }

              // Save the report
              handleSave()

              // Send email notification
              try {
                const emailResponse = await fetch('/api/send-report-email', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    customerEmail: reportData.customerEmail,
                    customerName: reportData.customerName,
                    reportData: emailReportData,
                    rego: reportData.customerRego || reportData.rego || 'Unknown',
                    state: reportData.customerState || reportData.state || 'Unknown'
                  }),
                })

                if (emailResponse.ok) {
                  alert('Report completed and email sent to customer successfully!')
                } else {
                  alert('Report completed but failed to send email. Please check email settings.')
                }
              } catch (error) {
                console.error('Error sending email:', error)
                alert('Report completed but failed to send email. Please check email settings.')
              }
            }}
            className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete & Email Report
          </button>
        )}
      </div>
    </div>
  )
}