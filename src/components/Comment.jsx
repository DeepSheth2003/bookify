import React, { useEffect, useState } from 'react'
import { fetchData } from '../pages/Random';

export default function Comment() {

    const [randomUser , setRandomUser] = useState(null);
    useEffect(()=>{
        fetchData().then((response)=>{
            if(response) setRandomUser(response.results[0]);
        })
    } ,[]);

  return (
    <div className='comment'>
        <div className="com-identity">
            <div className="com-pic"><div className="com-pic-in"><img src={randomUser ? randomUser.picture.medium : 'deep'} alt='' /></div></div>
            <div className="com-name">
                <p>@{randomUser ? randomUser.name.first : ''} {randomUser ? randomUser.name.last : ''} <span style={{color:'gray' , fontSize:'0.6rem'}}>{randomUser ? randomUser.dob.age : ''} days ago</span> </p>
                <p style={{color:'gray' , fontSize:'0.7rem'}}><i className="fa-solid fa-envelope"></i> {randomUser ? randomUser.email : ''} &nbsp; | &nbsp; <i className="fa-solid fa-phone"></i> {randomUser ? randomUser.phone : ''}</p>
            </div>
            <div className="com-likes">
                <div className="likes">
                    <i className="fa-regular fa-heart"></i> {randomUser ? randomUser.dob.age+100 : '0'}
                </div>
            </div>
        </div>
        <div className="com-info">
            <div className="thoughts">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi eius unde sunt inventore pariatur blanditiis nesciunt animi explicabo fuga recusandae quo saepe, ullam voluptates sequi?</div>
        </div>
    </div>
  )
}
