import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL} from '../config.jsx';


//Step 1
//Create the context
const UserProfileContext = createContext();

//Step 2
//Create useAuth hook to consume this context
export const useProfile = () => {
    const context = useContext(UserProfileContext);
    return context;
};

//Step 3
export const UserProfileProvider = ({ children }) => {
    const { token , setUser , logout } = useAuth();
    const [userAddresses, setUserAddresses] = useState([]);
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);


    // Get User
    const getUserProfile = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}users/profile`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                setUser(responseData.user_data);
                setUserAddresses(responseData.user_addresses);
                setUserPaymentMethods(responseData.user_payments);
            } else {
                console.error("Something went wrong, try again...");
            }
            return response.status;
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Add Address 
    const addAddress = async (addressData) => {
        console.log("addAddress : addressData", addressData)
        try {
            const response = await fetch(`${API_BASE_URL}addresses`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(addressData)
            })
            if (response.ok) {
                console.log("addAddress : response.ok", response)
                const responseData = await response.json();
                console.log(responseData.message);
                console.log("addAddress : responseData.message", responseData.message)
                getUserProfile();
                // setUserAddresses(prev => [...prev, responseData.address_data])
                // setUser(responseData.user_data);
                // localStorage.setItem("user", JSON.stringify(responseData.user_data));
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Update Address
    const updateAddress = async (addressId, addressData) => {
        console.log("updateAddress : addressId", addressId)
        console.log("updateAddress : addressData", addressData)
        try {
            const response = await fetch(`${API_BASE_URL}addresses/${addressId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(addressData)
            })
            if (response.ok) {
                console.log("updateAddress : response.ok", response)
                const responseData = await response.json();
                alert(responseData.message);
                console.log("updateAddress : responseData.message", responseData.message)
                getUserProfile()
                // setUser(responseData.user_data);
                // localStorage.setItem("user", JSON.stringify(responseData.user_data));
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    } 

    // Delete Address
    const deleteAddress = async (addressId) => {
        console.log("addressID", addressId)
        try {
            const response = await fetch(`${API_BASE_URL}addresses/${addressId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
                getUserProfile()
                // setUser(responseData.user_data);
                // localStorage.setItem("user", JSON.stringify(responseData.user_data));
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    } 

    // Add Payment 
    const addPayment = async (paymentData) => {
        console.log("addPayments : paymentData", paymentData)
        try {
            const response = await fetch(`${API_BASE_URL}payments`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(paymentData)
            })
            if (response.ok) {
                console.log("addPayments : response.ok", response)
                const responseData = await response.json();
                console.log("addPayments : responseData.message", responseData.message)
                getUserProfile();
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Update Payment
    const updatePayment = async (paymentId, paymentData) => {
        console.log("updatePayment : paymentId", paymentId)
        console.log("updatePayment : paymentData", paymentData)
        try {
            const response = await fetch(`${API_BASE_URL}payments/${paymentId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(paymentData)
            })
            if (response.ok) {
                console.log("updatePayment : response.ok", response)
                const responseData = await response.json();
                alert(responseData.message);
                console.log("updatePayment : responseData.message", responseData.message)
                getUserProfile()
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    } 

    // Delete Payment
    const deletePayment = async (paymentId) => {
        console.log("paymentID", paymentId)
        try {
            const response = await fetch(`${API_BASE_URL}payments/${paymentId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
                getUserProfile()
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    } 


    // Get User cart
    const getUserCart = async () => {
        console.log("getUserCart : token", token)
        try {
            const response = await fetch(`${API_BASE_URL}users/carts`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                console.log("getUserCart : response.ok", response)
                const responseData = await response.json();
                if (responseData.user_cart) {
                    console.log("getUserCart : responseData.user_cart", responseData.user_cart)
                    return responseData.user_cart
                } else {
                    console.log("getUserCart : responseData.message", responseData.message)
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
                return responseData.user_orders;
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Get User favorites
    const getUserFavorites = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}users/favorites`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.user_favorites)
                return responseData.user_favorites;
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const value = {
        getUserProfile,
        userAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        userPaymentMethods,
        addPayment,
        updatePayment,
        deletePayment,

        getUserCart,
        getUserOrders,
        getUserFavorites,
        isAuthenticated: token ? true : false
    }

    return (
        <UserProfileContext.Provider value={value}>
            {children}
        </UserProfileContext.Provider>
    )
}