import React from 'react'
import { useNavigate } from 'react-router';

export default function Card(props) {

  const navigate = useNavigate();

  return (
    <div className='card'>
        <div className="head-card">
            <span>
                <div className='card-name'>Bookify</div>
                <p className='span-p1'>{props.name}</p>
                <p className='span-p2'>This book is write & published by {props.displayName ? props.displayName : props.userEmail}</p>
            </span>
        </div>
        <div className="body-card">
            <p>ISBN Number - {props.isbn}</p>
            <p>At Bookify, we believe every book holds a new world waiting to be explored. Discover, read, and immerse yourself in stories that inspire, entertain, and enlighten!</p>
            <p>"Bookify – Open a New Adventure with every single Pages!"</p>
        </div>
        <div className="card-price">
            <p><i className="fa-solid fa-indian-rupee-sign"></i> {props.price}/-</p>
        </div>
        <div className="card-btn">
          <button onClick={e => navigate(`/book/books/view/${props.id}`)}>View</button>
        </div>
    </div>
  )
}
