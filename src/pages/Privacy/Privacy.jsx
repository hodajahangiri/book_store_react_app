import LayoutPhoto from '../../components/LayoutPhoto/LayoutPhoto'

function Privacy() {

  const privacyContext = `
Effective Date: Feb. 13, 2026
Website: bookShop.com
Business Name: Book Shop

Welcome to Book Shop. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase books from us.
By using our website, you agree to the practices described in this policy.

Information We Collect
  We may collect the following types of information:
  . Personal Information: 
    - Full name
    - Email address 
    - Phone number 
    - Shipping and billing address 
    - Payment information (processed securely through third-party payment providers) 
  . Non-Personal Information:
    - Browser type 
    - Device information 
    - Pages visited
    - Cookies and usage data

How We Use Your Information
  We use your information to:
    . Process and fulfill orders
    . Send order confirmations and updates
    . Provide customer support
    . Improve our website and services
    . Send promotional emails (if you opt in)
    . Prevent fraud and ensure website security

Payment Security
 We do not store your full payment details. All transactions are processed through secure third-party payment gateways that use encryption and industry-standard security measures.

Cookies
  . Our website uses cookies to:
    - Enhance your browsing experience
    - Remember your preferences
    - Analyze website traffic
  You can disable cookies through your browser settings, though some features may not function properly.

Sharing Your Information
  . We do not sell or rent your personal information.
  . We may share information with:
  . Payment processors
  . Shipping and delivery partners
  . Website hosting providers
  . Legal authorities when required by law

Data Protection
 We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Your Rights
 . Depending on your location, you may have the right to:
  - Access your personal data
  - Correct inaccurate information
  - Request deletion of your data
  - Withdraw consent for marketing communications
  - To exercise these rights, contact us at: [Your Contact Email]

Third-Party Links
  Our website may contain links to third-party websites. We are not responsible for their privacy practices.

Changes to This Policy
  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.

Contact Us
  If you have questions about this Privacy Policy, please contact us:
    . Email:    book_shop@gmail.com
    . Phone:    +1(805) 123-1234
    . Address:  725 Coleman Ave,San Jose, CA`

  return (
    <>
      <LayoutPhoto />
      <div className='flex flex-col items-center w-full'>
        <div className="relative flex flex-col my-15! mx-5!  md:w-3/4 min-h-100 border-3 border-[#ffb703]  bg-[#f8f6f0] shadow-2xl shadow-[#dad7cd] rounded-2xl p-3!">
          <div className='px-3! py-3!'>
            <p className='text-black font-bold'>Privacy Policy</p>
            <hr className="h-px my-3! text-gray-500 border w-9/10 col-span-2" />
            <p className='whitespace-pre-wrap text-black text-xs md:text-sm text-justify'>
              {privacyContext}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Privacy