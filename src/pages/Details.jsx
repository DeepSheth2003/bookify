import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebase'
import { useParams , useNavigate } from 'react-router';

export default function Details() {

  const param = useParams();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [details , setDetails] = useState({});

  useEffect(() => {
    firebase.getDataOfDocument(param).then((data) => { setDetails(data.data()) });
  }, [])

  const redirectGithub = () => {
    window.open('https://github.com/DeepSheth2003','_blank');
  }

  const redirectCall = () => {
    window.open(`tel:${6353304906}`);
  }

  const redirectWhatsapp = () => {
    window.open('https://wa.me/+916353304906','_blank');
  }

  const redirectInstagram = () => {
    window.open('https://www.instagram.com/deep_.088','_blank')
  }

  return (
    <div className='detail-container'>
      <div className="upper-detail">
        <div className="book-detail">
          <div className="book-detail-head">
            <p>{details.name}</p>
          </div>
          <div className="body-detail-body">
            <p><span>Author</span> {details.displayName ? details.displayName : details.userEmail}</p>
            <p><span>ISBN Number</span> {details.isbn}</p>
            <p style={{width:'60%', fontSize:'0.8rem'}} className='detail-para'>We believe every book holds a new world waiting to be explored. Discover, read, and immerse yourself in stories that inspire, entertain, and enlighten!</p>
            <div className="detail-prices">
              <p className='discount'><span>Discount</span> <small style={{textDecoration: 'line-through'}}><i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.7rem'}}></i> {parseInt(details.price) + details.price*9.5/100}</small> Save upto <small>Rs.{details.price*9.5/100}</small></p>
              <p  className='detail-price'><span>Amount</span> <i className="fa-solid fa-indian-rupee-sign"></i> {details.price}/-</p>
            </div>
            <div className="detail-btns">
              <button className='detail-purchase' onClick={e => navigate(`/book/purchase/${param.bookId}`)}>Purchase</button>
              <button className='detail-list' onClick={e => navigate('/book/books')}>List</button>
            </div>
          </div>
        </div>
        <div className="detail-side-logo"><p title='www.bookify.com'>Bookify</p></div>
      </div>
      <div className="site-detail">
        <div className="inner-site-detail">
          <div className="site-detail-head">
            <p>About us</p>
          </div>
          <div className="site-detail-info">
            <p>Welcome to Bookify, your ultimate destination for discovering, reading, and sharing books. At Bookify, we are passionate about literature and technology, bringing them together to create an enriching experience for book lovers worldwide.</p>
            <p>Join us and embark on a journey filled with stories, knowledge, and endless possibilities. Happy Reading!</p>
          </div>
          <div className="site-detail-icons">
            <i className="fa-brands fa-github" onClick={redirectGithub} title='Visit gitHub'></i>
            <i className="fa-solid fa-square-phone" onClick={redirectCall} title='Call us on 6353304906'></i>
            <i className="fa-brands fa-whatsapp" onClick={redirectWhatsapp} title='Chat with us'></i>
            <i className="fa-brands fa-instagram" onClick={redirectInstagram} title='Visit Instagram'></i>
          </div>
        </div>
      </div>
    </div>
  )
}
