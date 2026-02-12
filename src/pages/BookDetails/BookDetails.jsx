import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import BookDetailsCard from '../../components/BookDetailsCard/BookDetailsCard';
import LayoutPhoto from '../../components/LayoutPhoto/LayoutPhoto';

function BookDetails() {


    const location = useLocation();
    // Access the state object from location
    const { state } = location;
    // Destructure the individual data items
    const { book } = state || {};

    console.log("BookDetails", book);

    const [bookInfo, setBookInfo] = useState();

    const addBookToDB = async (book) => {
        console.log("addBookToDB FUNCTION")
        if(!book){
            return;
        }
        console.log("addBook : book : ", book)
        try {
            const response = await fetch(`${API_BASE_URL}book_descriptions`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            if (response.ok) {
                const responseData = await response.json();
                setBookInfo(responseData)
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }


    useEffect(() => { 
        // Add book to book Descriptions
        addBookToDB(book);

        // like book 

        // Add to Card


    }, []);

    return (
        <>
        <LayoutPhoto/>
        {
            bookInfo ? <BookDetailsCard book={bookInfo}/>
            :
            <h2>Something Went wrong</h2> 
        }
        </>
    )
}

export default BookDetails