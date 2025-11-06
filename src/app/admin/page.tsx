'use client'

import { useState, useEffect } from 'react'
import { Search, FileText, Download, Eye, Plus, Settings, BarChart3, Users, Database, CheckCircle, XCircle, AlertTriangle, Clock, Edit, Mail, Trash2 } from 'lucide-react'
import SimpleReportBuilder from '@/components/SimpleReportBuilder'
import AdminAuth from '@/components/AdminAuth'
import { VehicleReport } from '@/types/vehicle-report'

interface SimpleVehicleReport {
  id: string
  rego: string
  state: string
  make: string
  model: string
  year: number
  vin?: string
  status: 'complete' | 'pending' | 'error' | 'draft'
  generatedAt: string
  customerId: string
  reportType: 'basic' | 'comprehensive' | 'premium'
  customerEmail?: string
  customerName?: string
}

interface ReportData {
  vehicleDetails: {
    registration: string
    state: string
    make: string
    model: string
    year: number
    vin: string
    bodyType: string
    engineNumber: string
    colour: string
    fuelType: string
    transmission: string
    odometer?: string
    manufacturedDate: string
    firstRegistered: string
    registrationExpiry: string
    regoStatus: 'Current' | 'Expired' | 'Cancelled'
  }
  ownershipHistory: Array<{
    ownerNumber: number
    period: string
    state: string
    transferDate: string
  }>
  encumbrances: Array<{
    type: string
    company: string
    dateRegistered: string
    amount?: string
    status: 'Active' | 'Discharged'
  }>
  accidentHistory: Array<{
    date: string
    severity: 'Minor' | 'Moderate' | 'Major' | 'Write-off'
    repairCost?: string
    description: string
    location: string
  }>
  recalls: Array<{
    date: string
    campaign: string
    description: string
    status: 'Outstanding' | 'Completed'
    severity: 'Safety' | 'Emissions' | 'Other'
  }>
  stolenStatus: {
    isStolen: boolean
    reportDate?: string
    reportNumber?: string
    description?: string
  }
  writeOffHistory: Array<{
    date: string
    type: 'Repairable' | 'Statutory' | 'Economic'
    reason: string
    repairStatus?: string
  }>
  inspectionHistory: Array<{
    date: string
    type: 'Safety' | 'Emissions' | 'Registration'
    result: 'Pass' | 'Fail' | 'Conditional'
    expiryDate?: string
    location: string
  }>
  marketValue: {
    retailValue: string
    tradeValue: string
    privateValue: string
    lastUpdated: string
    source: string
  }
  specifications: {
    engineCapacity: string
    powerKw: string
    seats: number
    doors: number
    weight: string
    dimensions: {
      length: string
      width: string
      height: string
    }
    safetyRating: string
    fuelConsumption: string
  }
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'reports' | 'generate' | 'builder' | 'analytics' | 'settings'>('reports')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReport, setSelectedReport] = useState<SimpleVehicleReport | null>(null)
  const [newReportRego, setNewReportRego] = useState('')
  const [newReportState, setNewReportState] = useState('')
  const [reportType, setReportType] = useState<'basic' | 'comprehensive' | 'premium'>('comprehensive')
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingReport, setEditingReport] = useState<string | null>(null)

  // Get pending reports from customer submissions
  const [pendingReports, setPendingReports] = useState<SimpleVehicleReport[]>([])
  const [savedReports, setSavedReports] = useState<SimpleVehicleReport[]>([])

  useEffect(() => {
    const loadPendingReports = () => {
      // No longer loading from localStorage - all reports come from API/Supabase
      // This function is kept for compatibility but does nothing
      console.log('📝 loadPendingReports: All reports now loaded from API')
    }

    const loadSavedReports = async () => {
      if (typeof window !== 'undefined') {
        // ONLY load from API endpoint (Supabase) - no more localStorage
        let apiReports: any[] = []
        try {
          const response = await fetch('/api/admin/reports')
          if (response.ok) {
            const data = await response.json()
            apiReports = data.reports || []
          }
        } catch (error) {
          console.error('Failed to fetch API reports:', error)
        }

        // Format all reports from API (single source of truth)
        const formattedReports = apiReports.map((report: any) => ({
          id: report.id,
          rego: report.rego || 'Unknown',
          state: report.state || 'Unknown',
          make: 'Unknown', // To be filled by admin
          model: 'Unknown', // To be filled by admin
          year: 0, // To be filled by admin
          vin: '',
          status: report.status === 'completed' ? 'complete' as const : 'pending' as const,
          generatedAt: report.timestamp || new Date().toISOString(),
          customerId: 'webhook',
          reportType: 'comprehensive' as const,
          customerEmail: report.customerEmail || 'No email',
          customerName: report.customerName || 'No name',
          timestamp: report.timestamp
        }))

        // Separate pending and completed reports
        const pendingReports = formattedReports.filter(r => r.status === 'pending')
        const completedReports = formattedReports.filter(r => r.status === 'complete')

        // Sort by most recent first
        const sortedPending = pendingReports.sort((a, b) => {
          const dateA = new Date(a.generatedAt).getTime()
          const dateB = new Date(b.generatedAt).getTime()
          return dateB - dateA
        })

        const sortedCompleted = completedReports.sort((a, b) => {
          const dateA = new Date(a.generatedAt).getTime()
          const dateB = new Date(b.generatedAt).getTime()
          return dateB - dateA
        })

        setPendingReports(sortedPending)
        setSavedReports(sortedCompleted)
      }
    }

    loadPendingReports()
    loadSavedReports()

    // Re-enabled auto-refresh with longer interval to prevent flickering
    const interval = setInterval(() => {
      loadPendingReports()
      loadSavedReports()
    }, 60000) // 60 seconds interval to minimize UI disruption
    return () => clearInterval(interval)
  }, [])

  const mockCompletedReports: SimpleVehicleReport[] = [
    {
      id: 'COMPLETED_1',
      rego: 'ABC123',
      state: 'NSW',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      vin: 'JT2BG22K123456789',
      status: 'complete',
      generatedAt: '2024-10-10T10:30:00Z',
      customerId: 'cust_001',
      reportType: 'comprehensive'
    }
  ]

  const allReports = [...pendingReports, ...savedReports, ...mockCompletedReports]

  const handleSaveReport = async (report: Partial<VehicleReport>) => {
    try {
      console.log('🔧 Admin Save: Updating report in Supabase:', report.id)

      if (!report.id) {
        alert('Error: Report ID is required')
        return
      }

      // Extract vehicle identifier
      const vehicleIdentifier = report.customerVin || (report.customerRego && report.customerRego.length >= 17) ?
        { type: 'vin', vin: report.customerVin || report.customerRego } :
        { type: 'rego', rego: report.customerRego || 'Unknown', state: report.customerState || 'Unknown' }

      // Update the existing report in Supabase (don't create new ones)
      const response = await fetch('/api/admin/reports', {
        method: 'PUT', // Use PUT for updates instead of POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: report.id,
          customer_email: report.customerEmail || '',
          customer_name: report.customerName || '',
          vehicle_identifier: vehicleIdentifier,
          report_type: 'STANDARD',
          status: report.status === 'completed' ? 'completed' : 'pending',
          report_data: report
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update report')
      }

      // Refresh the reports from API instead of localStorage
      const reportsResponse = await fetch('/api/admin/reports')
      if (reportsResponse.ok) {
        const data = await reportsResponse.json()
        const apiReports = data.reports || []

        // Update pending reports (webhook reports)
        const formattedWebhookReports = apiReports.map((report: any) => ({
          id: report.id,
          rego: report.rego || 'Unknown',
          state: report.state || 'Unknown',
          make: 'Unknown',
          model: 'Unknown',
          year: 0,
          vin: '',
          status: report.status === 'completed' ? 'complete' as const : 'pending' as const,
          generatedAt: report.timestamp || new Date().toISOString(),
          customerId: 'webhook',
          reportType: 'comprehensive' as const,
          customerEmail: report.customerEmail || 'No email',
          customerName: report.customerName || 'No name',
          timestamp: report.timestamp
        }))

        setPendingReports(formattedWebhookReports.filter(r => r.status === 'pending'))
        setSavedReports(formattedWebhookReports.filter(r => r.status === 'complete'))
      }

      alert('Report updated successfully!')

    } catch (error) {
      console.error('Error updating report:', error)
      alert('Failed to update report. Please try again.')
    }
  }

  const handlePreviewReport = (report: Partial<VehicleReport>) => {
    console.log('Previewing report:', report)
    alert('Opening report preview...')
  }

  const generateMockReportData = (report: SimpleVehicleReport): ReportData => ({
    vehicleDetails: {
      registration: report.rego,
      state: report.state,
      make: report.make,
      model: report.model,
      year: report.year,
      vin: report.vin || 'Unknown',
      bodyType: 'Sedan',
      engineNumber: 'ENG123456',
      colour: 'Silver',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      odometer: '45,000 km',
      manufacturedDate: '2020-03-15',
      firstRegistered: '2020-04-20',
      registrationExpiry: '2025-04-20',
      regoStatus: 'Current'
    },
    ownershipHistory: [
      { ownerNumber: 1, period: '2020-04-20 to 2022-06-15', state: 'NSW', transferDate: '2020-04-20' },
      { ownerNumber: 2, period: '2022-06-15 to Present', state: 'NSW', transferDate: '2022-06-15' }
    ],
    encumbrances: [
      { type: 'Purchase Money Security Interest', company: 'Toyota Finance', dateRegistered: '2020-04-20', amount: '$35,000', status: 'Active' }
    ],
    accidentHistory: [],
    recalls: [
      { date: '2021-03-10', campaign: 'RAC001', description: 'Airbag inflator replacement', status: 'Completed', severity: 'Safety' }
    ],
    stolenStatus: { isStolen: false },
    writeOffHistory: [],
    inspectionHistory: [
      { date: '2023-04-15', type: 'Safety', result: 'Pass', expiryDate: '2024-04-15', location: 'Authorised Inspection Station NSW' }
    ],
    marketValue: {
      retailValue: '$28,500',
      tradeValue: '$25,000',
      privateValue: '$26,500',
      lastUpdated: '2024-10-01',
      source: 'RedBook Valuation'
    },
    specifications: {
      engineCapacity: '2.5L',
      powerKw: '135kW',
      seats: 5,
      doors: 4,
      weight: '1,590kg',
      dimensions: { length: '4,885mm', width: '1,840mm', height: '1,445mm' },
      safetyRating: '5 Stars ANCAP',
      fuelConsumption: '7.8L/100km'
    }
  })

  const handleGenerateReport = async () => {
    alert('⚠️ Report generation is disabled. All reports must come from customer checkout payments. Only webhook-created reports can be completed by admins.')
    return
  }

  const handleDeleteReport = async (report: SimpleVehicleReport) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the report for ${report.rego} (${report.state})? This action cannot be undone.`
    )

    if (!confirmDelete) return

    try {
      // Check if this is a webhook report (exists in API) or localStorage report
      let isApiReport = false

      // First try to delete from API
      try {
        const deleteResponse = await fetch(`/api/admin/reports?id=${report.id}`, {
          method: 'DELETE'
        })

        if (deleteResponse.ok) {
          isApiReport = true
          console.log('Deleted from API successfully')
        } else if (deleteResponse.status !== 404) {
          // If it's not a 404, something else went wrong
          const errorData = await deleteResponse.json()
          throw new Error(errorData.message || 'Failed to delete from API')
        }
      } catch (apiError) {
        console.log('Report not found in API, trying localStorage...')
      }

      // Also try to delete from localStorage (for admin-created reports)
      const existingSavedReports = JSON.parse(localStorage.getItem('savedReports') || '[]')
      const updatedSavedReports = existingSavedReports.filter((r: any) => r.id !== report.id)

      if (updatedSavedReports.length !== existingSavedReports.length) {
        localStorage.setItem('savedReports', JSON.stringify(updatedSavedReports))
        console.log('Deleted from localStorage successfully')
      }

      // Also remove from pending reports if it exists there
      const existingPendingReports = JSON.parse(localStorage.getItem('pendingReports') || '[]')
      const updatedPendingReports = existingPendingReports.filter((r: any) => r.id !== report.id)

      if (updatedPendingReports.length !== existingPendingReports.length) {
        localStorage.setItem('pendingReports', JSON.stringify(updatedPendingReports))
        console.log('Deleted from pending reports successfully')
      }

      // Update UI state immediately
      setSavedReports(prev => prev.filter(r => r.id !== report.id))
      setPendingReports(prev => prev.filter(r => r.id !== report.id))

      alert('Report deleted successfully!')

    } catch (error) {
      console.error('Error deleting report:', error)
      alert('Failed to delete report. Please try again.')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'draft': return <Edit className="h-4 w-4 text-blue-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredReports = allReports.filter(report =>
    (report.rego || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (report.make || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (report.model || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Car Verify Admin</h1>
                <p className="text-gray-500 text-sm">Vehicle Report Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">System Online</span>
                </div>
                <div className="text-gray-500">Last updated: 2 min ago</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">AD</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">admin@carverify.com.au</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <div className="w-72">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'reports'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <FileText className="mr-3 h-5 w-5" />
                  All Reports
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    activeTab === 'reports' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {filteredReports.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('generate')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'generate'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Plus className="mr-3 h-5 w-5" />
                  Generate Report
                </button>
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'builder'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Edit className="mr-3 h-5 w-5" />
                  Report Builder
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    activeTab === 'builder' ? 'bg-blue-500 text-white' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {pendingReports.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </button>
              </nav>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 font-semibold text-gray-900">System Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reports</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">1,247</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">234</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">+8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Reports</span>
                  <span className="text-lg font-bold text-orange-600">{pendingReports.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="text-lg font-bold text-gray-900">89</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'reports' && (
              <div className="space-y-6">
                {/* Pending Customer Reports Section */}
                {pendingReports.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                        <div>
                          <h3 className="text-lg font-bold text-orange-900">Pending Customer Reports</h3>
                          <p className="text-orange-700 text-sm">Complete these customer-submitted reports</p>
                        </div>
                      </div>
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {pendingReports.length} pending
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pendingReports.map((report) => (
                        <div key={report.id} className="bg-white border border-orange-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-bold text-gray-900">{report.rego}</div>
                              <div className="text-sm text-gray-600">{report.state}</div>
                            </div>
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                              Pending
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            Submitted: {new Date(report.timestamp || report.generatedAt).toLocaleDateString()}
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                console.log('🎯 Complete Report clicked for report:', report.id)
                                setEditingReport(report.id)
                                setActiveTab('builder')
                              }}
                              className="w-full bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                            >
                              Complete Report
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report)}
                              className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Reports Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">All Vehicle Reports</h2>
                        <p className="text-gray-500 mt-1">View and manage completed reports</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
                          />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Export All
                        </button>
                      </div>
                    </div>
                  </div>

                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registration</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Generated</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {report.year} {report.make} {report.model}
                              </div>
                              {report.vin && (
                                <div className="text-sm text-gray-500">VIN: {report.vin}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.rego}</div>
                            <div className="text-sm text-gray-500">{report.state}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {report.customerName || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {report.customerEmail || 'No email'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(report.status)}
                              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {report.reportType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(report.generatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedReport(report)}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors text-xs font-medium"
                                title="View Report"
                              >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </button>
                              <button
                                onClick={() => {
                                  setEditingReport(report.id)
                                  setActiveTab('builder')
                                }}
                                className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-md transition-colors text-xs font-medium"
                                title="Edit Report"
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteReport(report)}
                                className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors text-xs font-medium"
                                title="Delete Report"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Delete
                              </button>
                              {report.status === 'complete' && (
                                <>
                                  <button
                                    onClick={async () => {
                                      // Get the saved report data from both localStorage and API
                                      const localReports = JSON.parse(localStorage.getItem('savedReports') || '[]')

                                      // Try to get API reports
                                      let apiReports: any[] = []
                                      try {
                                        const response = await fetch('/api/admin/reports')
                                        if (response.ok) {
                                          const data = await response.json()
                                          apiReports = data.reports || []
                                        }
                                      } catch (error) {
                                        console.error('Failed to fetch API reports for email:', error)
                                      }

                                      // Find the report in API reports first (these have customer email)
                                      let reportData = null
                                      let customerEmail = ''
                                      let customerName = ''

                                      console.log('🔍 Email Debug - Looking for report:', report.id)
                                      console.log('🔍 Local reports count:', localReports.length)
                                      console.log('🔍 API reports count:', apiReports.length)

                                      // First try to find in API reports (these will have customer info)
                                      const apiReport = apiReports.find((r: any) => r.id === report.id)
                                      if (apiReport) {
                                        console.log('🔍 Found in API reports!')
                                        console.log('🔍 API report structure:', Object.keys(apiReport))

                                        // Customer email/name is at top level of API report
                                        customerEmail = apiReport.customerEmail || ''
                                        customerName = apiReport.customerName || ''

                                        // Report data for sending is either the reportData field or the apiReport itself
                                        reportData = apiReport.reportData || apiReport

                                        console.log('🔍 Customer email from API:', customerEmail)
                                        console.log('🔍 Customer name from API:', customerName)
                                      } else {
                                        // Fall back to localStorage reports
                                        const localReport = localReports.find((r: any) => r.id === report.id)
                                        if (localReport) {
                                          console.log('🔍 Found in localStorage')
                                          reportData = localReport
                                          customerEmail = localReport.customerEmail || ''
                                          customerName = localReport.customerName || ''
                                        }
                                      }

                                      console.log('🔍 Final customerEmail:', customerEmail)
                                      console.log('🔍 Final customerName:', customerName)
                                      console.log('🔍 Final reportData found:', !!reportData)

                                      if (!reportData) {
                                        alert('Report data not found')
                                        return
                                      }

                                      if (!customerEmail) {
                                        alert('Customer email not found in report data')
                                        return
                                      }

                                      // Prompt user to attach PPSR certificate
                                      const attachPPSR = confirm('Would you like to attach a PPSR certificate PDF to this email?')

                                      let ppsrData = null
                                      if (attachPPSR) {
                                        // Create file input
                                        const fileInput = document.createElement('input')
                                        fileInput.type = 'file'
                                        fileInput.accept = 'application/pdf,.pdf'

                                        // Wait for file selection
                                        const filePromise = new Promise<File | null>((resolve) => {
                                          fileInput.onchange = (e) => {
                                            const file = (e.target as HTMLInputElement).files?.[0]
                                            resolve(file || null)
                                          }
                                          fileInput.oncancel = () => resolve(null)
                                        })

                                        fileInput.click()
                                        const file = await filePromise

                                        if (file) {
                                          // Convert to base64
                                          const reader = new FileReader()
                                          const base64Promise = new Promise<string>((resolve, reject) => {
                                            reader.onload = () => {
                                              const base64 = (reader.result as string).split(',')[1]
                                              resolve(base64)
                                            }
                                            reader.onerror = reject
                                          })

                                          reader.readAsDataURL(file)
                                          const base64Data = await base64Promise

                                          ppsrData = {
                                            ppsrCertificateData: base64Data,
                                            ppsrCertificateFilename: file.name,
                                            ppsrCertificateType: file.type
                                          }

                                          console.log('📎 PPSR certificate attached:', file.name)
                                        }
                                      }

                                      try {
                                        // Merge PPSR data into reportData if provided
                                        const finalReportData = ppsrData ? { ...reportData, ...ppsrData } : reportData

                                        const emailResponse = await fetch('/api/send-report-email', {
                                          method: 'POST',
                                          headers: {
                                            'Content-Type': 'application/json',
                                          },
                                          body: JSON.stringify({
                                            customerEmail: customerEmail,
                                            customerName: customerName,
                                            reportData: finalReportData,
                                            rego: report.rego,
                                            state: report.state
                                          }),
                                        })

                                        if (emailResponse.ok) {
                                          alert('Email sent successfully!' + (ppsrData ? ' (with PPSR certificate attached)' : ''))
                                        } else {
                                          alert('Failed to send email. Please check email settings.')
                                        }
                                      } catch (error) {
                                        console.error('Error sending email:', error)
                                        alert('Failed to send email. Please check email settings.')
                                      }
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors text-xs font-medium"
                                    title="Email Report to Customer"
                                  >
                                    <Mail className="h-3.5 w-3.5 mr-1" />
                                    Email
                                  </button>
                                  <button
                                    className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors text-xs font-medium"
                                    title="Download Report"
                                  >
                                    <Download className="h-3.5 w-3.5 mr-1" />
                                    PDF
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            )}

            {activeTab === 'generate' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate New Report</h2>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        value={newReportRego}
                        onChange={(e) => setNewReportRego(e.target.value.toUpperCase())}
                        placeholder="e.g., ABC123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/Territory
                      </label>
                      <select
                        value={newReportState}
                        onChange={(e) => setNewReportState(e.target.value)}
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
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['basic', 'comprehensive', 'premium'] as const).map((type) => (
                        <label key={type} className="relative">
                          <input
                            type="radio"
                            name="reportType"
                            value={type}
                            checked={reportType === type}
                            onChange={(e) => setReportType(e.target.value as typeof type)}
                            className="sr-only"
                          />
                          <div className={`p-4 border rounded-lg cursor-pointer ${
                            reportType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}>
                            <div className="font-medium text-gray-900 capitalize">{type}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {type === 'basic' && 'Essential vehicle information'}
                              {type === 'comprehensive' && 'Complete history & records'}
                              {type === 'premium' && 'Full analysis & valuation'}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={handleGenerateReport}
                      disabled={!newReportRego || !newReportState || isGenerating}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Generate Report
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'builder' && (
              <div className="h-full">
                <SimpleReportBuilder
                  reportId={editingReport || undefined}
                  onSave={handleSaveReport}
                  onPreview={handlePreviewReport}
                />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">1,247</div>
                        <div className="text-sm text-gray-500">Total Reports</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">89</div>
                        <div className="text-sm text-gray-500">Active Users</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">98.5%</div>
                        <div className="text-sm text-gray-500">Success Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">2.3s</div>
                        <div className="text-sm text-gray-500">Avg Response</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Report generated for ABC123 (NSW)</div>
                        <div className="text-sm text-gray-500">2 minutes ago</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Complete</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">New user registration</div>
                        <div className="text-sm text-gray-500">15 minutes ago</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">User</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">System maintenance completed</div>
                        <div className="text-sm text-gray-500">1 hour ago</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">System</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Blue Flag API Key
                        </label>
                        <input
                          type="password"
                          placeholder="Enter API key"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          MotorWeb API Key
                        </label>
                        <input
                          type="password"
                          placeholder="Enter API key"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Report Templates</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Basic Report Template</div>
                          <div className="text-sm text-gray-500">Essential vehicle information only</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Comprehensive Report Template</div>
                          <div className="text-sm text-gray-500">Complete history and records</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Premium Report Template</div>
                          <div className="text-sm text-gray-500">Full analysis with valuation</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Database Connection</span>
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>API Services</span>
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Report Generation</span>
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Vehicle Report - {selectedReport.rego} ({selectedReport.state})
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {selectedReport.status === 'complete' && (() => {
                const reportData = generateMockReportData(selectedReport)
                return (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Vehicle Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-medium">Registration:</span> {reportData.vehicleDetails.registration}</div>
                        <div><span className="font-medium">State:</span> {reportData.vehicleDetails.state}</div>
                        <div><span className="font-medium">Make/Model:</span> {reportData.vehicleDetails.make} {reportData.vehicleDetails.model}</div>
                        <div><span className="font-medium">Year:</span> {reportData.vehicleDetails.year}</div>
                        <div><span className="font-medium">VIN:</span> {reportData.vehicleDetails.vin}</div>
                        <div><span className="font-medium">Body Type:</span> {reportData.vehicleDetails.bodyType}</div>
                        <div><span className="font-medium">Colour:</span> {reportData.vehicleDetails.colour}</div>
                        <div><span className="font-medium">Fuel Type:</span> {reportData.vehicleDetails.fuelType}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Market Valuation</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div><span className="font-medium">Retail Value:</span> {reportData.marketValue.retailValue}</div>
                        <div><span className="font-medium">Trade Value:</span> {reportData.marketValue.tradeValue}</div>
                        <div><span className="font-medium">Private Value:</span> {reportData.marketValue.privateValue}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Ownership History</h4>
                      <div className="space-y-2">
                        {reportData.ownershipHistory.map((owner, index) => (
                          <div key={index} className="text-sm">
                            Owner {owner.ownerNumber}: {owner.period} ({owner.state})
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Security Interests</h4>
                      {reportData.encumbrances.length > 0 ? (
                        <div className="space-y-2">
                          {reportData.encumbrances.map((enc, index) => (
                            <div key={index} className="text-sm">
                              {enc.type} - {enc.company} ({enc.status})
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-green-600">No active security interests</div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Safety & Recalls</h4>
                      {reportData.recalls.length > 0 ? (
                        <div className="space-y-2">
                          {reportData.recalls.map((recall, index) => (
                            <div key={index} className="text-sm">
                              {recall.campaign}: {recall.description} ({recall.status})
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-green-600">No outstanding recalls</div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </button>
                      <button
                        onClick={() => setSelectedReport(null)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )
              })()}

              {selectedReport.status === 'pending' && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <div className="text-lg font-medium text-gray-900 mb-2">Report Generation in Progress</div>
                  <div className="text-gray-500">This report is currently being generated. Please check back shortly.</div>
                </div>
              )}

              {selectedReport.status === 'error' && (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <div className="text-lg font-medium text-gray-900 mb-2">Report Generation Failed</div>
                  <div className="text-gray-500 mb-4">There was an error generating this report. Please try again.</div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Retry Generation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminAuth>
      <AdminDashboard />
    </AdminAuth>
  )
}