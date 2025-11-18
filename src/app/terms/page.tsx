'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Head from 'next/head'

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Car Verify Australia</title>
        <meta name="description" content="Terms of Service for Car Verify - Rules and guidelines for using our PPSR checking service." />
      </Head>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: November 18, 2024</p>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <style jsx>{`
            h2 { font-size: 1.75rem; font-weight: bold; color: #000; margin-top: 2rem; margin-bottom: 1rem; }
            h3 { font-size: 1.25rem; font-weight: bold; color: #000; margin-top: 1.5rem; margin-bottom: 0.75rem; }
            p { color: #000; margin-bottom: 1rem; font-size: 1.125rem; line-height: 1.75; }
            ul { color: #000; margin-bottom: 1rem; margin-left: 1.5rem; list-style-type: disc; }
            li { color: #000; margin-bottom: 0.5rem; font-size: 1.125rem; }
            strong { color: #000; font-weight: 600; }
            a { color: #2563eb; text-decoration: underline; }
            a:hover { color: #1d4ed8; }
          `}</style>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using Car Verify ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Car Verify provides official PPSR (Personal Property Securities Register) certificate services for Australian vehicles. Our service includes:
          </p>
          <ul>
            <li>Official PPSR database searches</li>
            <li>Finance owing verification</li>
            <li>Write-off history checks</li>
            <li>Stolen vehicle status verification</li>
            <li>PDF certificate delivery via email</li>
          </ul>

          <h2>3. Pricing and Payment</h2>
          <h3>3.1 Service Fee</h3>
          <p>
            The current price for our PPSR certificate service is AUD $14.99 (including GST). Prices are subject to change with reasonable notice.
          </p>

          <h3>3.2 Payment Processing</h3>
          <p>
            All payments are processed securely through Stripe. We do not store your credit card information. Payment must be completed before we process your PPSR check.
          </p>

          <h3>3.3 One-Time Payment</h3>
          <p>
            Our service is a one-time payment per vehicle check. There are no recurring charges or subscriptions.
          </p>

          <h2>4. Refund Policy</h2>
          <h3>4.1 Eligibility for Refunds</h3>
          <p>You may be eligible for a full refund if:</p>
          <ul>
            <li>We are unable to process your PPSR check due to technical errors on our end</li>
            <li>You accidentally made duplicate purchases for the same vehicle</li>
            <li>You provided incorrect vehicle information and notify us within 24 hours</li>
          </ul>

          <h3>4.2 Non-Refundable Circumstances</h3>
          <p>Refunds will NOT be provided if:</p>
          <ul>
            <li>The PPSR certificate has already been delivered to your email</li>
            <li>You are dissatisfied with the results (e.g., finance owing was discovered)</li>
            <li>You provided incorrect vehicle information and did not notify us within 24 hours</li>
            <li>You changed your mind after receiving the certificate</li>
          </ul>

          <h3>4.3 How to Request a Refund</h3>
          <p>
            To request a refund, contact us at carverifyau@gmail.com within 7 days of purchase. Include your order number and reason for the refund request. Refunds are processed within 5-10 business days.
          </p>

          <h2>5. User Responsibilities</h2>
          <h3>5.1 Accurate Information</h3>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate vehicle registration or VIN details</li>
            <li>Provide a valid email address to receive your certificate</li>
            <li>Double-check information before submitting payment</li>
          </ul>

          <h3>5.2 Prohibited Uses</h3>
          <p>You agree NOT to:</p>
          <ul>
            <li>Use the Service for any illegal purposes</li>
            <li>Attempt to reverse-engineer or hack our systems</li>
            <li>Resell our certificates without authorization</li>
            <li>Use the Service to harass or stalk vehicle owners</li>
            <li>Provide false or misleading information</li>
          </ul>

          <h2>6. Data Accuracy and Liability</h2>
          <h3>6.1 Third-Party Data</h3>
          <p>
            Car Verify obtains PPSR data from official Australian government sources (AFSA - Australian Financial Security Authority). We do not create or modify this data.
          </p>

          <h3>6.2 No Warranty</h3>
          <p>
            While we strive for accuracy, Car Verify provides the Service "as is" without warranties of any kind. We do not guarantee:
          </p>
          <ul>
            <li>That PPSR data is 100% complete or error-free</li>
            <li>That the Service will be available at all times without interruption</li>
            <li>That all vehicles can be successfully searched</li>
          </ul>

          <h3>6.3 Limitation of Liability</h3>
          <p>
            Car Verify's total liability to you for any claims arising from the Service is limited to the amount you paid for the service (AUD $14.99).
          </p>
          <p>
            We are not liable for:
          </p>
          <ul>
            <li>Vehicle purchasing decisions made based on our reports</li>
            <li>Financial losses from vehicle transactions</li>
            <li>Inaccuracies in government PPSR data</li>
            <li>Delayed delivery due to email provider issues</li>
            <li>Any indirect, incidental, or consequential damages</li>
          </ul>

          <h2>7. Australian Consumer Law</h2>
          <p>
            Nothing in these Terms excludes, restricts, or modifies any consumer rights under the Australian Consumer Law (ACL) that cannot be excluded, restricted, or modified by agreement.
          </p>
          <p>
            Our services come with guarantees that cannot be excluded under the ACL. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.
          </p>

          <h2>8. Intellectual Property</h2>
          <h3>8.1 Our Content</h3>
          <p>
            All content on the Car Verify website (text, graphics, logos, design) is owned by us or our licensors and protected by copyright laws.
          </p>

          <h3>8.2 PPSR Certificates</h3>
          <p>
            PPSR certificates are official government documents. You may use them for personal vehicle verification purposes. Unauthorized commercial redistribution is prohibited.
          </p>

          <h2>9. Privacy and Data Protection</h2>
          <p>
            Your use of the Service is also governed by our <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>. By using the Service, you consent to our collection and use of your information as described in the Privacy Policy.
          </p>

          <h2>10. Delivery of Service</h2>
          <h3>10.1 Email Delivery</h3>
          <p>
            Your PPSR certificate will be delivered to the email address you provide, typically within 24 hours of payment (often much faster during business hours).
          </p>

          <h3>10.2 Email Issues</h3>
          <p>
            If you do not receive your certificate within 24 hours:
          </p>
          <ul>
            <li>Check your spam/junk folder</li>
            <li>Verify you provided the correct email address</li>
            <li>Contact us at carverifyau@gmail.com</li>
          </ul>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to refuse service or terminate access to users who violate these Terms, provide false information, or engage in fraudulent activity.
          </p>

          <h2>12. Modifications to Terms</h2>
          <p>
            We may update these Terms from time to time. Significant changes will be posted on this page with an updated "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Australia. Any disputes arising from these Terms or your use of the Service will be subject to the exclusive jurisdiction of Australian courts.
          </p>

          <h2>14. Dispute Resolution</h2>
          <h3>14.1 Informal Resolution</h3>
          <p>
            If you have a dispute with Car Verify, please contact us first at carverifyau@gmail.com. We will attempt to resolve disputes informally before pursuing formal legal action.
          </p>

          <h3>14.2 Consumer Protection</h3>
          <p>
            If informal resolution fails, you may contact:
          </p>
          <ul>
            <li><strong>Australian Competition & Consumer Commission (ACCC):</strong> www.accc.gov.au</li>
            <li><strong>Your state/territory consumer protection agency</strong></li>
          </ul>

          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
          </p>

          <h2>16. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Car Verify regarding the use of our Service.
          </p>

          <h2>17. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> carverifyau@gmail.com</li>
            <li><strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact Support Page</Link></li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-8">
            <p className="text-green-900 font-semibold mb-2">Questions About These Terms?</p>
            <p className="text-green-800 text-sm">
              We're here to help! If you have any questions about these Terms of Service or need clarification, please don't hesitate to contact us at carverifyau@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
