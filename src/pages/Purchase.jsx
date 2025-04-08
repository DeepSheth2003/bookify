import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebase' 
import { useParams , useNavigate } from 'react-router';

export default function Purchase() {

    const firebase = useFirebase();
    const param = useParams();
    const navigate = useNavigate();

    const [details , setDetails] = useState({});
    const [qauntity , setQauntity] = useState(1);
    const [address , setAddress] = useState();
    const [city , setCity] = useState();
    const [rajya , setRajya] = useState();
    const [isOrderPlaced , setIsOrderPlaced] = useState(false);

    useEffect( ()=>{
        firebase.getDataOfDocument(param).then((data) => { setDetails(data.data()) });
    } ,[]);

    const placeOrder = async () => {
        await firebase.placeOrder(param.bookId , details , qauntity , address , city , rajya).then((result)=>{
            if(result){
                setIsOrderPlaced(true);
                setAddress('');
                setCity('');
                setRajya('');
                setQauntity(1)
            };
        })
    }


  return (
    <div className='purchase'>
        <div className="purchase-container">
            <div className="purchase-item-info">
                <div className="book-detail-head">
                    <p>{details.name}</p>
                </div>
                <div className="body-detail-body">
                    <p><span>Author</span> {details.displayName ? details.displayName : details.userEmail}</p>
                    <p><span>ISBN Number</span> {details.isbn}</p>

                    <div className="detail-prices">
                        <p  className='detail-price'><span>Amount</span> <i className="fa-solid fa-indian-rupee-sign"></i> {parseInt(details.price) + details.price*9.5/100}/-</p>
                        <p className='discount'><span>Discount</span> <small style={{textDecoration: 'line-through'}}><i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.7rem'}}></i> {parseInt(details.price) + details.price*9.5/100}</small> Save upto <small>Rs.{details.price*9.5/100}</small></p>
                    </div>
                    <div className="detail-btns">
                        <button className='detail-list' onClick={e => navigate('/book/books')}>List</button>
                    </div>
                </div>
            </div>
            <div className="order-div">
                <div className="book-detail-head phead">
                    <p>Order Now</p>
                </div>
                <div className="body-detail-body pbody">
                    <label><span>Address </span> <input type="text" value={address} onChange={e => setAddress(e.target.value)} 
                    placeholder='Enter Address' style={{width:'200px' ,border:'none', borderBottom:'1px solid gray' , backgroundColor:'transparent' , color:'white' , outline:'none' , padding:'2px'}} /></label>
                    <label><span>City </span> <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder='Enter City' style={{width:'200px' ,border:'none', borderBottom:'1px solid gray' , backgroundColor:'transparent' , color:'white' , outline:'none' , padding:'2px'}} /></label>
                    <label><span>State </span> <input type="text" value={rajya} onChange={e => setRajya(e.target.value)} placeholder='Enter State' style={{width:'200px' ,border:'none', borderBottom:'1px solid gray' , backgroundColor:'transparent' , color:'white' , outline:'none' , padding:'2px'}} /></label>
                    <p><span>Quantity</span> <input type="number" value={qauntity} onChange={e => setQauntity(e.target.value)} style={{width:'40px' , border:'1px solid gray' , backgroundColor:'transparent' , color:'white' , outline:'none' , padding:'2px'}} /></p>
                    
                    <div className="detail-prices">
                        <p className='discount'><span>Discount</span> <small style={{textDecoration: 'line-through'}}><i className="fa-solid fa-indian-rupee-sign" style={{fontSize:'0.7rem'}}></i> {qauntity > 1 ? (parseInt(details.price) + details.price*9.5/100)*qauntity : parseInt(details.price) + details.price*9.5/100}</small> Save upto <small>Rs.{qauntity > 1 ? (details.price*9.5/100)*qauntity : details.price*9.5/100}</small></p>
                    </div>
                    
                    <div style={{fontSize:'1.1rem'}}>
                        <p>Final Price <span>{qauntity > 1 ? details.price*qauntity : details.price }/-</span></p>
                    </div>

                    <div className="detail-btns">
                        <button className='detail-list' onClick={placeOrder} style={{backgroundColor:'rgba(3, 143, 145, 1)'}}>Buy</button>
                    </div>
                </div>
            </div>
        </div>
        { address !== '' ? '' : <>{isOrderPlaced ? <p><i className="fa-solid fa-circle-check" style={{color:'rgba(0,184,1,1)'}}></i> Order has been Placed succesfully.</p> : ''}</> }
    </div>
  )
}