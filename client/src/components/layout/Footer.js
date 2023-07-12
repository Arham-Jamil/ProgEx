import React from 'react';
import './Footer.css';
import ServerCalled from '../callServer/ServerCalled';
import HomePageNav from '../meals/HomePageNav';

const Footer = () => {
  return (
    <footer className="footer">
      
      <HomePageNav/>

    <ServerCalled/>

    </footer>
  
  );
};

export default Footer;
