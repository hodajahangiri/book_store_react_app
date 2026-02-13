import { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import CartCard from "../../components/CartCard/CartCard";
import { useNavigate } from "react-router-dom";

function Cart({ loading, setLoading }) {

  const { cartItems, getUserCart , total } = useCart();
  
  const navigate = useNavigate();

  console.log("CART : TOTAL : ", total);

  useEffect(() => {
    setLoading(true);
    const getCartBooks = async () => {
      const response = await getUserCart();
      setLoading(false)
    }
    getCartBooks()
  }, [])


  if (loading) return <div>Loading...</div>
  return (
    <div className="mt-15! mb-25! flex flex-col items-center">
      {
        cartItems.length > 0 &&
        <>
          <p className='text-black font-bold'>My Cart</p>
          <hr className="h-px mb-10! mt-4! text-gray-500 border w-9/10 col-span-2" />
        </>
      }
      {cartItems.length > 0 ?
        cartItems.map((cartBook, idx) => (
          <CartCard key={cartBook.book.id} cartBook={cartBook} idx={idx + 1} />
        ))
        :
        <div className="font-bold text-2xl flex flex-col items-center">
          <span>Your Cart Is Empty!!</span>
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Add Book to your cart</span>
        </div>
      }
      {cartItems.length > 0 &&
        <div className='flex flex-col items-center w-full px-5! mt-9!'>
          <div className='col-span-2 text-black font-bold mb-6!'>Total: ${total.toFixed(2)}</div>
          <button className="w-full self-center bg-green-600 hover:bg-green-800 text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
          onClick={() => navigate('/checkout')}>
            Checkout
          </button>
        </div>
      }
    </div>
  )
}

export default Cart