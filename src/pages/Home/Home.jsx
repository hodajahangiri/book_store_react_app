import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/BookList/BookList';
import LayoutPhoto from '../../components/LayoutPhoto/LayoutPhoto';
import { useState } from 'react';
import { API_GOOGLE_KEY } from '../../config';

function Home({ loading, setLoading }) {

  const [books, setBooks] = useState([]);

  const fetchBooks = async (title) => {
    setLoading(true);
    let url = ''
    if (title) {
      url = `https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:keyes&maxResults=20&orderBy=relevance&key=${API_GOOGLE_KEY}`;
    } else {
      let randomIdx = Math.floor(Math.random() * 50);
      url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&startIndex=${randomIdx}&maxResults=20&key=${API_GOOGLE_KEY}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      const booksData = data.items?.map((book) => {
        const volume = book.volumeInfo || {};
        return {
          title: volume.title,
          subtitle: volume.subtitle || volume.title,
          author: volume.authors ? volume.authors[0] : "Unknown",
          publisher: volume.publisher || "Unknown",
          published_date: volume.publishedDate || "Unknown",
          description: volume.description || "",
          isbn: book.id,
          image_link: volume.imageLinks?.thumbnail?.replace("http://", "https://") || null,
          language: volume.language,
          averageRating: volume.averageRating || 0,
          ratingsCount: volume.ratingsCount || 5,
          page_count: volume.pageCount
        };
      }) || [];
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <LayoutPhoto />
      <div className="flex justify-center py-5! w-full border-b-black border-b-2">
        <SearchBar fetchBooks={fetchBooks} />
      </div>
      {books && <BookList books={books} loading={loading} />}
    </>
  )
}

export default Home