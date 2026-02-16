import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ReviewCard from "../ReviewCard/ReviewCard";
import Rating from '@mui/material/Rating';
import SubmitButton from "../SubmitButton/SubmitButton";
import { useProfile } from "../../contexts/UserProfileContext";

function Reviews({ bookId }) {

    const { user } = useAuth();
    const { addReview, getBookReviews, bookReviews } = useProfile();

    const [formData, setFormData] = useState({
        rating: 5,
        comment: ""
    });
    const [existedUserReview, setExistedUserReview] = useState(false);

    useEffect(() => {
        const getReviews = async () => {
            const reviews = await getBookReviews(bookId);
        }
        getReviews();
    }, []);

    useEffect(() => {
        const existedUser = bookReviews?.find(review => review.user.id === user.id);
        if (existedUser) {
            setExistedUserReview(true);
        }
    }, [bookReviews])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add user review
        addReview(bookId, formData);
        setFormData({
            rating: 5,
            comment: ""
        })
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className="relative flex flex-col mb-15! mx-5!  md:w-3/4 min-h-100 border-2 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 rounded-2xl p-3!">
                <div>
                    {
                        !existedUserReview &&
                        <form onSubmit={handleSubmit}>
                            <div className="w-9/10 p-5!">
                                <Rating
                                    name="rating"
                                    id="rating"
                                    onChange={handleChange}
                                    defaultValue={5}
                                    value={formData.rating}
                                />
                                <input className="shadow appearance-none border rounded w-full p-3! text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline mb-4!"
                                    name="comment"
                                    id="comment"
                                    type="text"
                                    placeholder="Comment"
                                    required
                                    onChange={handleChange}
                                    value={formData.comment} />
                                <SubmitButton textButton={"Add Review"} />
                            </div>
                        </form>
                    }

                    {
                        bookReviews?.length > 0 ?
                            bookReviews.map((review) => (
                                <ReviewCard key={review.id} review={review} bookId={bookId} setExistedUserReview={setExistedUserReview} />
                            ))
                            : <></>
                    }
                </div>
            </div>
        </div>

    )
}

export default Reviews