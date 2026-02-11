import UserAddresses from "../UserAddresses/UserAddresses"


function AddressCard({ addressList }) {

  return (
    <>
      <p className="font-bold">Addresses</p>
      <div className="flex flex-row gap-5 w-full md:w-3/4 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8!">
        {addressList.length > 0 ?
          addressList.map((address) => (
            <div key={address?.id} id={address?.id} className="shadow border rounded-md w-full p-2! text-black bg-white">
              {address.number ? `Apt ${address?.number} ${address?.line1} ${address?.line2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.zipcode} `
                : `${address?.line1} ${address?.line2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.zipcode} `
              }
            </div>
          ))
          :
          <div className="shadow border rounded-md w-full p-2! text-black bg-white">
            There is no Address to show
          </div>
        }
      </div>
    </>
  )
}

export default AddressCard