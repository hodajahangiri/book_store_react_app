import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function BookCard({ book }) {

    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    const readMoreClick = () => {
        if (!isAuthenticated){
            alert("For seeing the book details to have to login first.")
        }else{
            navigate('/book/details', { state: {
                book: book
            } })
        }
    }

    return (
        <div className="relative">
            <div className="flex flex-col items-center w-full min-h-80 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl mx-5!">
                <img
                    className="w-40 h-60 rounded-b-xl"
                    src={book?.image_link ? `${book.image_link}`
                        : "https://res.cloudinary.com/itimages/image/upload/f_auto,q_auto,w_800,c_limit/prd/splash_cover_art/pnpzt3hdlwrjssu7jeb8"}
                    alt={book?.title}
                    referrerPolicy="no-referrer"
                />
                <p className="mt-3! mx-3! text-sm text-center font-semibold tracking-tight text-heading text-black">{book.title}</p>
                <div className="absolute flex flex-row gap-2 items-center end-2 bottom-1.5 cursor-pointer"
                onClick={readMoreClick}>
                    <span className='text-blue-800 font-bold'> Read more </span>
                    <svg className=" fill-blue-700 w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                </div>
            </div>
        </div>
    )
}

export default BookCard