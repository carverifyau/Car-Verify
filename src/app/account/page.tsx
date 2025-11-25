'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Calendar, FileText, CreditCard, AlertCircle, User } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'
import CancelSubscriptionButton from '@/components/CancelSubscriptionButton'
import { supabase } from '@/lib/supabase-client'

type Tab = 'reports' | 'plans'

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
      // Check auth
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      setUser(session.user)

      // Fetch customer data
      const { data: customerData } = await supabase
        .from('customers')
        .select('*')
        .eq('id', session.user.id)
        .single()

      setCustomer(customerData)

      // Fetch subscription
      const { data: subscriptionData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('customer_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setSubscription(subscriptionData)

      // Fetch reports
      const { data: reportsData } = await supabase
        .from('reports')
        .select('*')
        .eq('customer_id', session.user.id)
        .order('created_at', { ascending: false })

      setReports(reportsData || [])
      setIsLoading(false)
    }

    loadData()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const checksRemaining = subscription
    ? subscription.checks_limit - subscription.checks_used
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-1">{customer?.email || user?.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reports'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>My Reports</span>
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'plans'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                <span>My Plans</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'reports' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">Your PPSR Reports</h2>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Reports: <span className="font-semibold text-gray-900">{reports.length}</span>
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
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  report.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : report.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                </div>
                                <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {report.report_type}
                                </div>
                              </div>

                              <div className="mt-2">
                                <p className="font-semibold text-gray-900">
                                  {isRego
                                    ? `${vehicleInfo.rego} (${vehicleInfo.state})`
                                    : `VIN: ${vehicleInfo.vin}`
                                  }
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  <Calendar className="h-4 w-4 inline mr-1" />
                                  {new Date(report.created_at).toLocaleDateString('en-AU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                            </div>

                            <div className="ml-4">
                              {report.status === 'completed' ? (
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                  Download PDF
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium"
                                >
                                  Processing...
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No reports yet</p>
                    <p className="text-sm text-gray-500 mb-6">
                      Purchase your first PPSR check to see it here
                    </p>
                    <a
                      href="/"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Get PPSR Check
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'plans' && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Subscription Management</h2>
                </div>

                {subscription ? (
                  <div className="space-y-6">
                    {/* Subscription Details */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center justify-between py-3 border-b border-blue-200">
                            <span className="text-gray-700">Status</span>
                            <span className={`font-semibold ${
                              subscription.status === 'active'
                                ? 'text-green-600'
                                : 'text-orange-600'
                            }`}>
                              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-3 border-b border-blue-200">
                            <span className="text-gray-700">Plan</span>
                            <span className="font-semibold text-gray-900">$20/month</span>
                          </div>

                          <div className="flex items-center justify-between py-3">
                            <span className="text-gray-700">Monthly Checks</span>
                            <span className="font-semibold text-gray-900">
                              10 PPSR checks
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between py-3 border-b border-blue-200">
                            <span className="text-gray-700">Checks Used</span>
                            <span className="font-semibold text-gray-900">
                              {subscription.checks_used} / {subscription.checks_limit}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-3 border-b border-blue-200">
                            <span className="text-gray-700">Checks Remaining</span>
                            <span className={`font-semibold ${
                              checksRemaining > 3
                                ? 'text-green-600'
                                : 'text-orange-600'
                            }`}>
                              {checksRemaining}
                            </span>
                          </div>

                          {subscription.current_period_end && (
                            <div className="flex items-center justify-between py-3">
                              <span className="text-gray-700">Next Billing Date</span>
                              <span className="font-semibold text-gray-900">
                                {new Date(subscription.current_period_end).toLocaleDateString('en-AU', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
                        <div className="text-sm text-blue-900 mt-1">Total Reports</div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="text-3xl font-bold text-green-600">
                          {checksRemaining}
                        </div>
                        <div className="text-sm text-green-900 mt-1">Checks Remaining</div>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="text-3xl font-bold text-purple-600">
                          ${((subscription.checks_used * 20) / subscription.checks_limit).toFixed(2)}
                        </div>
                        <div className="text-sm text-purple-900 mt-1">Value Used This Month</div>
                      </div>
                    </div>

                    {/* Cancellation Notice */}
                    {subscription.cancel_at && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-orange-900">
                              Subscription Ending
                            </p>
                            <p className="text-sm text-orange-700 mt-1">
                              Your subscription will end on{' '}
                              {new Date(subscription.cancel_at).toLocaleDateString('en-AU')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancel Button */}
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
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No active subscription</p>
                    <a
                      href="/"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Get Started
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
