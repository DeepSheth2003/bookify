import React, { useState } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router';

export default function Contact() {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const [textarea, setTextarea] = useState();

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    firebase.sendMessage(firebase.user.email , textarea).then((res)=>{
      setTextarea('');
      alert('Your message has been sended sucessfully!');
      navigate('/');
    });
  }

  return (
    <div className='contact'>
      <div className="child-contact">
        <div className="contact-info">
          <p style={{fontSize:'2.5rem'}}>Get in Touch</p>
          <div className="call-info">
            <p><i className="fa-solid fa-phone"></i> Call us On</p>
            <span>+91 6353-304-906</span>
          </div>
          <div className="location-info">
            <p><i className="fa-solid fa-location-dot"></i> Location</p>
            <span>Gondal, Gujarat, India</span>
          </div>
          <div className="hour-info">
            <p><i className="fa-solid fa-clock"></i> Business Hours</p>
            <span>24*7</span>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleMessageSubmit}>
            <label><details>{firebase.user ? firebase.user.email : ''}<summary>Message</summary></details></label>
            <textarea placeholder='type here...' value={textarea} onChange={e => setTextarea(e.target.value)} required></textarea>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
