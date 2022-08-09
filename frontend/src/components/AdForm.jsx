import React from 'react'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { createAd, rese } from '../features/ads/adsSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        
      })


      const { title, description } = formData


    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
      

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

       

        const adData = {
            title,
            description
          }

          if(title == '' ){
            toast.error('At least 5 chars')
          }
    
          dispatch(createAd(adData))
          window.location.reload(true);
          
          
    }




  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
             
              required
              value={title}
              placeholder='Enter a title'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
             
              required
              value={description}
              placeholder='Enter a description'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
  )
}

export default AdForm