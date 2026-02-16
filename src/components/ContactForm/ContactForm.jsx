import { useNavigate } from "react-router-dom";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useState } from "react";

function ContactForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        message: ""
    });

    const handleChange = event => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check for not sending empty object
        alert("We will be in touch soon 😊 ");
        navigate('/')
    };


    return (
        <div className="flex flex-col wrap-normal w-full items-center gap-7">
            <form className="flex flex-col gap-6 w-full mx-1!" onSubmit={handleSubmit}>
                <input className="shadow appearance-none border rounded w-full p-2! text-gray-700 bg-white leading-tight"
                    name="full_name"
                    id="full_name"
                    type="text"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                    value={formData.full_name} />
                <input className="shadow appearance-none border rounded w-full p-2! text-gray-700 bg-white leading-tight"
                    id="email"
                    type="text"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={formData.full_name} />
                <input className="shadow appearance-none border rounded w-full p-2! text-gray-700 bg-white leading-tight"
                    name="message"
                    id="message"
                    type="text"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                    value={formData.full_name} />
                <SubmitButton textButton="Contact Us" />
            </form>
        </div>
    )
}

export default ContactForm