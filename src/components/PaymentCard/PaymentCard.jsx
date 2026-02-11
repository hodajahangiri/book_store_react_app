

function PaymentCard({paymentsList}) {
  
  return (
    <>
      <p className="font-bold">Payment Methods</p>
      <div className="mb-20! flex flex-row gap-5 w-full md:w-3/4 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8!">
        {paymentsList.length > 0 ?
          paymentsList.map((payment) => (
            <div key={payment?.id} id={payment?.id} className="flex flex-row justify-between shadow border rounded-md w-full p-2! text-black bg-white">
              <div>{`${payment?.card_number}`}</div>
              <div>{`exp: ${payment?.expiry_month}/ ${payment?.expiry_year}`}</div>
            </div>
          ))
          :
          <div className="shadow border rounded-md w-full p-2! text-black bg-white">
            There is no Payment Method to show
          </div>
        }
      </div>
    </>
  )
}

export default PaymentCard