'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Calendar, FileText, CreditCard, AlertCircle, User, BarChart3, Settings, Download, Clock, CheckCircle2, TrendingUp, Car } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'
import CancelSubscriptionButton from '@/components/CancelSubscriptionButton'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase-client'

type Tab = 'reports' | 'subscription' | 'usage' | 'settings'

export default function AccountPage() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<Tab>('reports')
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [customer, setCustomer] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      setUser(session.user)

      const { data: customerData } = await supabase
        .from('customers')
        .select('*')
        .eq('id', session.user.id)
        .single()

      setCustomer(customerData)

      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('customer_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setSubscription(subscriptionData)

      const { data: reportsData } = await supabase
        .from('reports')
        .select('*')
        .eq('customer_id', session.user.id)
        .order('created_at', { ascending: false })

      setReports(reportsData || [])
      setIsLoading(false)
    }

    loadData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  const checksRemaining = subscription
    ? subscription.checks_limit - subscription.checks_used
    : 0

  const usagePercentage = subscription
    ? Math.round((subscription.checks_used / subscription.checks_limit) * 100)
    : 0

  return (
    <div className="min-h-screen bg-white">
      {/* Website Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold text-gray-900">Car Verify</span>
                <div className="text-[10px] md:text-xs text-blue-600 font-medium">AUTHORISED PPSR PROVIDER</div>
              </div>
            </Link>
            <nav className="flex items-center space-x-4 md:space-x-8">
              <Link href="/" className="hidden md:inline text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium">
                Home
              </Link>
              <Link href="/#how-it-works" className="hidden md:inline text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium">
                How it Works
              </Link>
              <Link href="/#sample-report" className="hidden md:inline text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium">
                Sample Report
              </Link>
              <SignOutButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Account Page Content */}
      <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 min-h-screen">
        {/* Page Title */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-600 mt-1">{customer?.email || user?.email}</p>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Banner */}
        {subscription && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Reports Generated</p>
                  <p className="text-3xl font-bold mt-1">{reports.length}</p>
                </div>
                <FileText className="h-10 w-10 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Checks Remaining</p>
                  <p className="text-3xl font-bold mt-1">{checksRemaining}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Monthly Usage</p>
                  <p className="text-3xl font-bold mt-1">{usagePercentage}%</p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Status</p>
                  <p className="text-2xl font-bold mt-1 capitalize">{subscription.status}</p>
                </div>
                <Shield className="h-10 w-10 text-orange-200" />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'reports'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>My Reports</span>
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'subscription'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Subscription</span>
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'usage'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Usage</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'settings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* MY REPORTS TAB */}
            {activeTab === 'reports' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Your PPSR Reports</h2>
                    <p className="text-sm text-gray-600 mt-1">View and download all your vehicle reports</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
                  </div>
                </div>

                {/* Processing Time Notice */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-blue-900 font-medium">Report Processing Time</p>
                      <p className="text-blue-700 text-sm mt-1">
                        New reports typically appear within <strong>2 hours</strong> during business hours (Mon-Fri, 9AM-5PM AEST).
                        Reports ordered outside business hours will be processed the next business day.
                      </p>
                    </div>
                  </div>
                </div>

                {reports.length > 0 ? (
                  <div className="space-y-4">
                    {reports.map((report) => {
                      const vehicleInfo = report.vehicle_identifier
                      const isRego = vehicleInfo?.type === 'rego'

                      return (
                        <div
                          key={report.id}
                          className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all bg-white"
                        >
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  report.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : report.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {report.status === 'completed' && '✓ '}
                                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                </div>
                                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                  {report.report_type}
                                </div>
                              </div>

                              <div>
                                <p className="font-bold text-lg text-gray-900">
                                  {isRego
                                    ? `${vehicleInfo.rego} (${vehicleInfo.state})`
                                    : `VIN: ${vehicleInfo.vin}`
                                  }
                                </p>
                                <p className="text-sm text-gray-600 mt-1 flex items-center">
                                  <Calendar className="h-4 w-4 inline mr-1" />
                                  Ordered {new Date(report.created_at).toLocaleDateString('en-AU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                            </div>

                            <div className="flex-shrink-0">
                              {report.status === 'completed' ? (
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
                                  <Download className="h-4 w-4" />
                                  <span>Download PDF</span>
                                </button>
                              ) : (
                                <div className="bg-gray-100 text-gray-500 px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                                  <span>Processing...</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Purchase your first PPSR check to see it here. Reports appear within 2 hours during business hours.
                    </p>
                    <a
                      href="/"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                    >
                      <Shield className="h-5 w-5" />
                      <span>Get PPSR Check</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* SUBSCRIPTION TAB */}
            {activeTab === 'subscription' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Subscription Management</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage your plan and billing</p>
                </div>

                {subscription ? (
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Current Plan</h3>
                          <p className="text-2xl font-bold text-blue-600 mt-1">$20/month</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-semibold ${
                          subscription.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600">Monthly Checks</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">10 PPSR checks</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600">Checks Used</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">
                            {subscription.checks_used} / {subscription.checks_limit}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600">Checks Remaining</p>
                          <p className={`text-xl font-bold mt-1 ${
                            checksRemaining > 3 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {checksRemaining} checks
                          </p>
                        </div>
                        {subscription.current_period_end && (
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-600">Next Billing Date</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">
                              {new Date(subscription.current_period_end).toLocaleDateString('en-AU', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cancellation Notice */}
                    {subscription.cancel_at && (
                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-orange-900">Subscription Ending</p>
                            <p className="text-sm text-orange-700 mt-1">
                              Your subscription will end on{' '}
                              <strong>{new Date(subscription.cancel_at).toLocaleDateString('en-AU')}</strong>.
                              You'll keep access until then.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancel Subscription */}
                    {subscription.status === 'active' && !subscription.cancel_at && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Cancel Subscription</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          You can cancel your subscription at any time. You'll keep access until the end of your current billing period.
                        </p>
                        <CancelSubscriptionButton
                          subscriptionId={subscription.stripe_subscription_id}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No active subscription</h3>
                    <p className="text-gray-600 mb-6">Get started with a PPSR check</p>
                    <a
                      href="/"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Get Started
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* USAGE TAB */}
            {activeTab === 'usage' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Usage Statistics</h2>
                  <p className="text-sm text-gray-600 mt-1">Track your monthly usage and history</p>
                </div>

                {subscription ? (
                  <div className="space-y-6">
                    {/* Usage Progress */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Monthly Usage</h3>
                        <span className="text-2xl font-bold text-blue-600">{usagePercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div
                          className={`h-4 rounded-full transition-all ${
                            usagePercentage >= 80 ? 'bg-orange-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${usagePercentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        {subscription.checks_used} of {subscription.checks_limit} checks used this month
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <p className="text-blue-900 font-medium mb-2">Total Reports</p>
                        <p className="text-3xl font-bold text-blue-600">{reports.length}</p>
                        <p className="text-sm text-blue-700 mt-1">All time</p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <p className="text-green-900 font-medium mb-2">Checks Left</p>
                        <p className="text-3xl font-bold text-green-600">{checksRemaining}</p>
                        <p className="text-sm text-green-700 mt-1">This month</p>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <p className="text-purple-900 font-medium mb-2">Value Used</p>
                        <p className="text-3xl font-bold text-purple-600">
                          ${((subscription.checks_used * 20) / subscription.checks_limit).toFixed(2)}
                        </p>
                        <p className="text-sm text-purple-700 mt-1">This month</p>
                      </div>
                    </div>

                    {/* Billing Period Info */}
                    {subscription.current_period_start && subscription.current_period_end && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Current Billing Period</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Period Start</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(subscription.current_period_start).toLocaleDateString('en-AU', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Period End</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(subscription.current_period_end).toLocaleDateString('en-AU', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No usage data available</h3>
                    <p className="text-gray-600">Subscribe to track your usage</p>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                  <p className="text-sm text-gray-600 mt-1">Manage your account information</p>
                </div>

                <div className="space-y-6">
                  {/* Account Info */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      Account Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Email Address</label>
                        <p className="font-medium text-gray-900">{customer?.email || user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <p className="font-medium text-gray-900">{customer?.name || 'Not set'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Member Since</label>
                        <p className="font-medium text-gray-900">
                          {customer?.created_at
                            ? new Date(customer.created_at).toLocaleDateString('en-AU', {
                                month: 'long',
                                year: 'numeric',
                              })
                            : 'N/A'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-blue-600" />
                      Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">Login Method</p>
                          <p className="text-sm text-gray-600">Passwordless OTP (Email)</p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Secure
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-gray-900">Account Status</p>
                          <p className="text-sm text-gray-600">Active and verified</p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Verified
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      If you have any questions or need assistance, we're here to help.
                    </p>
                    <a
                      href="mailto:support@carverify.com.au"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
