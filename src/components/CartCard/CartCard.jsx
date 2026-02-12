import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useCart } from '../../contexts/CartContext';

function CartCard({ cartBook, idx }) {

    const { addToCart, removeFromCart } = useCart();

    return (
        <div className='flex flex-col items-center w-full px-5! my-2!'>
            <div className="flex flex-col justify-center w-full h-25 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl">
                <div className='grid grid-cols-9 gap-4 w-full place-items-center px-5!'>
                    <div className='col-span-1 text-black'>{idx}</div>
                    <div className='col-span-2'>
                        <img
                            className="w-20 h-20 rounded object-center border-2"
                            src={cartBook.book?.image_link ? `${cartBook.book.image_link}`
                                : "https://res.cloudinary.com/itimages/image/upload/f_auto,q_auto,w_800,c_limit/prd/splash_cover_art/pnpzt3hdlwrjssu7jeb8"}
                            alt={cartBook.book?.title}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className='col-span-2 text-black font-bold'>{cartBook.book?.title}</div>
                    <div className='col-span-2 text-black font-bold'>${cartBook.book?.price}</div>
                    <div className='col-span-2 text-black font-bold flex flex-col items-center'>
                        <div className='cursor-pointer' onClick={() => { addToCart(cartBook.book?.id) }}><KeyboardArrowUpRoundedIcon fontSize="large" className='text-green-700' /></div>
                        <div>{cartBook?.quantity}</div>
                        <div className='cursor-pointer' onClick={() => { removeFromCart(cartBook.book?.id) }}><KeyboardArrowDownRoundedIcon fontSize="large" className='text-red-700' /></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartCard