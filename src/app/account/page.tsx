import { redirect } from 'next/navigation'
import {
  getCurrentUser,
  getCustomerData,
  getCustomerSubscription,
  getCustomerReports
} from '@/lib/supabase-auth'
import { Shield, Calendar, FileText, CreditCard, AlertCircle } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'
import CancelSubscriptionButton from '@/components/CancelSubscriptionButton'

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const customer = await getCustomerData()
  const subscription = await getCustomerSubscription()
  const reports = await getCustomerReports()

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
              <p className="text-gray-600 mt-1">{customer?.email || user.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Subscription Status */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Subscription</h2>
            </div>

            {subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold ${
                    subscription.status === 'active'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900">$20/month</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Checks Used</span>
                  <span className="font-semibold text-gray-900">
                    {subscription.checks_used} / {subscription.checks_limit}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Checks Remaining</span>
                  <span className={`font-semibold ${
                    checksRemaining > 3
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}>
                    {checksRemaining}
                  </span>
                </div>

                {subscription.current_period_end && (
                  <div className="flex items-center justify-between py-3 border-b">
                    <span className="text-gray-600">Next Billing Date</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(subscription.current_period_end).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}

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

                {subscription.status === 'active' && !subscription.cancel_at && (
                  <div className="pt-4">
                    <CancelSubscriptionButton
                      subscriptionId={subscription.stripe_subscription_id}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
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

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Quick Stats</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">{reports.length}</div>
                <div className="text-sm text-blue-900 mt-1">Total Reports</div>
              </div>

              {subscription && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reports History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Your PPSR Reports</h2>
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
      </div>
    </div>
  )
}
