import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import OrderCard from '../../components/OrderCard/OrderCard';


function Orders({ loading, setLoading }) {

  const { getUserOrders , orders } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const userOrders = await getUserOrders();
      if (userOrders) {
        setLoading(false);
        setIsOrders(true);
      }
    }
    getOrders();
  }, [])



  return (
    <div>
      {orders ?
      orders.map((order) => (
        <OrderCard key={order.order_info.id} order={order}/>
      ))
        :
        <div className="font-bold text-2xl flex flex-col items-center">
          <span>No Book Selected!!!!</span>
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Add Book to your favorites</span>
        </div>
      }
    </div>
  )
}

export default Orders