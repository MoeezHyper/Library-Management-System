import React from 'react';
import './About.css'; 
import Navbar from './Navbar'; 
import Footer from './Footer'; 

const About = () => {
    return (
        <div>
        <div className="bk">
        <h2 className="about-title">About Us</h2>
        <h2 className="sub-title">Our Project team</h2>
        <div className="profile-container">
        <div className="profile">
        <img 
            src={require(`./profilepics/1.jpg`)} alt="404" 
            className="profile-img" 
            />
        <div className="profile-text">
            <h2>Abdul Moeez Naeem Malik</h2>
            <p>Website designer and developer</p>
         </div>
        </div>
        <div className="profile">
        <img 
            src={require(`./profilepics/2.jpg`)} alt="404" 
            className="profile-img" 
            />
        <div className="profile-text">
            <h2>Shamsuddin Memon</h2>
            <p>Database developer</p>
         </div>
        </div>        <div className="profile">
        <img 
            src={require(`./profilepics/4.jpg`)} alt="404" 
            className="profile-img" 
            />
        <div className="profile-text">
            <h2>Muhammad Uzair</h2>
            <p>Database developer</p>
         </div>
        </div>        
        <div className="profile">
        <img 
            src={require(`./profilepics/3.jpg`)} alt="404" 
            className="profile-img" 
            />
        <div className="profile-text">
            <h2>Saud Memon</h2>
            <p>Project proposal and pictures</p>
         </div>
        </div>
        </div>
        </div>
    <Footer/>
    </div>
    )
}

export default About