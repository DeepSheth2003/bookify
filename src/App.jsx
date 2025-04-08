import React from 'react';
// Components
import Navbar from './components/Navbar';
// pages
import Home from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
const Books = React.lazy(()=>import('./pages/Books'));
import Details from './pages/Details';
import About from './pages/About';
import Contact from './pages/Contact';
import Purchase from './pages/Purchase';
// router
import { Route, Routes , useLocation } from 'react-router'
import { Suspense } from 'react';
// CSS
import './App.css'

function App() {
  const location = useLocation();
  return (
    <>
    {location.pathname !== '/' && <div className='navbar-app'><Navbar /></div>}
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/book/list' element={<ListingPage />} />
        <Route path='/book/books' element={
          <Suspense fallback={<p>Loading...</p>}>
            <Books />
          </Suspense>
          } />
        <Route path='/book/books/view/:bookId' element={<Details />} />
        <Route path='/book/purchase/:bookId' element={<Purchase />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
    </>
  )
}

export default App