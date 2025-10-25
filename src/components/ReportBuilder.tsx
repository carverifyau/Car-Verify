'use client'

import { useState, useEffect } from 'react'
import { VehicleReport, SecurityInterest, AccidentRecord, TheftRecord, WriteOffRecord, RecallRecord, MarketValuation } from '@/types/vehicle-report'
import { Save, Plus, Trash2, Download, Eye, Car, Shield, AlertTriangle, DollarSign, FileText, Search, Calendar, MapPin, Wrench, Award, TrendingUp } from 'lucide-react'

interface ReportBuilderProps {
  reportId?: string
  onSave: (report: Partial<VehicleReport>) => void
  onPreview: (report: Partial<VehicleReport>) => void
  existingReport?: Partial<VehicleReport>
}

export default function ReportBuilder({ reportId, onSave, onPreview, existingReport }: ReportBuilderProps) {
  const [activeSection, setActiveSection] = useState<string>('vehicle-details')
  const [customerData, setCustomerData] = useState<any>(null)

  // Load customer submission data if editing a pending report
  useEffect(() => {
    if (reportId && typeof window !== 'undefined') {
      const pendingReports = JSON.parse(localStorage.getItem('pendingReports') || '[]')
      const customerReport = pendingReports.find((r: any) => r.id === reportId)
      if (customerReport) {
        setCustomerData(customerReport)
      }
    }
  }, [reportId])

  const [report, setReport] = useState<Partial<VehicleReport>>(existingReport || {
    vehicleDetails: {
      vin: customerData?.vin || '',
      registrationNumber: customerData?.rego || '',
      state: customerData?.state || '',
      plateType: 'Standard',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      bodyType: '',
      seats: 5,
      colour: '',
      engineCapacity: 0,
      engineCapacityLitres: '',
      fuelType: '',
      transmission: '',
      registrationStatus: 'Current',
      odometerUnit: 'km'
    },
    securityInterests: [],
    registrationHistory: [],
    ownershipHistory: [],
    accidentHistory: [],
    theftHistory: [],
    writeOffHistory: [],
    floodHistory: [],
    recalls: [],
    inspectionHistory: [],
    marketValuation: {
      valuationDate: new Date().toISOString().split('T')[0],
      currency: 'AUD',
      retailValue: { low: 0, average: 0, high: 0, confidence: 'Medium' },
      tradeValue: { low: 0, average: 0, high: 0, confidence: 'Medium' },
      privateValue: { low: 0, average: 0, high: 0, confidence: 'Medium' },
      depreciationAnalysis: {
        annualDepreciation: 0,
        totalDepreciation: 0,
        depreciationCurve: 'Linear'
      },
      marketFactors: {
        demandLevel: 'Medium',
        supplyLevel: 'Medium',
        marketTrend: 'Stable'
      },
      comparableSales: {
        salesCount: 0,
        averageSalePrice: 0,
        salesDateRange: '',
        priceRange: { lowest: 0, highest: 0 }
      },
      conditionAdjustments: {
        baseCondition: 'Good',
        adjustmentFactors: []
      },
      dataSources: [],
      methodology: '',
      lastUpdated: new Date().toISOString(),
      aiInsights: {
        investmentGrade: 'B',
        resaleProspects: 'Good',
        riskFactors: [],
        opportunities: []
      }
    },
    status: 'draft',
    reportType: 'comprehensive'
  })

  const updateVehicleDetails = (field: string, value: any) => {
    setReport(prev => ({
      ...prev,
      vehicleDetails: {
        ...prev.vehicleDetails!,
        [field]: value
      }
    }))
  }

  const addSecurityInterest = () => {
    const newInterest: SecurityInterest = {
      id: Date.now().toString(),
      registrationNumber: report.vehicleDetails?.registrationNumber || '',
      dateRegistered: new Date().toISOString().split('T')[0],
      type: 'Purchase Money Security Interest',
      securedParty: '',
      collateralClass: 'Motor Vehicle',
      status: 'Registered',
      manuallyEntered: true,
      enteredDate: new Date().toISOString()
    }

    setReport(prev => ({
      ...prev,
      securityInterests: [...(prev.securityInterests || []), newInterest]
    }))
  }

  const updateSecurityInterest = (index: number, field: string, value: any) => {
    setReport(prev => ({
      ...prev,
      securityInterests: prev.securityInterests?.map((interest, i) =>
        i === index ? { ...interest, [field]: value } : interest
      ) || []
    }))
  }

  const removeSecurityInterest = (index: number) => {
    setReport(prev => ({
      ...prev,
      securityInterests: prev.securityInterests?.filter((_, i) => i !== index) || []
    }))
  }

  const addAccidentRecord = () => {
    const newAccident: AccidentRecord = {
      id: Date.now().toString(),
      accidentDate: new Date().toISOString().split('T')[0],
      severity: 'Minor',
      damageDescription: '',
      damageLocation: [],
      repairStatus: 'Unknown',
      dataSource: 'Manual Entry',
      sourceReliability: 'High',
      lastUpdated: new Date().toISOString()
    }

    setReport(prev => ({
      ...prev,
      accidentHistory: [...(prev.accidentHistory || []), newAccident]
    }))
  }

  const updateAccidentRecord = (index: number, field: string, value: any) => {
    setReport(prev => ({
      ...prev,
      accidentHistory: prev.accidentHistory?.map((accident, i) =>
        i === index ? { ...accident, [field]: value } : accident
      ) || []
    }))
  }

  const removeAccidentRecord = (index: number) => {
    setReport(prev => ({
      ...prev,
      accidentHistory: prev.accidentHistory?.filter((_, i) => i !== index) || []
    }))
  }

  const addRecall = () => {
    const newRecall: RecallRecord = {
      id: Date.now().toString(),
      recallDate: new Date().toISOString().split('T')[0],
      recallNumber: '',
      component: '',
      defectDescription: '',
      safetyRisk: 'Medium',
      recallType: 'Safety',
      manufacturer: report.vehicleDetails?.make || '',
      modelsCovered: [report.vehicleDetails?.model || ''],
      yearsAffected: [report.vehicleDetails?.year?.toString() || ''],
      remedyDescription: '',
      repairCost: 'Free',
      status: 'Outstanding',
      dataSource: 'Manual Entry',
      lastUpdated: new Date().toISOString()
    }

    setReport(prev => ({
      ...prev,
      recalls: [...(prev.recalls || []), newRecall]
    }))
  }

  const updateRecall = (index: number, field: string, value: any) => {
    setReport(prev => ({
      ...prev,
      recalls: prev.recalls?.map((recall, i) =>
        i === index ? { ...recall, [field]: value } : recall
      ) || []
    }))
  }

  const removeRecall = (index: number) => {
    setReport(prev => ({
      ...prev,
      recalls: prev.recalls?.filter((_, i) => i !== index) || []
    }))
  }

  const updateMarketValuation = (section: string, field: string, value: any) => {
    setReport(prev => ({
      ...prev,
      marketValuation: {
        ...prev.marketValuation!,
        [section]: {
          ...prev.marketValuation![section as keyof typeof prev.marketValuation],
          [field]: value
        }
      }
    }))
  }

  const generateAIValuation = async () => {
    // Simulate AI valuation generation
    const baseValue = Math.floor(Math.random() * 50000) + 10000
    const variance = baseValue * 0.15

    setReport(prev => ({
      ...prev,
      marketValuation: {
        ...prev.marketValuation!,
        retailValue: {
          low: Math.floor(baseValue - variance),
          average: baseValue,
          high: Math.floor(baseValue + variance),
          confidence: 'High'
        },
        tradeValue: {
          low: Math.floor((baseValue - variance) * 0.75),
          average: Math.floor(baseValue * 0.75),
          high: Math.floor((baseValue + variance) * 0.75),
          confidence: 'High'
        },
        privateValue: {
          low: Math.floor((baseValue - variance) * 0.85),
          average: Math.floor(baseValue * 0.85),
          high: Math.floor((baseValue + variance) * 0.85),
          confidence: 'High'
        },
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  const sections = [
    { id: 'vehicle-details', title: 'Vehicle Details', icon: Car },
    { id: 'security-interests', title: 'PPSR Security Interests', icon: Shield },
    { id: 'ownership', title: 'Ownership History', icon: FileText },
    { id: 'accidents', title: 'Accident History', icon: AlertTriangle },
    { id: 'recalls', title: 'Recalls & Safety', icon: Award },
    { id: 'inspections', title: 'Inspections', icon: Wrench },
    { id: 'valuation', title: 'Market Valuation', icon: DollarSign },
    { id: 'ai-analysis', title: 'AI Analysis', icon: TrendingUp }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Report Builder</h2>
          <p className="text-sm text-gray-500">
            {reportId ? `Editing Report ${reportId}` : 'Creating New Report'}
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {section.title}
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button
            onClick={() => onSave(report)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </button>
          <button
            onClick={() => onPreview(report)}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Vehicle Details Section */}
          {activeSection === 'vehicle-details' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Details</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        VIN Number
                      </label>
                      <input
                        type="text"
                        value={report.vehicleDetails?.vin || ''}
                        onChange={(e) => updateVehicleDetails('vin', e.target.value.toUpperCase())}
                        placeholder="17-character VIN"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={17}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        value={report.vehicleDetails?.registrationNumber || ''}
                        onChange={(e) => updateVehicleDetails('registrationNumber', e.target.value.toUpperCase())}
                        placeholder="e.g., ABC123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        value={report.vehicleDetails?.state || ''}
                        onChange={(e) => updateVehicleDetails('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="NT">NT</option>
                        <option value="ACT">ACT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Make
                      </label>
                      <input
                        type="text"
                        value={report.vehicleDetails?.make || ''}
                        onChange={(e) => updateVehicleDetails('make', e.target.value)}
                        placeholder="e.g., Toyota"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model
                      </label>
                      <input
                        type="text"
                        value={report.vehicleDetails?.model || ''}
                        onChange={(e) => updateVehicleDetails('model', e.target.value)}
                        placeholder="e.g., Camry"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <input
                        type="number"
                        value={report.vehicleDetails?.year || ''}
                        onChange={(e) => updateVehicleDetails('year', parseInt(e.target.value))}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Body Type
                      </label>
                      <select
                        value={report.vehicleDetails?.bodyType || ''}
                        onChange={(e) => updateVehicleDetails('bodyType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Body Type</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="SUV">SUV</option>
                        <option value="Wagon">Wagon</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Ute">Ute</option>
                        <option value="Van">Van</option>
                        <option value="Truck">Truck</option>
                        <option value="Motorcycle">Motorcycle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Colour
                      </label>
                      <input
                        type="text"
                        value={report.vehicleDetails?.colour || ''}
                        onChange={(e) => updateVehicleDetails('colour', e.target.value)}
                        placeholder="e.g., Silver"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Engine Capacity (CC)
                      </label>
                      <input
                        type="number"
                        value={report.vehicleDetails?.engineCapacity || ''}
                        onChange={(e) => {
                          const cc = parseInt(e.target.value)
                          updateVehicleDetails('engineCapacity', cc)
                          updateVehicleDetails('engineCapacityLitres', (cc / 1000).toFixed(1) + 'L')
                        }}
                        placeholder="e.g., 2500"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuel Type
                      </label>
                      <select
                        value={report.vehicleDetails?.fuelType || ''}
                        onChange={(e) => updateVehicleDetails('fuelType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                        <option value="LPG">LPG</option>
                        <option value="CNG">CNG</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transmission
                      </label>
                      <select
                        value={report.vehicleDetails?.transmission || ''}
                        onChange={(e) => updateVehicleDetails('transmission', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="CVT">CVT</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seats
                      </label>
                      <input
                        type="number"
                        value={report.vehicleDetails?.seats || ''}
                        onChange={(e) => updateVehicleDetails('seats', parseInt(e.target.value))}
                        min="1"
                        max="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Interests Section */}
          {activeSection === 'security-interests' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">PPSR Security Interests</h3>
                <button
                  onClick={addSecurityInterest}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Security Interest
                </button>
              </div>

              <div className="space-y-4">
                {report.securityInterests?.map((interest, index) => (
                  <div key={interest.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-gray-900">Security Interest #{index + 1}</h4>
                      <button
                        onClick={() => removeSecurityInterest(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Registered
                        </label>
                        <input
                          type="date"
                          value={interest.dateRegistered}
                          onChange={(e) => updateSecurityInterest(index, 'dateRegistered', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type
                        </label>
                        <select
                          value={interest.type}
                          onChange={(e) => updateSecurityInterest(index, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Purchase Money Security Interest">Purchase Money Security Interest</option>
                          <option value="Non-Purchase Money Security Interest">Non-Purchase Money Security Interest</option>
                          <option value="Transfer of Interest">Transfer of Interest</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secured Party
                        </label>
                        <input
                          type="text"
                          value={interest.securedParty}
                          onChange={(e) => updateSecurityInterest(index, 'securedParty', e.target.value)}
                          placeholder="e.g., Toyota Finance Australia"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount
                        </label>
                        <input
                          type="number"
                          value={interest.amount || ''}
                          onChange={(e) => updateSecurityInterest(index, 'amount', parseFloat(e.target.value))}
                          placeholder="e.g., 35000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={interest.status}
                          onChange={(e) => updateSecurityInterest(index, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Registered">Registered</option>
                          <option value="Discharged">Discharged</option>
                          <option value="Expired">Expired</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Collateral Class
                        </label>
                        <input
                          type="text"
                          value={interest.collateralClass}
                          onChange={(e) => updateSecurityInterest(index, 'collateralClass', e.target.value)}
                          placeholder="e.g., Motor Vehicle"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={interest.description || ''}
                        onChange={(e) => updateSecurityInterest(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Additional details about this security interest..."
                      />
                    </div>
                  </div>
                )) || []}

                {(!report.securityInterests || report.securityInterests.length === 0) && (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No security interests recorded. Click "Add Security Interest" to add PPSR data.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accident History Section */}
          {activeSection === 'accidents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Accident History</h3>
                <button
                  onClick={addAccidentRecord}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Accident Record
                </button>
              </div>

              <div className="space-y-4">
                {report.accidentHistory?.map((accident, index) => (
                  <div key={accident.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-gray-900">Accident #{index + 1}</h4>
                      <button
                        onClick={() => removeAccidentRecord(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Accident Date
                        </label>
                        <input
                          type="date"
                          value={accident.accidentDate}
                          onChange={(e) => updateAccidentRecord(index, 'accidentDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Severity
                        </label>
                        <select
                          value={accident.severity}
                          onChange={(e) => updateAccidentRecord(index, 'severity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Minor">Minor</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Major">Major</option>
                          <option value="Total Loss">Total Loss</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estimated Repair Cost
                        </label>
                        <input
                          type="number"
                          value={accident.estimatedRepairCost || ''}
                          onChange={(e) => updateAccidentRecord(index, 'estimatedRepairCost', parseFloat(e.target.value))}
                          placeholder="e.g., 5000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Damage Description
                      </label>
                      <textarea
                        value={accident.damageDescription}
                        onChange={(e) => updateAccidentRecord(index, 'damageDescription', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the damage sustained in this accident..."
                      />
                    </div>
                  </div>
                )) || []}

                {(!report.accidentHistory || report.accidentHistory.length === 0) && (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No accident history recorded. Click "Add Accident Record" to add incident data.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Market Valuation Section */}
          {activeSection === 'valuation' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Market Valuation</h3>
                <button
                  onClick={generateAIValuation}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate AI Valuation
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Retail Value */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Retail Value</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Low</label>
                      <input
                        type="number"
                        value={report.marketValuation?.retailValue.low || ''}
                        onChange={(e) => updateMarketValuation('retailValue', 'low', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Average</label>
                      <input
                        type="number"
                        value={report.marketValuation?.retailValue.average || ''}
                        onChange={(e) => updateMarketValuation('retailValue', 'average', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">High</label>
                      <input
                        type="number"
                        value={report.marketValuation?.retailValue.high || ''}
                        onChange={(e) => updateMarketValuation('retailValue', 'high', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Trade Value */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Trade Value</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Low</label>
                      <input
                        type="number"
                        value={report.marketValuation?.tradeValue.low || ''}
                        onChange={(e) => updateMarketValuation('tradeValue', 'low', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Average</label>
                      <input
                        type="number"
                        value={report.marketValuation?.tradeValue.average || ''}
                        onChange={(e) => updateMarketValuation('tradeValue', 'average', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">High</label>
                      <input
                        type="number"
                        value={report.marketValuation?.tradeValue.high || ''}
                        onChange={(e) => updateMarketValuation('tradeValue', 'high', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Private Value */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Private Sale Value</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Low</label>
                      <input
                        type="number"
                        value={report.marketValuation?.privateValue.low || ''}
                        onChange={(e) => updateMarketValuation('privateValue', 'low', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Average</label>
                      <input
                        type="number"
                        value={report.marketValuation?.privateValue.average || ''}
                        onChange={(e) => updateMarketValuation('privateValue', 'average', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">High</label>
                      <input
                        type="number"
                        value={report.marketValuation?.privateValue.high || ''}
                        onChange={(e) => updateMarketValuation('privateValue', 'high', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add other sections as needed */}
          {activeSection === 'recalls' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recalls & Safety Information</h3>
                <button
                  onClick={addRecall}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Recall
                </button>
              </div>

              <div className="space-y-4">
                {report.recalls?.map((recall, index) => (
                  <div key={recall.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-gray-900">Recall #{index + 1}</h4>
                      <button
                        onClick={() => removeRecall(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recall Date
                        </label>
                        <input
                          type="date"
                          value={recall.recallDate}
                          onChange={(e) => updateRecall(index, 'recallDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recall Number
                        </label>
                        <input
                          type="text"
                          value={recall.recallNumber}
                          onChange={(e) => updateRecall(index, 'recallNumber', e.target.value)}
                          placeholder="e.g., RC2023001"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Component
                        </label>
                        <input
                          type="text"
                          value={recall.component}
                          onChange={(e) => updateRecall(index, 'component', e.target.value)}
                          placeholder="e.g., Airbag Inflator"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Safety Risk
                        </label>
                        <select
                          value={recall.safetyRisk}
                          onChange={(e) => updateRecall(index, 'safetyRisk', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={recall.status}
                          onChange={(e) => updateRecall(index, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Outstanding">Outstanding</option>
                          <option value="Completed">Completed</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Defect Description
                        </label>
                        <textarea
                          value={recall.defectDescription}
                          onChange={(e) => updateRecall(index, 'defectDescription', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe the defect..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remedy Description
                        </label>
                        <textarea
                          value={recall.remedyDescription}
                          onChange={(e) => updateRecall(index, 'remedyDescription', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe the remedy/fix..."
                        />
                      </div>
                    </div>
                  </div>
                )) || []}

                {(!report.recalls || report.recalls.length === 0) && (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recalls recorded. Click "Add Recall" to add safety recall information.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}