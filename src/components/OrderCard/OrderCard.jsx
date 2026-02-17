import { useCart } from "../../contexts/CartContext";
import DeleteIcon from '@mui/icons-material/Delete';

function OrderCard({ order }) {

    const { deleteOrder } = useCart();

    return (
        <div className='flex flex-col items-center w-full px-5! my-2!'>
            <div className="flex flex-col justify-center w-full h-25 border-3 border-[#ffb703]  bg-[#f8f6f0] shadow-2xl shadow-[#dad7cd] rounded-2xl">
                <div className='grid grid-cols-9 gap-4 w-full place-items-center px-5!'>
                    <div className='col-span-3 flex flex-row gap-1'>
                        {order.order_books &&
                            order.order_books.map((bookData) => (
                                <div key={bookData?.book?.id} className="flex flex-col gap-1 items-center">
                                    <img
                                        className="w-10 h-10 rounded object-center border-2"
                                        src={bookData?.book?.image_link}
                                        alt={bookData?.book?.title}
                                        referrerPolicy="no-referrer"
                                    />
                                    <span className="text-xs">☓{bookData?.quantity}</span>
                                </div>

                            ))
                        }
                    </div>
                    <div className='col-span-2 text-black font-bold text-xs xl:text-lg'>${order?.order_info.total.toFixed(2)}</div>
                    <div className='col-span-2 text-black font-bold text-xs xl:text-lg'>{order?.order_info.status}</div>
                    <div className='col-span-1 text-black font-bold flex flex-col items-center'>
                        <div className="flex flex-row gap-4 mr-4!">
                            <DeleteIcon className='text-red-800 cursor-pointer' onClick={() => deleteOrder(order?.order_info?.id)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCard