import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllCollection.css'; 
import Navbar from './Navbar'; 
import Footer from './Footer'; 

const getAvailabilityClass = (status) => {
    if (status === "Available") return "available";
    if (status === "Reserved") return "reserved";
    if (status === "Checked out") return "checked-out";
    return "";
};

const AllCollection = ({ isLoggedIn }) => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(16); 
    const [genres] = useState([
        "All", "Adventure", "Classic", "Dystopian", "Fantasy", 
        "Fiction", "Historical Fiction", "Horror", "Memoir", 
        "Mystery", "Non-Fiction", "Philosophical", 
        "Post-Apocalyptic", "Romance", "Science Fiction", 
        "Self-Help", "Thriller", "Young Adult"
    ]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const query = searchTerm ? `?search=${searchTerm}` : '';
                const res = await axios.get(`https://db-final-qg164enp2-moeezhypers-projects.vercel.app/books${query}`);
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, [searchTerm]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://db-final-qg164enp2-moeezhypers-projects.vercel.app/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleImageError = (e) => {
        e.target.src = '/coverpages/default.jpg';  
    };

    const filteredBooks = books.filter(book => 
        (filter === "All" || book.genre === filter) && 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDisplayCountChange = (e) => {
        setBooksPerPage(Number(e.target.value));  
        setCurrentPage(1);  
    };

    return (
        <div>
            <main className="books-container">
                <div className="header-container">
                    <h2 className="collect-title">Our Collection</h2>
                    <div className="filter-button-container">
                    <span className="filter-text">Filter by Genre: </span>
                        <select 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)} 
                            className="filter-dropdown"
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search by title..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="search-input"
                    />
                </div>
                
                <div className="display-count-container">
                    <label htmlFor="display-count" className="filter-text">Books per page: </label>
                    <select 
                        id="display-count" 
                        value={booksPerPage} 
                        onChange={handleDisplayCountChange}
                    >
                        <option value={16}>16</option>
                        <option value={32}>32</option>
                        <option value={filteredBooks.length}>All</option>
                    </select>
                </div>

                <div className="books-grid">
                    {booksToDisplay.map((book) => {
                        const imageUrl = `/coverpages/${book.title}.jpg`; 
                        return (
                            <div className="book-card" key={book.book_id}>
                                <h2 className="book-title" style={{ 
                                    fontFamily: 'Georgia, serif', 
                                    background: 'linear-gradient(to bottom, rgb(255, 215, 0),rgb(0, 0, 0))', 
                                    WebkitBackgroundClip: 'text', 
                                    WebkitTextFillColor: 'transparent', 
                                    fontSize: '1.5em' 
                                }}>{book.title}</h2>
                                <h4 className="book-author">By: {book.author}</h4>
                                <img 
                                    src={imageUrl} 
                                    alt={`Cover of ${book.title}`} 
                                    onError={handleImageError}
                                    style={{ width: '100%',  height: 'auto',  objectFit: 'cover' }} 
                                />
                                <p className="book-description">{book.description}</p>
                                <span className={`book-availability ${getAvailabilityClass(book.availability_status)}`}>
                                    {book.availability_status} 
                                </span>
                                {isLoggedIn && (
                                <button className="delete-button" onClick={() => handleDelete(book.book_id)}>
                                    Delete
                                </button> )}
                            </div>
                        );
                    })}
                </div>

                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => i + 1).map(page => (
                        <button 
                            key={page} 
                            onClick={() => handlePageChange(page)} 
                            className={page === currentPage ? "active-page" : ""}
                        >
                            {page}
                        </button>
                    ))}

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === Math.ceil(filteredBooks.length / booksPerPage)}
                    >
                        Next
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllCollection;
