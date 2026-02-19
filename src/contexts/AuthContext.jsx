import { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '../config.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//Step 1
//Create the context
const AuthContext = createContext();

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

    const navigate = useNavigate();

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
            const response = await fetch(`${API_BASE_URL}users/login`, {
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
                toast.warning("Error: Invalid Email or Password");
            }
            return response.status;
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    //Logout function
    const logout = () => {
        setToken(null); //clearing saved tokens
        setUser(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    // register user
    const register = async (registerData) => {
        try {
            const response = await fetch(`${API_BASE_URL}users`, {
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
                toast.info(responseData.error);
            } else {
                console.warn("Something went wrong, try again...");
            }
            return response.status;
        } catch (error) {
            toast.error(`Error: ${error}`);
        }
    };

    //deleteUser function
    const deleteUser = async () => {
        toast.success("Your Account successfully deleted.");
            logout();
        // try {
        //     const response = await fetch(`${API_BASE_URL}users`, {
        //         method: "DELETE",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + token
        //         }
        //     })
        //     const responseData = await response.json();
        //     if (response.ok) {
        //         toast.success(responseData.message);
        //         logout();
        //     } else if (response.status === 403) {
        //         const responseData = await response.json();
        //         toast.info(`${responseData.message}, You have to log in again`);
        //         logout();
        //     } else {
        //         console.warn(responseData.message);
        //     }
        // } catch (error) {
        //     toast.error(`Error: ${error}`);
        // }
    };

    // UpdateProfile function
    const updateProfile = async (updateData) => {
        try {
            const response = await fetch(`${API_BASE_URL}users`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updateData)
            })
            if (response.ok) {
                const responseData = await response.json();
                toast.success(responseData.message);
                setUser(responseData.user_data);
                localStorage.setItem("user", JSON.stringify(responseData.user_data));
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
    };

    const value = {
        token,
        user,
        setUser,
        login,
        logout,
        register,
        deleteUser,
        updateProfile,
        isAuthenticated: token ? true : false
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}