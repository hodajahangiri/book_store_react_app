import BookCard from '../BookCard/BookCard';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';


function BookList({ books, loading, setStartIndex, IsSearch }) {

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    setStartIndex((value - 1) * 20);
  }

  if (loading) return <div>Loading...</div>
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 m-10!'>
        {books.length > 0 ?
          books.map((book) => (
            <BookCard key={book.isbn} book={book} />
          ))
          :
          <h1> There is no Book Result </h1>
        }
      </div>
      <div className='flex justify-center my-5!'>
        { IsSearch ? <></> :
          <Pagination count={10} shape="rounded"
            showFirstButton showLastButton
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#588157',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#3a5a40',
                },
              },
            }}
            onChange={handleChange}
            page={page}
          />
        }
      </div>
    </>
  )
}

export default BookList