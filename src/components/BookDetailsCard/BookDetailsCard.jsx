import { useEffect, useState } from "react";
import { useProfile } from "../../contexts/UserProfileContext";
import { useCart } from "../../contexts/CartContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';

function BookDetailsCard({ book }) {

    const { getUserFavorites, toggleFavorites } = useProfile();
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        // Check user liked this or not 
        const isLiked = async (bookId) => {
            const response = await getUserFavorites();
            if (response) {
                const existedBook = await response.find(item => item.book_description.id === bookId);
                return existedBook ? setIsLiked(true) : setIsLiked(false)
            }
        }
        isLiked(book.id);
    }, [])

    const handleLikeClick = () => {
        toggleFavorites(book.id);
        setIsLiked(prev => !prev)
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className="relative flex flex-col my-15! mx-5!  md:w-3/4 min-h-100 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-3!">
                <div className="absolute end-3 top-2.5">{isLiked ?
                    <FavoriteIcon className="text-red-800 cursor-pointer" fontSize="large"
                        onClick={handleLikeClick} />
                    : <FavoriteBorderIcon className="cursor-pointer" fontSize="large"
                        onClick={handleLikeClick} />} </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 items-start'>
                    <div className='flex flex-col items-start gap-2'>
                        <img className='w-40 h-60 rounded-xl border-2 border-black'
                            src={book?.image_link} alt={book?.title}
                            referrerPolicy="no-referrer" />
                        <p className='text-m text-black font-bold'>{book?.title}</p>
                        <p className='text-sm text-black font-bold'>{book?.author}</p>

                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <p className='text-sm text-black font-bold'>{book?.subtitle}</p>
                        <div className='grid grid-cols-2 gap-2 items-start'>
                            <p className='text-sm text-blue-800 font-bold'>ISBN: </p>
                            <p className='text-sm text-black font-bold'>{book?.isbn}</p>
                            <p className='text-sm text-blue-800 font-bold'>Language: </p>
                            <p className='text-sm text-black font-bold'>{book?.language}</p>
                            <p className='text-sm text-blue-800 font-bold'>pages: </p>
                            <p className='text-sm text-black font-bold'>{book?.page_count === 0 ? "No Data About Pages" : book?.page_count}</p>
                        </div>
                        <hr className="h-px my-3! bg-neutral-quaternary border w-full"></hr>
                        <div className='grid grid-cols-2 gap-2 items-start'>
                            <p className='text-sm text-blue-800 font-bold'>Price:</p>
                            <p className='text-sm text-black font-bold'>${book?.price}</p>
                            <p className='text-sm text-blue-800 font-bold'>Rating:</p>
                            <Rating name="half-rating-reade" value={((book?.averageRating * 5) / book?.ratingsCount)} precision={0.5} readOnly />
                        </div>
                        <button className="mt-9! mr-3! p-2! w-2/3 self-end text-white bg-blue-800 bg-brand hover:bg-blue-900 rounded-xl cursor-pointer"
                            onClick={() => addToCart(book.id)}>Add to card</button>
                    </div>
                </div>
                <hr className="h-px mb-3! bg-neutral-quaternary border w-full"></hr>
                <p className='text-sm text-black ' >{book?.description ? book.description : "There is No description for this book"}</p>
            </div>
        </div>
    )
}

export default BookDetailsCard