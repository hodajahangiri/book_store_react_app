import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/UserProfileContext";
import SubmitButton from "../SubmitButton/SubmitButton";
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ReviewCard({ review, bookId ,setExistedUserReview}) {
    console.log("ReviewCard : REVIEW : ", review)
    console.log("ReviewCard : BOOKID : ", bookId)

    const { user } = useAuth();
    const { updateReview, deleteReview} = useProfile();

    const [isUserReview, setIsUserReview] = useState(false);
    const [isDisplayForm, setIsDisplayForm] = useState(false);

    const [formData, setFormData] = useState({
        rating: 5,
        comment: ""
    })

    // Get user Reviews
    useEffect(() => {
        if (review.user.id === user.id) {
            setIsUserReview(true);
        }
    }, [])

    console.log("ReviewCard : USER : ", review)
    const handleEditClick = (review) => {
        console.log("handleEditClick : REVIEW :", review);
        setIsDisplayForm(true);
    }

    const handleDeleteClick = async (reviewId) => {
        console.log("handleDeleteClick : REVIEW ID :", reviewId);
        // Delete user review
        const responseStatus = await deleteReview(review.id, bookId);
        console.log("ReviewCard : handleSubmit : RESPONSE DATA : ", responseStatus)
        setFormData({
            rating: 5,
            comment: ""
        })
        setExistedUserReview(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(`id : ${name} --- value : ${value}`)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update user review
        console.log("ReviewCard : handleSubmit : REVIEW ID : ", review.id)
        const responseStatus = updateReview(review.id, formData, bookId);
        console.log("ReviewCard : handleSubmit : RESPONSE DATA : ", responseStatus)
        setFormData({
            rating: 5,
            comment: ""
        })
        setIsDisplayForm(false);
    }

    return (
        <div>
            <div className="flex flex-col gap-2 px-5!">
                <div className="flex justify-between">
                    <span>{review?.user.first_name} {review?.user.last_name}</span>
                    <Rating name="half-rating-reade" value={review?.rating} precision={0.5} readOnly />
                </div>
                <hr className="h-px my-1! text-gray-500 border col-span-2" />
                <div className="flex justify-between">
                    <span>{review?.comment}</span>
                    {
                        isUserReview &&
                        <div className="flex flex-row gap-4 mr-4!">
                            <EditIcon value={""} className='text-blue-700 cursor-pointer' onClick={() => handleEditClick(review)} />
                            <DeleteIcon className='text-red-800 cursor-pointer' onClick={() => handleDeleteClick(review?.id)} />
                        </div>
                    }
                </div>
                <hr className="h-px mb-5! bg-neutral-quaternary border-2" />
                <div></div>
            </div>

            {
                isDisplayForm &&
                <form onSubmit={handleSubmit} >
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
                        <SubmitButton textButton={"Update Review"} />
                    </div>
                </form>
            }
        </div>
    )
}

export default ReviewCard