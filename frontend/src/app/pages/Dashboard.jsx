import React from 'react'
import AdForm from '../../components/AdForm'
import { getAds, reset } from '../../features/ads/adsSlice'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import AdItem from '../../components/AdItem'
import { getUsers } from '../../features/users/userSlice'
import Axios from 'axios'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)


  
 
  const { ads, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ad
  )
  const {users} = useSelector((state) => state.users)




  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    

    dispatch(getAds())
    dispatch(getUsers())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }





 var isUserLogged; 
if(user){
  isUserLogged = <AdForm />
} else {
  isUserLogged = <div>Log in to add an advertisment</div>
}


  return (
    
    <>
    
    <section className='heading'>
      <h1>Welcome {user && user.username}</h1>
      
    </section>
    {isUserLogged}
    

    <section className='content'>
      {ads.length > 0 ? (
        <div className="ads">
          {ads[0].map((ad) => (
            <AdItem key={ad._id} ad={ad} />
          ))}
        </div>
      ) : (<h1>Empty</h1>)}
    </section>
    
    </>

  )
}

export default Dashboard