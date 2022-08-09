import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { FaWindows } from 'react-icons/fa'
import comService from './comSerivce'


const initialState = {
    coms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const getComs = createAsyncThunk(
    'coms/getComs',
    async (_, thunkAPI) => {
      try {
       
        return await comService.getComs()
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


export const adCom = createAsyncThunk('coms/add', async ({adData,id}, thunkAPI) =>
{

    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(token)
        console.log(adData)
        return await comService.adCom(adData,id,token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }

})

export const deleteCom = createAsyncThunk('coms/delete', async (id, thunkAPI) =>
{

    try {
        const token = thunkAPI.getState().auth.user.token
        return await comService.deleteCom(id,token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
    }


})


export const comSlice = createSlice({
    name: 'com',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(adCom.pending, (state) => {
            state.isLoading = true
        })
        .addCase(adCom.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.coms.push(action.payload)
        } )
        .addCase(adCom.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        .addCase(getComs.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getComs.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.coms.push(action.payload)
        } )
        .addCase(getComs.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        
        
    }
})

export const {reset} = comSlice.actions
export default comSlice.reducer