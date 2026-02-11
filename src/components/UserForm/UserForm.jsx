import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";

function UserForm({ submitFunction, isRegisterForm }) {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: ''
    })

    const [fieldsError, setFieldsError] = useState({
        email: '',
        phone: ''
    });

    useEffect(() => {
        console.log("isRegisterForm",isRegisterForm)
        console.log("user", user)
        if (!isRegisterForm && user) {
            setFormData(prev => ({ ...prev, ...user }));
            setFormData(prev => ({ ...prev, ["password"]: "" }));
        }
    }, []);

    const validateFormFields = (id, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
        const phoneRegex = /^(\+?1\s?)?\(?[2-9]\d{2}\)?[.\-\s]?[2-9]\d{2}[.\-\s]?\d{4}$/
        switch (id) {
            case "email":
                return (emailRegex.test(value)) ? "" : "Enter correct email";
            case "phone":
                return (phoneRegex.test(value)) ? "" : "Enter correct phone";
            default:
                break;
        }
    }

    const handleChange = event => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        if (id === 'email' || id === 'phone'){
            // real time validation of fields
            const error = validateFormFields(id, value);
            setFieldsError(prev => ({ ...prev, [id]: error }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await submitFunction(formData);
        console.log("UserForm : handleSubmit : response", response)
        if(response === 201 || response === 200){
            navigate('/profile');
        }
    }

    return (
        <div className="my-20! flex flex-col wrap-normal items-center gap-7">
            <form className="flex flex-col w-full md:w-1/2 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8! mx-30!"
                onSubmit={handleSubmit}>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="first_name">
                        First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="first_name"
                        id="first_name"
                        type="text"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                        value={formData.first_name} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="last_name">
                        Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="last_name"
                        id="last_name"
                        type="text"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                        value={formData.last_name} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                        id="email"
                        type="text"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={formData.email} />
                    {fieldsError.email && <p className="text-red-800"> {fieldsError.email}</p>}
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700  bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        value={formData.password} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="phone">
                        Phone
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="phone"
                        id="phone"
                        type="text"
                        placeholder="+1(###) ###-####"
                        required
                        onChange={handleChange}
                        value={formData.phone} />
                    {fieldsError.phone && <p className="text-red-800"> {fieldsError.phone}</p>}
                </div>
                <div className="w-9/10 p-5!">
                    <SubmitButton textButton={isRegisterForm ? "Register" : "Update"} />
                </div>
            </form>
        </div>
    )
}

export default UserForm