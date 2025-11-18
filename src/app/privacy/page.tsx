'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Head from 'next/head'

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Car Verify Australia</title>
        <meta name="description" content="Privacy Policy for Car Verify - How we collect, use, and protect your personal information." />
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
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

          <h2>1. Introduction</h2>
          <p>
            Car Verify ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our PPSR vehicle checking service.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We collect the following personal information when you use our service:</p>
          <ul>
            <li>Email address (for sending your PPSR certificate)</li>
            <li>Name (optional, for personalization)</li>
            <li>Payment information (processed securely via Stripe - we do not store credit card details)</li>
          </ul>

          <h3>2.2 Vehicle Information</h3>
          <p>To process your PPSR check, we collect:</p>
          <ul>
            <li>Vehicle Registration Number (Rego)</li>
            <li>State/Territory of registration</li>
            <li>Vehicle Identification Number (VIN) - if provided</li>
          </ul>

          <h3>2.3 Automatically Collected Information</h3>
          <p>We automatically collect certain information when you visit our website:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referral source (how you found our website)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To process your PPSR check requests</li>
            <li>To deliver your PPSR certificate via email</li>
            <li>To process payments securely</li>
            <li>To send order confirmations and service updates</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>To detect and prevent fraud</li>
          </ul>

          <h2>4. How We Share Your Information</h2>
          <h3>4.1 Third-Party Service Providers</h3>
          <p>We share your information with trusted third parties who help us operate our business:</p>
          <ul>
            <li><strong>Stripe:</strong> Payment processing (PCI DSS compliant)</li>
            <li><strong>PPSR/AFSA:</strong> To conduct official vehicle checks</li>
            <li><strong>Email service providers:</strong> To deliver your PPSR certificates</li>
            <li><strong>Google Analytics:</strong> Website analytics (anonymized data)</li>
            <li><strong>Supabase:</strong> Secure database hosting</li>
          </ul>

          <h3>4.2 Legal Requirements</h3>
          <p>We may disclose your information if required by law, court order, or government request.</p>

          <h3>4.3 Business Transfers</h3>
          <p>If Car Verify is involved in a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</p>

          <h2>5. Data Security</h2>
          <p>We implement industry-standard security measures to protect your information:</p>
          <ul>
            <li>SSL/TLS encryption for data transmission</li>
            <li>Secure database storage with encryption at rest</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
            <li>PCI DSS compliant payment processing via Stripe</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>We retain your information for as long as necessary to:</p>
          <ul>
            <li>Provide our services to you</li>
            <li>Comply with legal obligations (tax records, financial records)</li>
            <li>Resolve disputes and enforce our agreements</li>
          </ul>
          <p>Typically, we retain order information for 7 years to comply with Australian tax law.</p>

          <h2>7. Your Rights (Australian Privacy Principles)</h2>
          <p>Under the Australian Privacy Act 1988, you have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications (if any)</li>
            <li><strong>Complaint:</strong> Lodge a complaint about our handling of your information</li>
          </ul>

          <h2>8. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Improve website functionality</li>
            <li>Track advertising performance (Google Ads conversion tracking)</li>
          </ul>
          <p>You can disable cookies in your browser settings, but this may affect website functionality.</p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (e.g., ppsr.gov.au, payment processors). We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries outside Australia (e.g., USA for cloud hosting services). We ensure these transfers comply with Australian privacy laws.
          </p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> carverifyau@gmail.com</li>
            <li><strong>Website:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact Support Page</Link></li>
          </ul>

          <h2>14. Office of the Australian Information Commissioner (OAIC)</h2>
          <p>
            If you believe we have breached the Australian Privacy Principles, you can lodge a complaint with the OAIC:
          </p>
          <ul>
            <li><strong>Website:</strong> www.oaic.gov.au</li>
            <li><strong>Phone:</strong> 1300 363 992</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
            <p className="text-blue-900 font-semibold mb-2">Your Privacy Matters</p>
            <p className="text-blue-800 text-sm">
              We are committed to protecting your privacy and handling your personal information responsibly in accordance with the Australian Privacy Act 1988.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
