import { createContext, useContext, useEffect, useState } from 'react';

//Step 1
//Create the context
const AuthContext = createContext();

const ApiUrl = "http://127.0.0.1:5000/";

//Step 2
//Create useAuth hook to consume this context
export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

//Step 3
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userAddresses, setUserAddresses] = useState([]);
    const [userPaymentMethods, setUserPaymentMethods] = useState([]);

    //Get user data from local storage 
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        setToken(savedToken);
        setUser(JSON.parse(savedUser)); //parsing JSON object from LS
    }, []);

    // Login function
    const login = async (credentialData) => {
        try {
            const response = await fetch(`${ApiUrl}users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentialData.email,
                    password: credentialData.password
                })
            });
            if (response.ok) {
                const loginData = await response.json();
                setToken(loginData.token);
                setUser(loginData.user_data);
                localStorage.setItem("token", loginData.token);
                localStorage.setItem("user", JSON.stringify(loginData.user_data)); //transforming the user into json readable string
            } else {
                alert("Error: Invalid Email or Password")
            }
            return response.status;
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    //Logout function
    const logout = () => {
        setToken(null); //clearing saved tokens
        setUser(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // register user
    const register = async (registerData) => {
        try {
            const response = await fetch(`${ApiUrl}users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            const responseData = await response.json();
            if (response.ok) {
                setToken(responseData.token);
                setUser(responseData.user_data);
                localStorage.setItem("token", responseData.token);
                localStorage.setItem("user", JSON.stringify(responseData.user_data));
            } else if (response.status === 400) {
                console.error(responseData.error);
                alert('You already have an account with this email.');
            } else {
                console.error('Something went wrong.');
            }
            return response.status;
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    //deleteMechanic function
    const deleteUser = async () => {
        try {
            const response = await fetch(`${ApiUrl}users`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const responseData = await response.json();
            if (response.ok) {
                alert(responseData.message);
                logout();
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // UpdateProfile function
    const updateProfile = async (updateData) => {
        try {
            const response = await fetch(`${ApiUrl}users`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updateData)
            })
            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
                setUser(responseData.user_data);
                localStorage.setItem("user", JSON.stringify(responseData.user_data));
            } else {
                console.error("Something went wrong, try again...");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // Get User
    const getUserProfile = async () => {
        try {
            const response = await fetch(`${ApiUrl}users/profile`, {
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
                return responseData;
            } else {
                console.error("Something went wrong, try again...");
            }
            // return response.status;
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Get User cart
    const getUserCart = async () => {
        try {
            const response = await fetch(`${ApiUrl}users/carts`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.user_cart) {
                    return responseData.user_cart
                } else {
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
            const response = await fetch(`${ApiUrl}users/orders`, {
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
            const response = await fetch(`${ApiUrl}users/favorites`, {
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
        token,
        user,
        userAddresses,
        setUserAddresses,
        userPaymentMethods,
        setUserPaymentMethods,
        login,
        logout,
        register,
        deleteUser,
        updateProfile,
        getUserProfile,
        getUserCart,
        getUserOrders,
        getUserFavorites,
        isAuthenticated: token ? true : false
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}