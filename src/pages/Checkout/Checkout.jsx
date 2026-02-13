import OrderForm from "../../components/OrderForm/OrderForm";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useProfile } from "../../contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";
import UserAddresses from "../../components/UserAddresses/UserAddresses";


function Checkout({ loading, setLoading }) {

  const { getUserCart } = useCart();
  const { getUserProfile, userAddresses, userPaymentMethods } = useProfile();

  const navigate = useNavigate();

  const [cartId, setCartId] = useState(null);
  const [IsProfile, setIsProfile] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserProfile();
    setIsProfile(true);
    const getCartId = async () => {
      const cartId = await getUserCart();
      console.log("CHECKOUT : USEEFFECT : CARTID : ", cartId)
      setCartId(cartId)
      setLoading(false)
    }
    getCartId()
  }, [IsProfile])


  if (loading) return <div>Loading...</div>
  return (
    <div className="flex flex-col items-center px-8! pt-10!">
      <p className="font-bold text-2xl mb-10!"> Checkout </p>
      {userAddresses?.length === 0 ? (
        <div>
          <span>
            There is no Address for you, Add Address to your profile first
          </span>
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/profile')}>Click Here</span>
        </div>
      ) : userPaymentMethods?.length === 0 ? (
        <div>
          <span>
            There is no Payment Method for you, Add a Payment Method to your profile first
          </span>
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/profile')}>Click Here</span>
        </div>
      ) : (
        <OrderForm cartId={cartId} userAddresses={userAddresses} userPaymentMethods={userPaymentMethods} />
      )}
    </div>
  )
}

export default Checkout