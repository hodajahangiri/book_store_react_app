import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";

function PaymentForm({ submitFunction, payment, isAddForm }) {

    console.log("PaymentForm : submitFunction: ", submitFunction)
    console.log("PaymentForm : payment: ", payment)
    console.log("PaymentForm : isAddForm: ", isAddForm)

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        card_number: '',
        cvv: 0,
        expiry_month: 0,
        expiry_year: 0,
        is_default: true
    })

    const [formError, setFormError] = useState({
        card_number: '',
        cvv: '',
        expiry_month: '',
        expiry_year: '',
    })

    useEffect(() => {
        if (payment) {
            setFormData(prev => ({ ...prev, ...payment }));
        }
    }, []);

    const validateNumberField = (id, value) => {
        const mastercardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13})$/
        switch (id) {
            case 'card_number':
                return mastercardRegex.test(value) ? "" : "Enter Valid card number";
            case 'cvv': {
                const cvvInput = parseInt(value, 10);
                return (!isNaN(cvvInput) && cvvInput <= 999) ? "" : "Enter Valid CVV number";
            }
            case 'expiry_month': {
                const monthInput = parseInt(value, 10);
                return (!isNaN(monthInput) && monthInput <= 12 && monthInput >= 1) ? "" : "Enter Valid month";
            }
            case 'expiry_year': {
                const yearInput = parseInt(value, 10);
                return (!isNaN(yearInput) && yearInput >= 2026) ? "" : "Expired Card will not accepted";
            }
            default:
                break;
        }
    }

    const handleChange = event => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        if (id === 'cvv' || id == 'expiry_month' || id === 'expiry_year') {
            let inputValue = parseInt(value, 10);
            if (!isNaN(inputValue)) {
                setFormData(prevData => ({ ...prevData, [id]: inputValue }));
            }
        }
        // real time validation of fields
        const error = validateNumberField(id, value);
        setFormError(prevData => ({ ...prevData, [id]: error }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isAddForm) {
            console.log("PaymentForm : handleSubmit", formData)
            const response = await submitFunction(formData);
            console.log(response)
        } else {
            const response = await submitFunction(payment.id, formData);
            console.log(response)
        }
        navigate('/profile');
    };


    return (
        <div className="my-20! flex flex-col wrap-normal items-center gap-7">
            <form className="flex flex-col w-full md:w-1/2 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-8! mx-30!"
                onSubmit={handleSubmit}>
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="card_number">
                        Card Number
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="card_number"
                        id="card_number"
                        type="text"
                        placeholder="####-####-####-####"
                        required
                        onChange={handleChange}
                        value={formData.card_number} />
                </div>
                {formError.card_number && <p className="text-red-800"> {formError.card_number}</p>}
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="cvv">
                        CVV
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="cvv"
                        id="cvv"
                        type="number"
                        placeholder="CVV"
                        onChange={handleChange}
                        value={formData.cvv} />
                </div>
                {formError.cvv && <p className="text-red-800"> {formError.cvv}</p>}
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="expiry_month">
                        Exp_Month:
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="expiry_month"
                        id="expiry_month"
                        type="number"
                        placeholder="1-12"
                        onChange={handleChange}
                        value={formData.expiry_month} />
                </div>
                {formError.expiry_month && <p className="text-red-800"> {formError.expiry_month}</p>}
                <div className="w-9/10 p-5!">
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="expiry_year">
                        Exp_Year:
                    </label>
                    <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                        name="expiry_year"
                        id="expiry_year"
                        type="number"
                        placeholder="1-12"
                        onChange={handleChange}
                        value={formData.expiry_year} />
                </div>
                {formError.expiry_year && <p className="text-red-800"> {formError.expiry_year}</p>}
                <div className="flex gap-3 w-9/10 p-5!">
                    <input className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                        name="is_default"
                        id="is_default"
                        type="checkbox"
                        placeholder="1-12"
                        onChange={handleChange}
                        value={formData.is_default} />
                    <label className="block text-gray-700 text-sm font-bold mb-2!" htmlFor="is_default">
                        Is this card your primary card?
                    </label>
                </div>
                <div className="w-9/10 p-5!">
                    <SubmitButton textButton={payment ? "Update" : "Register"} />
                </div>
            </form>
        </div>
    )
}

export default PaymentForm