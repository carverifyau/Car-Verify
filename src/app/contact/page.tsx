'use client'

import Link from 'next/link'
import { ArrowLeft, Mail, MessageCircle, HelpCircle, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Support</h1>
        <p className="text-gray-600 mb-8">We're here to help! Get in touch with us for any questions or issues.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Send us an email and we'll get back to you within 24 hours.
                  </p>
                  <a
                    href="mailto:support@car-verify.com.au"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    support@car-verify.com.au
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-gray-600 text-sm">
                    <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM AEST
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    We typically respond within 2-4 hours during business hours, and within 24 hours on weekends.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <HelpCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Order Issues</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    If you haven't received your PPSR certificate:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>✓ Check your spam/junk folder</li>
                    <li>✓ Verify the email address you provided</li>
                    <li>✓ Allow up to 24 hours for delivery</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-3">
                    Still missing? Email us with your order number.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How long does delivery take?</h3>
                <p className="text-gray-600 text-sm">
                  PPSR certificates are typically delivered within a few hours during business hours. Maximum delivery time is 24 hours.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I get a refund?</h3>
                <p className="text-gray-600 text-sm">
                  Refunds are available if we cannot process your check or if you made an error within 24 hours. See our <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link> for full details.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">I entered the wrong rego/VIN</h3>
                <p className="text-gray-600 text-sm">
                  Contact us immediately at support@car-verify.com.au with your order number and correct details. If we haven't processed it yet, we can update it for free.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What's included in the PPSR check?</h3>
                <p className="text-gray-600 text-sm">
                  Our PPSR certificate includes: finance owing status, write-off history, stolen vehicle check, and registration encumbrances.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is my payment secure?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! All payments are processed through Stripe with bank-level encryption. We never store your credit card details.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I check multiple vehicles?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! Each vehicle check is $14.99. Simply submit a new check for each vehicle you want to verify.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-blue-900 text-sm">
                <strong>Still have questions?</strong> Email us at support@car-verify.com.au and we'll help you out!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
          <MessageCircle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Need immediate assistance?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Send us an email and we'll get back to you as soon as possible. We're here to ensure your vehicle check experience is smooth and hassle-free.
          </p>
          <a
            href="mailto:support@car-verify.com.au"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Email Support Team
          </a>
        </div>
      </div>
    </div>
  )
}
