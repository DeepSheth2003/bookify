import React , { useEffect , useState } from 'react';
import { useFirebase } from '../context/firebase';
// Component
import Card from '../components/Card';

export default function Purchase() {
  
  const firebase = useFirebase();

  const [books , setBooks] = useState([]);

  useEffect(()=>{

    // the getDocs method returning a promise so we were using .then() here... fore Retrive Data.
    firebase.getListedData().then( (books) => {
      setBooks(books.docs);
    } )

  }, [])


  return (
      <div className="books">
        <div className='books-container'>
          {
            books.map((book)=>(
              <Card key={book.id} {...book.data()} id={book.id}/>
            ))
          }
        </div>
      </div>
  )
}
