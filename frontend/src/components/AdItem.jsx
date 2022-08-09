import React from 'react'
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../features/users/userSlice';
import {useState, useEffect} from 'react'
import { deleteAd, updateAd } from '../features/ads/adsSlice';
import {Link} from 'react-router-dom'
import EditForm from './EditForm';



function AdItem({ad}) {
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()




  var isUserLogged;
  var edit;
  if(user != null){
if(user._id == ad.user._id){
  
  isUserLogged =  <button onClick={() => dispatch(deleteAd(ad._id))} className="btn">X</button>
  edit = <Link 
  to={
    `/editAd/${ad._id}`} 
   state={{ ad: ad }} >   &emsp; &emsp; &emsp; Edit </Link>

} 
  }





  return (
  
<div className='ad'>
<div className="card text-center">
<div className="card-header">
            <h5 className="card-title">{ad.title}</h5>
        </div>
  <div className="card-body">
    <h5 className="card-title">{ad.title}</h5>
    <p className="card-text">{ad.description}</p>
    <br></br>
            <div className="float-sm-right">{ad.user.username}</div>
  </div>
  <div className="card-footer text-muted">
  {new Date(ad.createdAt).toLocaleString('en-US')}

  <Link  className="dark"
  to={
    `/ads/${ad._id}`} 
   state={{ ad: ad }}
  
  >  &emsp; &emsp; &emsp; &emsp; &emsp;  &emsp; &emsp; &emsp; &emsp; Discussion</Link>


{edit}
  </div>


  <br></br>
 
  
</div>


<br></br>
</div>



  )
}


export default AdItem
