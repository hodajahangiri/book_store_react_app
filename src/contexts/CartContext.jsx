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
    const [orders, setOrders] = useState([]);
    const [isCartUpdated, setIsCartUpdated] = useState(false);

    useEffect(() => {
        console.log("USEEFFECT : CART_ITEMS", cartItems)
        const calculatedTotal = cartItems.reduce((sum, item) => {
            return sum + (item.book.price * item.quantity);
        }, 0);
        setTotal(calculatedTotal);
    }, [cartItems]);


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
                        return responseData.cart_info.id //return the id of the cart
                    } else {
                        console.log("getUserCart : responseData.message", responseData.message)
                        // alert("getUserCart : responseData.message", responseData.message)
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


    // Get User orders
    const getUserOrders = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}users/orders`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.user_orders)
                setOrders(responseData.user_orders)
                return responseData.user_orders;
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Create Order 
    const createOrder = async (params, orderData) => {
        const { cartId, addressId, paymentId } = params
        console.log("CreateOrder : CART_ID",cartId)
        console.log("CreateOrder : ADDRESS_ID",addressId)
        console.log("CreateOrder : PAYMENT_ID",paymentId)
        console.log("CreateOrder : ORDER_DATA",orderData)

        try {
            const response = await fetch(`${API_BASE_URL}orders/${cartId}/address/${addressId}/payment/${paymentId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(orderData)
            })
            const responseData = await response.json();
            if (response.ok) {
                console.log("CREATE ORDER : RESPONSE OK : ",response)
                alert(responseData);
                setCartItems([]);
                // setIsCartUpdated(prev => !prev);
                // getUserOrders();
                return response.status;
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

     // Delete Order
    const deleteOrder = async (order_id) => {
        console.log("DELETE ORDER : ORDER_ID : ",order_id)
        try {
            const response = await fetch(`${API_BASE_URL}orders/${order_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.message);
                getUserOrders();
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

   
    const value = {
        cartItems,
        getUserCart,
        addToCart,
        removeFromCart,
        orders,
        getUserOrders,
        createOrder,
        deleteOrder,
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};