import { useEffect, useState } from "react";
import BookList from '../../components/BookList/BookList';
import { useProfile } from "../../contexts/UserProfileContext";
import { useNavigate } from "react-router-dom";

function Favorites({ loading, setLoading }) {

  const { getUserFavorites } = useProfile();
  const navigate = useNavigate()

  const [favoritesBooks, setFavoritesBooks] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      const userFavorites = await getUserFavorites();
      if (userFavorites) {
        const booksData = userFavorites?.map((book) => {
          const description = book.book_description || {};
          return {
            title: description.title,
            subtitle: description.subtitle,
            author: description.author,
            publisher: description.publisher,
            published_date: description.published_date,
            description: description.description,
            isbn: description.isbn,
            image_link: description.image_link,
            language: description.language,
            averageRating: description.averageRating,
            ratingsCount: description.ratingsCount,
            page_count: description.page_count
          };
        }) || [];
        setFavoritesBooks(booksData)
      }
      setLoading(false);
    }
    getFavorites()
  }, [])

  return (
    <>
      {favoritesBooks ? <BookList books={favoritesBooks} loading={loading} />
        :
        <div className="font-bold text-2xl flex flex-col items-center">
          <span>No Book Selected!!!!</span>
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Add Book to your favorites</span>
        </div>
      }
    </>
  )
}

export default Favorites