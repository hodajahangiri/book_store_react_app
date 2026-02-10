import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {

     const navigate = useNavigate();

    const [credentialData, setCredentialData] = useState({
        email: "",
        password: ""
    });

    const [emailError, setEmailError] = useState("");

    const { login } = useAuth();

    const validateEmailField = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (emailRegex.test(value)) ? "" : "Enter correct email"; 
    }

    const handleChange = event => {
        const { id, value } = event.target;
        setCredentialData(prevData => ({ ...prevData, [id]: value }));
        if (id === 'email'){
            // real time validation of email
            const error = validateEmailField(value);
            setEmailError(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check for not sending empty object
        if(credentialData.email === "" || credentialData.password === ""){
            alert("Please Fill Out All fields...")
        }else{
            const response = await login(credentialData);
            console.log(response)
            if(response === 200){
                navigate('/');
            }
        };
    };

    return (
        <div className="my-20! flex flex-col wrap-normal items-center gap-7">
            <form className="flex flex-col w-full sm:w-1/2 border-2 border-amber-500 bg-white shadow-2xl shadow-amber-200 rounded-2xl p-8! mx-30!"
            onSubmit={handleSubmit}>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="email">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                        id="email"
                        type="text"
                        placeholder="Email" 
                        required
                        onChange={handleChange}
                        value={credentialData.email}/>
                        {emailError && <p className="text-red-800"> {emailError}</p>}
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="email">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password" 
                        required
                        onChange={handleChange}
                        value={credentialData.password}/>
                </div>
                <div className="w-9/10 p-5!">
                    <SubmitButton textButton="Login"/>
                </div>
                <div className="w-9/10 p-5!">
                    <p>Don't have an account? <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" to='/register'>Sign up here!</Link></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm