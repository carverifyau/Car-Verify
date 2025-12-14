'use client'

import { useState, useEffect } from 'react'
import { Upload, Mail, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import AdminAuth from '@/components/AdminAuth'

interface PendingOrder {
  id: string
  customerEmail: string
  customerName: string
  rego?: string
  vin?: string
  state?: string
  timestamp: string
  status: 'pending' | 'completed'
}

interface Customer {
  id: string
  email: string
  name?: string
}

function PPSRAdminDashboard() {
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null)
  const [ppsrFile, setPpsrFile] = useState<File | null>(null)
  const [isSending, setIsSending] = useState(false)

  // New states for existing customers
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [manualRego, setManualRego] = useState('')
  const [manualState, setManualState] = useState('QLD')
  const [manualVin, setManualVin] = useState('')
  const [useVin, setUseVin] = useState(false)

  // Load pending orders from Supabase
  useEffect(() => {
    loadOrders()
    loadCustomers()
    const interval = setInterval(loadOrders, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/admin/reports')
      if (response.ok) {
        const data = await response.json()
        const orders = (data.reports || []).map((report: any) => ({
          id: report.id,
          customerEmail: report.customerEmail || 'No email',
          customerName: report.customerName || 'No name',
          rego: report.rego,
          vin: report.vin,
          state: report.state,
          timestamp: report.timestamp || report.created_at,
          status: report.status === 'completed' ? 'completed' : 'pending'
        }))

        setPendingOrders(orders)
      }
    } catch (error) {
      console.error('Failed to load orders:', error)
    }
  }

  const loadCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers')
      if (response.ok) {
        const data = await response.json()
        setCustomers(data.customers || [])
      }
    } catch (error) {
      console.error('Failed to load customers:', error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPpsrFile(file)
    } else {
      alert('Please select a PDF file')
    }
  }

  const handleSendEmail = async () => {
    if (!selectedOrder || !ppsrFile) {
      alert('Please select an order and upload a PPSR PDF')
      return
    }

    setIsSending(true)

    try {
      // Convert PDF to base64
      const reader = new FileReader()
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1]
          resolve(base64)
        }
        reader.onerror = reject
      })

      reader.readAsDataURL(ppsrFile)
      const base64Data = await base64Promise

      // Send email with PPSR attachment
      const emailResponse = await fetch('/api/send-report-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: selectedOrder.customerEmail,
          customerName: selectedOrder.customerName,
          reportData: {
            ppsrCertificateData: base64Data,
            ppsrCertificateFilename: ppsrFile.name,
            ppsrCertificateType: ppsrFile.type
          },
          rego: selectedOrder.rego,
          vin: selectedOrder.vin,
          state: selectedOrder.state,
          reportId: selectedOrder.id  // Pass report ID to store PDF
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      // Mark order as completed
      await fetch('/api/admin/reports', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedOrder.id,
          status: 'completed'
        })
      })

      alert('✅ PPSR certificate sent successfully!')

      // Reset and reload
      setSelectedOrder(null)
      setPpsrFile(null)
      loadOrders()

    } catch (error) {
      console.error('Error sending email:', error)
      alert('❌ Failed to send email. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const handleSendToCustomer = async () => {
    if (!selectedCustomer || !ppsrFile) {
      alert('Please select a customer and upload a PPSR PDF')
      return
    }

    if (!useVin && (!manualRego || !manualState)) {
      alert('Please enter registration and state, or select VIN')
      return
    }

    if (useVin && !manualVin) {
      alert('Please enter VIN number')
      return
    }

    setIsSending(true)

    try {
      // Convert PDF to base64
      const reader = new FileReader()
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1]
          resolve(base64)
        }
        reader.onerror = reject
      })

      reader.readAsDataURL(ppsrFile)
      const base64Data = await base64Promise

      // Send email with PPSR attachment
      const emailResponse = await fetch('/api/send-report-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: selectedCustomer.email,
          customerName: selectedCustomer.name || 'Customer',
          reportData: {
            ppsrCertificateData: base64Data,
            ppsrCertificateFilename: ppsrFile.name,
            ppsrCertificateType: ppsrFile.type
          },
          rego: useVin ? undefined : manualRego,
          state: useVin ? undefined : manualState,
          vin: useVin ? manualVin : undefined
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      alert(`✅ PPSR certificate sent successfully to ${selectedCustomer.email}!`)

      // Reset form
      setSelectedCustomer(null)
      setPpsrFile(null)
      setManualRego('')
      setManualState('QLD')
      setManualVin('')
      setUseVin(false)

    } catch (error) {
      console.error('Error sending email:', error)
      alert('❌ Failed to send email. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const pending = pendingOrders.filter(o => o.status === 'pending')
  const completed = pendingOrders.filter(o => o.status === 'completed')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">PPSR Admin - Simple Workflow</h1>
          <p className="text-gray-500 mt-1">Process pending orders → Upload PPSR → Send email</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Send to Existing Customer Section */}
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">📨 Send Report to Existing Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select Customer */}
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <label className="block text-sm font-bold text-gray-900 mb-2">Select Customer Account</label>
              <select
                value={selectedCustomer?.id || ''}
                onChange={(e) => {
                  const customer = customers.find(c => c.id === e.target.value)
                  setSelectedCustomer(customer || null)
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Choose customer...</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.email} {customer.name ? `(${customer.name})` : ''}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">{customers.length} customers available</p>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-900">Vehicle Information</label>
                <button
                  onClick={() => setUseVin(!useVin)}
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                >
                  {useVin ? 'Use Rego' : 'Use VIN'}
                </button>
              </div>

              {useVin ? (
                <input
                  type="text"
                  value={manualVin}
                  onChange={(e) => setManualVin(e.target.value.toUpperCase())}
                  placeholder="VIN Number"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={manualRego}
                    onChange={(e) => setManualRego(e.target.value.toUpperCase())}
                    placeholder="Rego"
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <select
                    value={manualState}
                    onChange={(e) => setManualState(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="QLD">QLD</option>
                    <option value="NSW">NSW</option>
                    <option value="VIC">VIC</option>
                    <option value="SA">SA</option>
                    <option value="WA">WA</option>
                    <option value="TAS">TAS</option>
                    <option value="NT">NT</option>
                    <option value="ACT">ACT</option>
                  </select>
                </div>
              )}
            </div>

            {/* Upload and Send */}
            <div className="md:col-span-2 bg-white rounded-lg p-4 border border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Upload PPSR PDF</label>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="manual-ppsr-upload"
                  />
                  <label
                    htmlFor="manual-ppsr-upload"
                    className="block w-full p-3 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    {ppsrFile ? (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900 text-sm">{ppsrFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Upload className="h-5 w-5 text-purple-600" />
                        <span className="text-purple-700 text-sm">Click to upload</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Send Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleSendToCustomer}
                    disabled={!selectedCustomer || !ppsrFile || isSending}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center space-x-2 transition-colors"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        <span>Send to Customer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Pending Orders */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Pending Orders</h2>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pending.length} pending
                </span>
              </div>

              {pending.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No pending orders</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pending.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedOrder?.id === order.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-gray-900">
                            {order.vin || `${order.rego} - ${order.state}`}
                          </div>
                          <div className="text-sm text-gray-600">{order.customerEmail}</div>
                        </div>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                          Pending
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.timestamp).toLocaleString('en-AU')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Orders */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Completed Today</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {completed.length}
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {completed.slice(0, 10).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="text-sm">
                      <div className="font-medium">{order.vin || order.rego}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Process Order */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Process Order</h2>

              {!selectedOrder ? (
                <div className="text-center py-12 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Select a pending order to process</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Step 1: Order Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold text-blue-900 mb-3">Step 1: Order Information</h3>
                    <div className="space-y-3">
                      {/* Vehicle Info - Easy to copy */}
                      {selectedOrder.vin ? (
                        <div>
                          <div className="text-xs text-gray-600 mb-1">VIN Number:</div>
                          <div className="bg-white border border-blue-300 rounded p-3 font-mono text-lg font-bold text-gray-900 tracking-wider select-all">
                            {selectedOrder.vin}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Registration:</div>
                            <div className="bg-white border border-blue-300 rounded p-3 font-bold text-lg text-gray-900 tracking-wider select-all">
                              {selectedOrder.rego}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 mb-1">State:</div>
                            <div className="bg-white border border-blue-300 rounded p-3 font-bold text-lg text-gray-900 select-all">
                              {selectedOrder.state}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Customer Info */}
                      <div className="pt-2 border-t border-blue-200">
                        <div className="text-xs text-gray-600 mb-1">Customer:</div>
                        <div className="text-sm font-medium text-gray-900">{selectedOrder.customerName}</div>
                        <div className="text-sm text-gray-600 select-all">{selectedOrder.customerEmail}</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Upload PPSR */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-bold text-orange-900 mb-3">Step 2: Upload PPSR Certificate</h3>
                    <div className="text-sm text-orange-700 mb-3">
                      Run PPSR check at ppsr.gov.au and upload the PDF certificate
                    </div>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="ppsr-upload"
                    />
                    <label
                      htmlFor="ppsr-upload"
                      className="block w-full p-4 border-2 border-dashed border-orange-300 rounded-lg text-center cursor-pointer hover:border-orange-400 hover:bg-orange-100 transition-colors"
                    >
                      {ppsrFile ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-gray-900">{ppsrFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Upload className="h-5 w-5 text-orange-600" />
                          <span className="text-orange-700">Click to upload PPSR PDF</span>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Step 3: Send Email */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-3">Step 3: Send to Customer</h3>
                    <button
                      onClick={handleSendEmail}
                      disabled={!ppsrFile || isSending}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      {isSending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="h-5 w-5" />
                          <span>Send PPSR Certificate</span>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-green-700 mt-2 text-center">
                      This will email the PDF to {selectedOrder.customerEmail}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-blue-900 mb-3">Quick Instructions</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li>1. Click on a pending order (left side)</li>
                <li>2. Go to <a href="https://www.ppsr.gov.au" target="_blank" className="underline">ppsr.gov.au</a> and run the check</li>
                <li>3. Download the PPSR certificate PDF</li>
                <li>4. Upload it using the button above</li>
                <li>5. Click "Send PPSR Certificate"</li>
                <li>6. Done! Order automatically marked complete</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PPSRAdminPage() {
  return (
    <AdminAuth>
      <PPSRAdminDashboard />
    </AdminAuth>
  )
}
