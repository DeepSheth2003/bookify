import React, { useState } from 'react';
import Comment from '../components/Comment';
import { Link, useNavigate } from 'react-router';
import { useFirebase } from '../context/firebase';
import sendIcon from '../assets/message.png'

export default function Home() {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const user = firebase.user;

  const [ check , setCheck ] = useState(false);

  const date = new Date();

  const toggleHandle = () => {
    setCheck(!check)
  }
  
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

  const handleSignOut = () => {
    firebase.signOutUser();
    navigate('/');
  }
  
  const handleGoogle = () => {
    firebase.signInWithGoogle();
    navigate('/');
  }

  const handleComment = (e) => {
    e.preventDefault();
  }

  return (
    <div className="home">

      {/***** Sidebar *****/}
        <div className="header-nav">
          <div className="icon-menu">
            <i className="fa-solid fa-bars" onClick={toggleHandle}></i>
          </div>
          <div className="nav-items-home">
            <p><i className="fa-solid fa-book-open" style={{color:'rgba(3, 143, 145, 1)'}}></i> Bookify</p>
          </div>
        </div>

        <div id={check ? 'sidebarOn' : 'sidebar'} className='sidebar'>
          
          <div className="sidebar-bottom">
            <div className="sidebar-bottom-inner">
              <p>Bookify</p>
              <i className="fa-brands fa-github" onClick={redirectGithub} title='Visit gitHub'></i>
              <i className="fa-solid fa-square-phone" onClick={redirectCall} title='Call us on 6353304906'></i>
              <i className="fa-brands fa-whatsapp" onClick={redirectWhatsapp} title='Chat with us'></i>
              <i className="fa-brands fa-instagram" onClick={redirectInstagram} title='Visit Instagram'></i>
            </div>
          </div>

          <div className="sidebar-ul">
            <ul className="menu">
              <li><Link className='sidebar-link-btn' onClick={toggleHandle} ><i className="fa-solid fa-house"></i> Home</Link></li>
              <li><Link to='/book/books' className='sidebar-link-btn'><i className="fa-solid fa-book-open"></i> Books</Link></li>
              <li><Link to='/book/list' className='sidebar-link-btn'><i className="fa-solid fa-plus"></i> List Book</Link></li>
              <li><Link to='/about' className='sidebar-link-btn'><i className="fa-solid fa-circle-info"></i> About</Link></li>
              <li><Link to='/contact' className='sidebar-link-btn'><i className="fa-solid fa-crown"></i> Contact</Link></li>
            </ul>
          </div>

          <div className="sidebar-profile">
            { firebase.isLoggedIn ? <div className="profile">
              <div className="profile-pic"></div>
              <div className="profile-info">
                <p>{user.displayName ? user.displayName : user.email}</p>
                <small>{user.displayName ? user.email : 'Welcome to bookiy.in'}</small>
              </div>
            </div> : <div className='sign-login'>
              <div className='sign-para'><p>Sign up or Login on Bookify.in</p></div>
              <ul className='sign-ul'>
                <li><Link to='/register' className='sign-link-btn'>Sign up</Link></li>
                <li><Link to='/login' className='sign-link-btn'>Login</Link></li>
              </ul>
            </div> }
          </div>
          <div className="signout-google">
            {user ? <button onClick={handleSignOut}>Sign out &nbsp; <i className="fa-solid fa-right-to-bracket"></i></button> : <button onClick={handleGoogle}><i className="fa-solid fa-g"></i> &nbsp; Continue with Google</button>}
          </div>

        </div>

      {/***** Page *****/}

        <div className="home-container">
          {/***** Main Container */}

          <div className="hero-home-section">
              <div className="hero-info">
                <div className='hero-inner-info'>
                  <span>
                    <p>By the bestseller</p>
                  </span>
                  <p>Meet your next favorite book</p>
                  <span>
                    <p>www.bookify.com</p>
                    <p>www.bookify.in</p>
                  </span>
                </div>
              </div>
              <div className="hero-img">
                <div className="hero-book-img"></div>
              </div>
          </div>        

          <div className="hero-home-section" style={{backgroundColor:'white'}}>
              <div className="hero-img">
                <div className="hero-book-img2"></div>
              </div>
              <div className="hero-info" style={{justifyContent:'start'}}>
                <div className='hero-inner-info'>
                  <span>
                    <p>By the bestseller</p>
                  </span>
                  <p>Meet your favorite Anime verse</p>
                  <span>
                    <p>www.bookify.com</p>
                    <p>www.bookify.in</p>
                  </span>
                </div>
              </div>
          </div>

          {/***** Second Main Container */}
          
          <div className="hero-home-section">
            <div className="features">
              <div className="features-info">
                <p>Bookify's Top Features</p>
                <p style={{fontSize:'0.8rem' , width:'65%' , textAlign:'center' , color:'gray'}}>Trusted and Fastest source for list books. provide products that embody excellence and gain your confidence.</p>
              </div>
              <div className="feature-cards">
                <div className='featureCardComp'>
                  <div className="featureQuality ficon"></div>
                  <p>Best Quality</p>
                  <p>Premium Book elegance and durability combined in this best quality accessory.</p>
                </div>
                <div className='featureCardComp'>
                  <div className="featureQuick ficon"></div>
                  <p>Quick & Friendly</p>
                  <p>Quick and Friendly service for your all type of needs. Expert assistance in minutes.</p>
                </div>
                <div className='featureCardComp'>
                  <div className="featureEasy ficon"></div>
                  <p>Easy to List</p>
                  <p>List your book into our site with great expirence and with very easy and fast methods.</p>
                </div>
                <div className='featureCardComp'>
                  <div className="featureTrusted ficon"></div>
                  <p>Trusted</p>
                  <p>1000 plus Book Authors and customer trusts our secure site for many years.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-home-section" style={{backgroundColor:'white'}} >
            <div className="pay-cards">
              <div className="payCards">
                <div className="payCard1"></div>
                <p>100% Money Back</p>
                <p>100% Money Back guarantees are typically offered by promise to refund the full purchase.</p>
              </div>
              <div className="payCards">
                <div className="payCard2"></div>
                <p>Free Shipping</p>
                <p>Eligibility Free shipping may have certain eligibility criteria such as on a minimum order.</p>
              </div>
              <div className="payCards">
                <div className="payCard3"></div>
                <p>Secure Payment</p>
                <p>The Payment Card industry data security standard is a set of security standards protect.</p>
              </div>
            </div>
          </div>
          
          <div className="hero-comment-section">
            <div className="comment-section">
              <p className='com-sec-p' style={{fontSize:'1.5rem'}}>What our Customers and book Authors Says !?</p>
                <div className="comment-form">
                  <form onSubmit={handleComment}>
                    <div className="comment-form-icon">
                      <div className="comment-form-icon-inner"></div>
                    </div>
                    <label htmlFor="">
                      <input type="text" placeholder='Leave a great thought' />
                    </label>
                    <div className="comment-form-button">
                      <button><img src={sendIcon} alt="" /></button>
                    </div>
                  </form>
                  <div className="comments-div">
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                  </div>
                </div>
            </div>
          </div>

          <div className="footer">
            <p>Bookify developed & designed by @Deep Sheth, <span style={{color:'black'}}>Since</span> Sat Apr 05 2025 <span style={{color:'black'}}>to</span> {date.toDateString()} <span style={{color:'black'}}>||</span> {date.toLocaleTimeString()} </p>
          </div>

        </div>

    </div>
  )
}
