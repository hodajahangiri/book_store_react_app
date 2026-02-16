import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";

function AddressForm({ submitFunction, address, isAddForm }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        city: '',
        country: '',
        line1: '',
        line2: '',
        number: 0,
        state: '',
        zipcode: ''
    })

    const [numberError, setNumberError] = useState("");

    useEffect(() => {
        if (address) {
            setFormData(prev => ({ ...prev, ...address }));
        }
    }, []);

    const validateNumberField = (value) => {
        const number = parseInt(value, 10);
        return (!isNaN(number) || value === '') ? "" : "Enter correct number";
    }

    const handleChange = event => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        if (id === 'number') {
            let inputValue = parseInt(value, 10);
            if (!isNaN(inputValue)) {
                setFormData(prevData => ({ ...prevData, [id]: inputValue }));
            } else {
                setFormData(prevData => ({ ...prevData, [id]: null }));
            }
            // real time validation of fields
            const error = validateNumberField(value);
            setNumberError(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isAddForm) {
            submitFunction(formData);
        } else {
            submitFunction(address.id, formData);
        }
        navigate('/profile');
    };

    return (
        <div className="my-20! flex flex-col wrap-normal items-center gap-7">
            <form className="flex flex-col w-full md:w-1/2 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8! mx-30!"
                onSubmit={handleSubmit}>
                <p className='text-black font-bold'>{isAddForm ? "Add Address" : "Update Address"}</p>
                <hr className="h-px my-3! text-gray-500 border w-9/10 col-span-2" />
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="line1">
                        Line 1
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="line1"
                        id="line1"
                        type="text"
                        placeholder="Line 1"
                        required
                        onChange={handleChange}
                        value={formData.line1} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="line2">
                        Line 2
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="line2"
                        id="line2"
                        type="text"
                        placeholder="Line 2"
                        onChange={handleChange}
                        value={formData.line2} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="number">
                        Apt Number
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="number"
                        id="number"
                        type="number"
                        placeholder="Number"
                        onChange={handleChange}
                        value={formData.number} />
                </div>
                {numberError && <p className="text-red-800"> {numberError}</p>}
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="city">
                        City
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="city"
                        id="city"
                        type="text"
                        placeholder="City"
                        required
                        onChange={handleChange}
                        value={formData.city} />

                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="state">
                        State
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700  bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="state"
                        id="state"
                        type="text"
                        placeholder="State"
                        required
                        onChange={handleChange}
                        value={formData.state} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="country">
                        Country
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="country"
                        id="country"
                        type="text"
                        placeholder="Country"
                        required
                        onChange={handleChange}
                        value={formData.country} />
                </div>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="zipcode">
                        Zipcode
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="zipcode"
                        id="zipcode"
                        type="text"
                        placeholder="Zipcode"
                        required
                        onChange={handleChange}
                        value={formData.zipcode} />
                </div>
                <div className="w-9/10 p-5!">
                    <SubmitButton textButton={address ? "Update" : "Add"} />
                </div>
            </form>
        </div>
    )
}

export default AddressForm