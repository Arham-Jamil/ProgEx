import React from 'react';

const HomePageNav = () => {
    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        backgroundColor: 'red',
        padding: '0.5rem 1rem',
        marginRight: '1rem',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
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