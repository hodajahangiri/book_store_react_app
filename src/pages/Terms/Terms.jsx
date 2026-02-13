import LayoutPhoto from '../../components/LayoutPhoto/LayoutPhoto'

function Terms() {

  const privacyContext = `
Effective Date: Feb. 13, 2026
Website:  bookShop.com
Business Name:  Book Shop

Welcome to Book Shop. These Terms and Conditions govern your use of our website and services. 
By accessing or purchasing from bookShop.com, you agree to comply with these terms. If you do not agree, please do not use our website.

Use of the Website
  By using our website, you confirm that:
    . You are at least 18 years old or using the site under parental supervision.
    . You provide accurate and complete information when creating an account or placing an order.
    . You will not use the website for any unlawful or fraudulent purpose.
    . We reserve the right to suspend or terminate accounts that violate these terms.

Products and Orders
  . All products listed on our website are subject to availability.
  . We reserve the right to limit quantities or discontinue products at any time.
  . We may refuse or cancel any order if fraud or unauthorized activity is suspected.
  . After placing an order, you will receive a confirmation email. This does not guarantee acceptance of your order; it only confirms that we received it.

Pricing and Payments
  . All prices are listed in U.S. dollars unless otherwise stated.
  . We reserve the right to change prices at any time without prior notice.
  . Payments must be made through approved payment methods on our website.
  . You agree to provide current and accurate billing information.

Shipping and Delivery
  . Shipping times are estimates and may vary depending on location.
  . We are not responsible for delays caused by carriers or unforeseen circumstances.
  . Risk of loss transfers to you once the order is delivered to the shipping address provided.

Returns and Refunds
  . Returns must be requested within 2 days of delivery.
  . Items must be unused and in original condition.
  . Refunds will be processed after inspection and approval.
  . Shipping costs may be non-refundable unless the return is due to our error.

Intellectual Property
  . All content on this website—including text, graphics, logos, images, and design—is the property of Book Shop and is protected by intellectual property laws.
  . You may not copy, reproduce, distribute, or exploit any content without written permission.

User Accounts
  If you create an account:
    . You are responsible for maintaining the confidentiality of your login credentials.
    . You are responsible for all activities under your account.
    . Notify us immediately of any unauthorized use of your account.

Limitation of Liability
  To the fullest extent permitted by law, Book Shop shall not be liable for:
    . Indirect, incidental, or consequential damages
    . Loss of profits or data
    . Damages resulting from misuse of the website
    . Our total liability shall not exceed the amount paid for the purchased product.

Third-Party Links
  Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of those sites.

Changes to Terms
  We reserve the right to update or modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page.

Governing Law
  These Terms and Conditions shall be governed by and interpreted in accordance with the laws of the State of California, United States.

Contact Us
If you have any questions about these Terms and Conditions, please contact us:
  . Email:    book_shop@gmail.com
  . Phone:    +1(805) 123-1234
  . Address:  725 Coleman Ave,San Jose, CA
  `

  return (
    <>
      <LayoutPhoto />
      <div className='flex flex-col items-center w-full'>
        <div className="relative flex flex-col my-15! mx-5!  md:w-3/4 min-h-100 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-3!">
          <div className='px-3! py-3!'>
            <p className='text-black font-bold'>Terms and Conditions</p>
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

export default Terms