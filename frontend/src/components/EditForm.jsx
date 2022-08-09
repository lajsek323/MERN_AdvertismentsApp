import React from 'react'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { updateAd, rese } from '../features/ads/adsSlice'
import { useNavigate } from 'react-router-dom'
import { useLocation, Link } from "react-router-dom";

function EditForm() {
    const navigate = useNavigate()
    const { state } = useLocation();
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

          console.log(state.ad._id)
    
          dispatch(updateAd({adData,id: state.ad._id}))
          navigate('/')
          
          
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
              placeholder='Edit a title'
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
              placeholder='Edit a description'
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

export default EditForm