import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../config.jsx';

// Step 1
// Create the cart context
const CartContext = createContext();

// Step 2
// Create hook to consume/yse our context
export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};

// Step 3
export const CartProvider = ({ children }) => {

    const { token, logout } = useAuth();
    const [total, setTotal] = useState(0);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        console.log("USEEFFECT : CART_ITEMS", cartItems)
        const calculatedTotal = cartItems.reduce((sum, item) => {
            return sum + (item.book.price * item.quantity);
        }, 0);
        setTotal(calculatedTotal);
    }, [cartItems]);


    const addToCart = async (book_id) => {
        console.log("addToCart",book_id)
        try {
            const response = await fetch(`${API_BASE_URL}carts/add_book/${book_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.message);
                getUserCart();
            } else if (response.status === 403) {
                const responseData = await response.json();
                alert(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const removeFromCart = async (book_id) => {
        console.log("removeFromCart",book_id)
        try {
            const response = await fetch(`${API_BASE_URL}carts/remove_book/${book_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.message);
                getUserCart();
            } else if (response.status === 403) {
                const responseData = await response.json();
                alert(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Get User cart
    const getUserCart = async () => {
        console.log("getUserCart : token", token)
        if (token) {
            try {
                const response = await fetch(`${API_BASE_URL}carts`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.ok) {
                    console.log("getUserCart : response.ok", response)
                    const responseData = await response.json();
                    if (responseData.cart_books) {
                        console.log("getUserCart : responseData.user_cart", responseData.cart_books)
                        setCartItems(responseData.cart_books);
                        return responseData.id //return the id of the cart
                    } else {
                        // console.log("getUserCart : responseData.message", responseData.message)
                        alert("getUserCart : responseData.message", responseData.message)
                        return responseData.message;
                    }
                } else if (response.status === 403) {
                    const responseData = await response.json();
                    alert(`${responseData.message}, You have to log in again`);
                    logout();
                } else {
                    console.error("Something went wrong, try again...");
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        getUserCart,
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};