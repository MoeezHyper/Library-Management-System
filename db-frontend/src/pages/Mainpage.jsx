import React from 'react';
import { Link } from 'react-router-dom';
import './Mainpage.css'; 
import Footer from './Footer'; 
import Navbar from './Navbar';

const Mainpage = () => {
    return (
        <div>            
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Our Book Collection</h1>
                    <p>Your next great read is just a click away. <br />Explore our vast collection now!</p>
                    <Link to="/AllCollection" className="cta-button">Browse Books</Link>
                </div>

                <div className="testimonials">
                    <h2>What Our Readers Say</h2>
                    <p>"A fantastic selection of books! I always find something new and exciting."</p>
                    <p>- Sarah L.</p>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default Mainpage;
