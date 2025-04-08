import React from 'react';
import './pages.css';
import { useState , useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { Link , useNavigate } from 'react-router';

export default function RegisterPage() {

  const firebase = useFirebase();

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    const result = await firebase.signupUserWithEmailAndPassword(email , password);
  }

  const navigate = useNavigate();

  useEffect(()=>{
      if(firebase.isLoggedIn){
        // navigate to home
        navigate('/');
      }
    },[firebase , navigate]);

    // Google Authentication
    const googleAuthentication = () => {
      firebase.signInWithGoogle();
    }

  return (
    <>
    <div className='form-main'>
        <div className='form-div'>
            <div className='form-info'>
                <p>The Future is Here</p>
                <div className='form-img'></div>
                <p>www.bookify.com</p>
            </div>
            <form className='form-actual' onSubmit={signUp}>
                <p>Sign Up</p>
                <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                <button type='submit' className='submit-btn'>Create Account</button>
                <div className='providers'>
                  <button className='provider-btn' onClick={googleAuthentication}><div className='imgGoogle'></div>Continue with Google</button>
                  <small>Already have an acoount? Please Login Here!</small>
                  <button className='provider-btn'><Link to='/login' className='link-btn-from-register'>Login</Link></button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
