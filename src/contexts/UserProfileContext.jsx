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
    const { token , setUser, logout} = useAuth();
    const [userAddresses, setUserAddresses] = useState([]);
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);
    const [bookReviews, setBookReviews] = useState([]);

    // Get User
    const getUserProfile = async () => {
        console.log("getUserProfile : token : ", token)

        try {
            const response = await fetch(`${API_BASE_URL}users/profile`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            console.log("getUserProfile : RESPONSE", response)
            if (response.ok) {
                console.log("getUserProfile : response.ok : ")
                const responseData = await response.json();
                setUser(responseData.user_data);
                setUserAddresses(responseData.user_addresses);
                setUserPaymentMethods(responseData.user_payments);
            } else if (response.status === 403) {
                    const responseData = await response.json();
                    alert(`${responseData.message}, You have to log in again`);
                    logout();
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
            }else if (response.status === 403) {
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

    // toggle Favorites
    const toggleFavorites = async (bookId) => {
        console.log("toggleFavorites : bookId : ", bookId)
        try {
            const response = await fetch(`${API_BASE_URL}favorites/${bookId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message)
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

    // Get User reviews
    const getUserReviews = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}users/reviews`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.user_reviews)
                return responseData.user_reviews;
            }else if (response.status === 403) {
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

    // Get Book Reviews
    const getBookReviews = async (bookId) => {
        console.log("Reviews : getBookReviews : bookId", bookId)
        console.log("Reviews : getBookReviews : token", token)
        try {
            const response = await fetch(`${API_BASE_URL}reviews/book/${bookId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Reviews : getBookReviews : response", response)
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.reviews);
                setBookReviews(responseData.reviews);
                return responseData.reviews;
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

    // Add review
    const addReview = async (bookId, reviewData) => {
        console.log("UserProfileContext : addReview : bookId : ",bookId)
        console.log("UserProfileContext : addReview : reviewData : ",reviewData)
        try {
            const response = await fetch(`${API_BASE_URL}reviews/${bookId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(reviewData)
            })
            console.log("UserProfileContext : addReview : response : ",response)
            if (response.ok) {
                const responseData = await response.json();
                console.log("UserProfileContext : addReview : responseData : ",responseData)
                getBookReviews(bookId);
                // return responseData;
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

    // Update reviews
    const updateReview = async (reviewId, reviewData , bookId) => {
        console.log("UserProfileContext : addReview : bookId : ",reviewId)
        console.log("UserProfileContext : addReview : reviewData : ",reviewData)
        try {
            const response = await fetch(`${API_BASE_URL}reviews/${reviewId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(reviewData)
            })
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
                getBookReviews(bookId);
                return response.status;
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Delete review
    const deleteReview = async (reviewId , bookId) => {
        try {
            const response = await fetch(`${API_BASE_URL}reviews/${reviewId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
                getBookReviews(bookId);
                return response.status;
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
        getUserFavorites,
        toggleFavorites,
        getUserReviews,
        getBookReviews,
        bookReviews,
        addReview,
        updateReview,
        deleteReview,
        isAuthenticated: token ? true : false
    }

    return (
        <UserProfileContext.Provider value={value}>
            {children}
        </UserProfileContext.Provider>
    )
}