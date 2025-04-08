import './pages.css';
import { useState , useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { Link , useNavigate } from 'react-router';

export default function LoginPage() {

  const firebase = useFirebase();

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(()=>{
    if(firebase.isLoggedIn){
      // navigate to home
      navigate('/');
    }
  },[firebase , navigate]);

  // Signin users Which is already have an account
  const loginUser = async (e) => {
    e.preventDefault();
    const result = await firebase.loginUserWithEmailAndPassword(email , password);
  }

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
            <form className='form-actual' onSubmit={loginUser}>
                <p>Login</p>
                <input type='email' placeholder='e.g: deep123@gmail.com' value={email} onChange={e => setEmail(e.target.value)} required />
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
                <button type='submit' className='submit-btn'>Sign in</button>
                <div className='providers'>
                  <button className='provider-btn' onClick={googleAuthentication}><div className='imgGoogle'></div>Continue with Google</button>
                  <small>New to Bookify? Please Sign Up Here!</small>
                  <button className='provider-btn'><Link to='/register' className='link-btn-from-register'>Sign Up</Link></button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
