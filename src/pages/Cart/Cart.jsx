import { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import CartCard from "../../components/CartCard/CartCard";

function Cart({ loading, setLoading }) {

  const { cartItems, getUserCart , total } = useCart();

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
    <div className="mt-25! mb-25!">
      {cartItems.length > 0 ?
        cartItems.map((cartBook, idx) => (
          <CartCard key={cartBook.book.id} cartBook={cartBook} idx={idx + 1} />
        ))
        :
        <div>
          Your Cart Is Empty!!
        </div>
      }
      {cartItems &&
        <div className='flex flex-col items-center w-full px-5! mt-9!'>
          <div className='col-span-2 text-black font-bold mb-6!'>Total: ${total}</div>
          <button className="w-full self-center bg-green-600 hover:bg-green-800 text-white font-extrabold py-2! px-4! rounded-xl cursor-pointer"
          onClickCheckout>
            Checkout
          </button>
        </div>
      }
    </div>
  )
}

export default Cart