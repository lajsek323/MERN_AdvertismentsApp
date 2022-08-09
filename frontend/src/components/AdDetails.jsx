import React from "react";
import { useLocation, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import { adCom, deleteCom, getComs } from "../features/comments/comSlice";
import {useState, useEffect} from 'react'
import { deleteAd, updateAd } from '../features/ads/adsSlice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getAds, reset } from '../features/ads/adsSlice'

const AdDetails = (_) => {
  const { state } = useLocation();
  const navigate = useNavigate()


  const {user} = useSelector((state) => state.auth)
  const { ads, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ad
  )
  const { coms } = useSelector(
    (state) => state.com
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }


    dispatch(getAds())
    dispatch(getComs())
   

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


    const [formData, setFormData] = useState({
        content: ''
        
      })


      const { content } = formData


    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
      



    const onSubmit = e => {
        e.preventDefault()

        const adData = {
            content
          }
          console.log(adData)
          dispatch(adCom({adData,id: state.ad._id}))
          
          navigate('/')
         
          
          
          
    }

   

  var isUserLogged;
  var edit;
  var dd = state.ad.comments.length >= 0
  if(user != null){
if(user._id == state.ad.user._id){
  
  isUserLogged =  <button onClick={() => {dispatch(deleteAd(state.ad._id));navigate('/')}} className="btn">X</button>
  edit = <button onClick={() => {dispatch(deleteCom(coms._id))}} className="btn">Delete</button>
} 
  }
  else{
      dd = false
  }
  console.log(state.ad.comments.length)



console.log(dd)


  return (
     
<div>
<div className='ad'>
<div className="card text-center">
<div className="card-header">
            <h5 className="card-title">{state.ad.title}</h5>
        </div>
  <div className="card-body">
    <h5 className="card-title">{state.ad.title}</h5>
    <p className="card-text">{state.ad.description}</p>
    <br></br>
            <div className="float-sm-right">{state.ad.user.username}</div>
  </div>
  <div className="card-footer text-muted">
  {new Date(state.ad.createdAt).toLocaleString('en-US')}
  
  </div>

 {isUserLogged}

  
</div>


<br></br>
</div>
<p>Comments</p>
<br>
</br><br>
</br>

{dd && state.ad.comments.map((cm,i) => 
        <><div className="card" key={i}>
            <div className="card-header"> {cm.user.username} </div>
            <div className="card-body">
                {cm.content}
    
            </div>
            <div className="card-footer text-muted">
                {new Date(cm.createdAt).toLocaleString('en-US')}
    
            </div>
            
            {cm.user._id == user._id && <button onClick={() => {dispatch(deleteCom(cm._id))}} className="btn">Delete</button>}
           
    
        </div>
        <br></br>  <br></br>
        </>
      
    )}




<br></br>
{dd &&
<section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='content'
              name='content'
              required
              value={content}
              placeholder='Enter a content'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
            <br></br>
          </div>
        </form>
      </section>

}

</div>



  );
};

export default AdDetails;
