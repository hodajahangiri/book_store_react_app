import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function BookDetails() {
    

    const location = useLocation();
  // Access the state object from location
  const { state } = location; 
  
  // Destructure the individual data items
  const { book} = state || {};

  console.log("BookDetails", book);


  useEffect(() => {
    // Add book to book Descriptions

    
  },[])

  return (
    <div>BookDetails</div>
  )
}

export default BookDetails