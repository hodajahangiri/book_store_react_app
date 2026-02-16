import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useProfile } from '../../contexts/UserProfileContext';
import { useNavigate } from 'react-router-dom';

function AddressCard({ addressList }) {

  const { deleteAddress } = useProfile();

  const navigate = useNavigate();

  const handleEditClick = (address) => {
    navigate('/user/addresses', {
      state: {
        address: address,
        isAddForm: false
      }
    })
  }

  return (
    <>
      <p className="font-bold">Addresses</p>
      <div className="flex flex-col gap-5 w-full md:w-3/4 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8!">
        {addressList.length > 0 ?
          addressList.map((address) => (
            <div key={address?.id} id={address?.id} className="flex flew-row justify-between shadow border rounded-md w-full p-2! text-black bg-white">
              <div>
                {address.number ? `Apt ${address?.number} ${address?.line1} ${address?.line2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.zipcode} `
                  : `${address?.line1} ${address?.line2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.zipcode} `
                }
              </div>
              <div className="flex flex-row gap-4 mr-4!">
                <EditIcon value={address} className='text-blue-700 cursor-pointer' onClick={() => handleEditClick(address)} />
                <DeleteIcon className='text-red-800 cursor-pointer' onClick={() => deleteAddress(address?.id)} />
              </div>
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