import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL} from '../config.jsx';
import { toast } from 'react-toastify';


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
            } else if (response.status === 403) {
                    const responseData = await response.json();
                    toast.info(`${responseData.message}, You have to log in again`);
                    logout();
                } else {
                console.warn("Something went wrong, try again...");
            }
            return response.status;
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    }

    // Add Address 
    const addAddress = async (addressData) => {
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
                const responseData = await response.json();
                toast.success(responseData.message)
                getUserProfile();
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

    // Update Address
    const updateAddress = async (addressId, addressData) => {
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
                const responseData = await response.json();
                toast.success(responseData.message)
                getUserProfile();
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

    // Delete Address
    const deleteAddress = async (addressId) => {
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
                toast.success(responseData.message);
                getUserProfile();
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

    // Add Payment 
    const addPayment = async (paymentData) => {
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
                const responseData = await response.json();
                toast.success(responseData.message)
                getUserProfile();
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

    // Update Payment
    const updatePayment = async (paymentId, paymentData) => {
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
                const responseData = await response.json();
                toast.success(responseData.message);
                getUserProfile();
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

    // Delete Payment
    const deletePayment = async (paymentId) => {
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
                toast.success(responseData.message);
                getUserProfile()
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
    
    // Get User favorites
    const getUserFavorites = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}users/favorites`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                return responseData.user_favorites;
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

    // toggle Favorites
    const toggleFavorites = async (bookId) => {
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
                toast.success(responseData.message);
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
                return responseData.user_reviews;
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

    // Get Book Reviews
    const getBookReviews = async (bookId) => {
        try {
            const response = await fetch(`${API_BASE_URL}reviews/book/${bookId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                setBookReviews(responseData.reviews);
                return responseData.reviews;
            } else {
                console.warn("Something went wrong, try again...");
            }
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    }

    // Add review
    const addReview = async (bookId, reviewData) => {
        try {
            const response = await fetch(`${API_BASE_URL}reviews/${bookId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(reviewData)
            })
            if (response.ok) {
                toast.success("Your review added, thanks.")
                getBookReviews(bookId);
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

    // Update reviews
    const updateReview = async (reviewId, reviewData , bookId) => {
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
                toast.success(responseData.message);
                getBookReviews(bookId);
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
                toast.success(responseData.message);
                getBookReviews(bookId);
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