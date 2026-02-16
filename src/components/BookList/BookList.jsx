import BookCard from '../BookCard/BookCard'

function BookList({ books, loading }) {

  if (loading) return <div>Loading...</div>
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 m-10!'>
      {books.length > 0 ?
        books.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))
        :
        <h1> There is no Book Result </h1>
      }
    </div>
  )
}

export default BookList