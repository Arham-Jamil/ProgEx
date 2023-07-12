import React from 'react';

const HomePageNav = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'white',
        padding: '6px 10px',
        marginRight: '10rem',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '3px',
        transition: 'background-color 0.3s',

        width: '40px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
      };
 
    return (
        <nav>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
        <li>
          <a href="#Dishes" style={linkStyle}>
            Dishes
          </a>
        </li>
        <li>
          <a href="#Drinks" style={linkStyle}>
            Drinks
          </a>
        </li>
        <li>
          <a href="#Extras" style={linkStyle}>
            Extras
          </a>
        </li>
      </ul>
    </nav>
    );
};
export default HomePageNav;