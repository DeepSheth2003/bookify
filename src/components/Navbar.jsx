import React from 'react'
import { Link } from 'react-router';
import './component.css';

export default function Navbar() {
  return (
    <div className='main-navbar'>
        <div className='child-navbar'>
          <p><i className="fa-solid fa-book-open" style={{color:'rgba(3, 143, 145, 1)'}}></i> Bookify</p>
          <div className='navbar-pages'>
            <Link to='/' className='link-btn'>Home</Link>
            <Link to='/book/list' className='link-btn'>List Book</Link>
            <Link to='/book/books' className='link-btn'>Books</Link>
            <div className="nav-icon"></div>
          </div>
        </div>
    </div>
  )
}
