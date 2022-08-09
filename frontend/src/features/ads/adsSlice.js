import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { FaWindows } from 'react-icons/fa'
import adService from './adService'
import { useNavigate } from 'react-router-dom'


const initialState = {
    ads: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createAd = createAsyncThunk('ads/', async (adData, thunkAPI) =>
{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await adService.createAd(adData,token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }


})

export const deleteAd = createAsyncThunk('ads/delete', async (id, thunkAPI) =>
{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await adService.deleteAd(id,token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }


})

export const updateAd = createAsyncThunk('ads/update', async ({adData,id}, thunkAPI) =>
{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await adService.updateAd(adData,id,token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }


})






export const getAds = createAsyncThunk(
    'ads/getAds',
    async (_, thunkAPI) => {
      try {
       
        return await adService.getAds()
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )



export const adSlice = createSlice({



    name: 'ad',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createAd.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createAd.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.ads.push(action.payload)
        } )
        .addCase(createAd.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        .addCase(getAds.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAds.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.ads.push(action.payload)
        } )
        .addCase(getAds.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        .addCase(deleteAd.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteAd.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            window.location.reload(true);
            
           
        } )
        .addCase(deleteAd.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        .addCase(updateAd.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateAd.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            window.location.reload(true);
           
           
        } )
        .addCase(updateAd.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        
    }
})

export const {reset} = adSlice.actions
export default adSlice.reducer