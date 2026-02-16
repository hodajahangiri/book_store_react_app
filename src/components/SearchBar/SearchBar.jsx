import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

function SearchBar({ fetchBooks }) {

    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        fetchBooks(null);
    }, [])

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchInput(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchBooks(searchInput);
    }

    return (
        <form className="flex flex-col w-full md:w-3/4 md:px-30! px-10!"
            onSubmit={handleSubmit}>
            <label className="block text-gray-700 text-sm font-bold mb-2! sr-only" htmlFor="search">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3! pointer-events-none">
                    <SearchIcon className="w-4 h-4 text-body text-black" />
                </div>
                <input className="block shadow appearance-none border-2 rounded-xl w-full p-3! ps-9! text-gray-700 border-amber-500  bg-[#f6f3e4] shadow-2xl shadow-amber-200 leading-tight focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                    name="email"
                    id="email"
                    type="text"
                    placeholder="Search Title"
                    onChange={handleChange}
                    value={searchInput} />
                <button type="submit" className="absolute end-2 bottom-1.5 p-1.5! text-white bg-blue-800 bg-brand hover:bg-blue-900 rounded-xl cursor-pointer">Search</button>
            </div>
        </form>
    )
}

export default SearchBar