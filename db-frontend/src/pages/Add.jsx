import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import './Add.css';

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        title: false,
        author: false,
        description: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: false }));  
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const newErrors = {
            title: !book.title,
            author: !book.author,
            description: !book.description,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            alert("All fields are mandatory!");
            return;
        }

        try {
            const response = await axios.post("https://db-final-qg164enp2-moeezhypers-projects.vercel.app/books", book);

            alert("Book added successfully!");
            await new Promise((resolve) => setTimeout(resolve, 500)); 
            navigate('/AllCollection');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="bk_add">
                <div className="form">
                    <h1>Add New Book</h1>

                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-text">Field is mandatory</span>}

                    <input
                        type="text"
                        placeholder="Author"
                        name="author"
                        onChange={handleChange}
                        className={errors.author ? 'error' : ''}
                    />
                    {errors.author && <span className="error-text">Field is mandatory</span>}

                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        className={errors.description ? 'error' : ''}
                    />
                    {errors.description && <span className="error-text">Field is mandatory</span>}

                    <button onClick={handleClick}>Add</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Add;
