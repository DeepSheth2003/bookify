import React from 'react'
import { useState } from 'react';
import { useFirebase } from '../context/firebase';

export default function ListingPage() {

  const [name , setName] = useState();
  const [isbn , setISBN] = useState();
  const [price , setPrice] = useState();

  const firebase = useFirebase();

  const listData = async (e) => {
    e.preventDefault();
    const result = await firebase.listDataToFirestore(name , isbn , price);
    setName('');
    setISBN('');
    setPrice('');
  }

  return (
    <div className='list-component'>
        <p>List your Book Today with, Bookify</p>
        <form onSubmit={listData}>
          <div>
            <input type='text' placeholder='Book Name' value={name} onChange={e => setName(e.target.value)} required />
            <label>Book Name</label>
          </div>
          <div>
            <input type='tel' placeholder='ISBN e.g: 001234567890' value={isbn} onChange={e => setISBN(e.target.value)} required pattern="\d{12,}" maxLength='13' title="ISBN Number must be atleast 12 digits!" />
            <label>ISBN Number</label>
          </div>
          <div>
            <input type='tel' placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} required />
            <label>Price</label>
          </div>
          <div>
            <button type='Submit'>Create</button>
          </div>
          { firebase.isLoggedIn ? <small className='small-id'><span className='small-icon'></span>{firebase.user.displayName ? firebase.user.displayName : firebase.user.email}</small> : <small style={{color:'orange'}}><i className="fa-solid fa-triangle-exclamation"></i> You need to Sign Up or Login for List your Book !</small> }<br/>
          { firebase.checkListing ? <small><i className="fa-solid fa-circle-check" style={{color:'rgba(0,184,1,1)'}}></i> Your Book has been listed succesfully.</small> : '' }
        </form>
    </div>
  )
}
