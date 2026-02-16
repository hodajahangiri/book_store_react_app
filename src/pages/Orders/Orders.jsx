import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import OrderCard from '../../components/OrderCard/OrderCard';


function Orders({ setLoading }) {

  const { isAuthenticated } = useAuth();
  const { getUserOrders, orders } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const userOrders = await getUserOrders();
      if (userOrders) {
        setLoading(false);
        // setIsOrders(true);
      }
    }
    getOrders();
  }, [isAuthenticated])



  return (
    <div className="mt-15! mb-25! items-center flex flex-col">
      {
        orders.length > 0 &&
        <>
          <p className='text-black font-bold'>My Orders</p>
          <hr className="h-px mb-10! mt-4! text-gray-500 border w-9/10 col-span-2" />
        </>
      }
      {orders.length > 0 ?
        orders.map((order) => (
          <OrderCard key={order.order_info.id} order={order} />
        ))
        :
        <div className="font-bold text-2xl flex flex-col items-center">
          <span>There is no order to show!!</span>
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Submit an Order</span>
        </div>
      }
    </div>
  )
}

export default Orders