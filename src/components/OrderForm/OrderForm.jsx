import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartCard from "../../components/CartCard/CartCard";
import SubmitButton from "../SubmitButton/SubmitButton";

function OrderForm({ cartId, userAddresses, userPaymentMethods }) {

    const { cartItems, total, createOrder } = useCart();

    const navigate = useNavigate();

    const [orderTotalCost, setOrderTotalCost] = useState(0);
    const [formData, setFormData] = useState({
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping_cost: parseFloat((Math.random() * 3 + 10).toFixed(2))//generate a random float between 10 to 15
    });
    const [params, setParams] = useState({
        cartId: 0,
        addressId: 0,
        paymentId: 0
    });

    useEffect(() => {
        setParams(prev => ({
            ...prev,
            cartId: cartId,
            addressId: userAddresses[0].id,
            paymentId: userPaymentMethods[0].id
        }));
    }, [cartId])

    useEffect(() => {
        const newOrderTotal = (total + total * 0.1);
        const newTaxPrice = (total * 0.1)
        setOrderTotalCost(newOrderTotal);
        setFormData(prev => ({
            ...prev,
            total: newOrderTotal,
            tax: newTaxPrice,
            subtotal: total
        }));
    }, [total]);


    const handleChange = (event) => {
        const { id, value } = event.target;
        setParams(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response_status = await createOrder(params, formData);
        if (response_status === 201) {
            navigate('/orders');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-col-1 md:grid-cols-2 border-2 w-full border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl mb-15!">
            <div className="flex flex-col items-start mt-6! my-5!">
                <p className="mx-3! font-bold text-black">Shipping Address</p>
                <hr className="h-px my-3! mx-3! text-gray-500 border w-3/4 col-span-2" />
                {userAddresses.length > 0 ?
                    userAddresses.map((address, idx) => (
                        <div key={address.id} className="flex items-center mb-9 mx-6!">
                            <input
                                id="addressId"
                                type="radio"
                                value={params.addressId}
                                name="address-radio"
                                className="w-4 h-4 border-default-medium rounded-full border-blue-500 checked:bg-blue-500 checked:border-blue-500"
                                defaultChecked={idx === 0}
                                onChange={handleChange}
                            />
                            <label htmlFor="addressId" className="ml-2! text-sm font-medium text-heading">
                                {address.number ? `Apt ${address?.number} ${address?.line1} ${address?.line2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.zipcode} `
                                    : `${address?.line1} ${address?.line2}, ${address?.city}, ${address?.state}, ${address?.country}, ${address?.zipcode} `
                                }
                            </label>
                        </div>
                    ))
                    :
                    <div className="shadow border rounded-md w-full p-2! text-black bg-white">
                        There is no Address to show
                    </div>
                }
                <hr className="h-px m-3! mt-30! bg-neutral-quaternary border w-9/10" />
                <p className="mx-3! font-bold text-black">Choose your payment card</p>
                <hr className="h-px my-3! mx-3! text-gray-500 border w-3/4 col-span-2" />
                {userPaymentMethods.length > 0 ?
                    userPaymentMethods.map((payment, idx) => (
                        <div key={payment.id} className="flex items-center mb-9 mx-6!">
                            <input
                                id={payment.id}
                                type="radio"
                                value={payment.id}
                                name="payment-radio"
                                className="w-4 h-4 border-default-medium rounded-full border-blue-500 checked:bg-blue-500 checked:border-blue-500"
                                defaultChecked={idx === 0}
                                onChange={(event) => setParams(prev => ({
                                    ...prev,
                                    paymentId: event.target.value,
                                }))} />
                            <label htmlFor={payment.id} className="ml-2! text-sm font-medium text-heading">
                                {`${payment?.card_number} - exp: ${payment?.expiry_month}/ ${payment?.expiry_year}`}
                            </label>
                        </div>
                    ))
                    :
                    <div className="shadow border rounded-md w-full p-2! text-black bg-white">
                        There is no Address to show
                    </div>
                }
            </div>

            <div className="flex flex-col items-start mt-6! my-5!">
                <p className="mx-3! font-bold text-black">Order Summary</p>
                <hr className="h-px my-3! mx-3! text-gray-500 border w-3/4 col-span-2" />
                {cartItems.length > 0 ?
                    cartItems.map((cartBook, idx) => (
                        <CartCard key={cartBook.book.id} cartBook={cartBook} idx={idx + 1} />
                    ))
                    :
                    <div>
                        Your Cart Is Empty!!
                    </div>
                }
                <hr className="h-px m-3! bg-neutral-quaternary border w-9/10" />
                <div className="grid grid-cols-2 gap-2 w-full mx-4!">
                    <p className='text-sm text-blue-800 font-bold'>Subtotal: </p>
                    <p className='text-sm text-black font-bold'>$ {formData.subtotal.toFixed(2)}</p>
                    <p className='text-sm text-blue-800 font-bold'>tax (10%):</p>
                    <p className='text-sm text-black font-bold'>$ {formData.tax.toFixed(2)}</p>
                    <p className='text-sm text-blue-800 font-bold'>shipping cost: </p>
                    <p className='text-sm text-black font-bold'>$ {formData.shipping_cost.toFixed(2)}</p>
                    <hr className="h-px m-3! text-gray-500 border w-3/4 col-span-2" />
                    <p className='text-sm text-blue-800 font-bold'>total: </p>
                    <p className='text-sm text-black font-bold'>$ {formData.total.toFixed(2)}</p>
                </div>
                <div className="w-3/4 self-center mt-10!">
                    <SubmitButton textButton={"Confirm Order"} />
                </div>
            </div>

        </form>
    )
}

export default OrderForm