import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useProfile } from '../../contexts/UserProfileContext';
import { useNavigate } from 'react-router-dom';

function PaymentCard({ paymentsList }) {

  const { deletePayment } = useProfile();

  const navigate = useNavigate();

  const handleEditClick = (payment) => {
    console.log(payment);
    navigate('/user/payments', {
      state: {
        payment: payment,
        isAddForm: false
      }
    })
  }

  return (
    <>
      <p className="font-bold">Payment Methods</p>
      <div className="flex flex-col gap-5 w-full md:w-3/4 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8!">
        {paymentsList.length > 0 ?
          paymentsList.map((payment) => (
            <div key={payment?.id} id={payment?.id} className="flex flex-row justify-between shadow border rounded-md w-full p-2! text-black bg-white">
              <div className='flex flex-row justify-between w-2/3'>
                <div>{`${payment?.card_number}`}</div>
                <div>{`exp: ${payment?.expiry_month}/ ${payment?.expiry_year}`}</div>
              </div>
              <div className="flex flex-row gap-4 mr-4!">
                <EditIcon value={payment} className='text-blue-700 cursor-pointer' onClick={() => handleEditClick(payment)} />
                <DeleteIcon className='text-red-800 cursor-pointer' onClick={() => deletePayment(payment?.id)} />
              </div>
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