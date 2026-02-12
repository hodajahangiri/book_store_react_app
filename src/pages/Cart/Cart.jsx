import { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import CartCard from "../../components/CartCard/CartCard";


function Cart({ loading, setLoading }) {

  const { cartItems, getUserCart } = useCart();

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
      
    </div>
  )
}

export default Cart