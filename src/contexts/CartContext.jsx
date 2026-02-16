import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../config.jsx';
import { toast } from "react-toastify";

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

    useEffect(() => {
        const calculatedTotal = cartItems.reduce((sum, item) => {
            return sum + (item.book.price * item.quantity);
        }, 0);
        setTotal(calculatedTotal);
    }, [cartItems]);


    // Get User cart
    const getUserCart = async () => {
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
                    const responseData = await response.json();
                    if (responseData.cart_books) {
                        setCartItems(responseData.cart_books);
                        return responseData.cart_info.id //return the id of the cart
                    } else {
                        setCartItems([]);
                        return responseData.message;
                    }
                } else if (response.status === 403) {
                    const responseData = await response.json();
                    toast.info(`${responseData.message}, You have to log in again`);
                    logout();
                } else {
                    console.warn("Something went wrong, try again...");
                }
            } catch (error) {
                toast.error(`Error: ${error}`);
            }
        }
    }

    // Add book to cart
    const addToCart = async (book_id) => {
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
                toast.success(responseData.message);
                getUserCart();
            } else if (response.status === 403) {
                const responseData = await response.json();
                toast.info(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.warn("Something went wrong, try again...");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    // Remove book from cart
    const removeFromCart = async (book_id) => {
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
                toast.success(responseData.message);
                getUserCart();
            } else if (response.status === 403) {
                const responseData = await response.json();
                toast.info(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.warn("Something went wrong, try again...");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
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
                if(responseData.user_orders){
                    setOrders(responseData.user_orders)
                }else{
                    setOrders([]);
                }
                return responseData.user_orders;
            } else if (response.status === 403) {
                const responseData = await response.json();
                toast.info(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.warn("Something went wrong, try again...");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    }

    // Create Order 
    const createOrder = async (params, orderData) => {
        const { cartId, addressId, paymentId } = params
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
                setCartItems([]);
                getUserOrders();
                return response.status;
            } else if (response.status === 403) {
                const responseData = await response.json();
                toast.info(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.warn("Something went wrong, try again...");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

     // Delete Order
    const deleteOrder = async (order_id) => {
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
                toast.success(responseData.message);
                getUserOrders();
            } else if (response.status === 403) {
                const responseData = await response.json();
                toast.info(`${responseData.message}, You have to log in again`);
                logout();
            } else {
                console.warn("Something went wrong, try again...");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
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