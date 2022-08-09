import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userService from './userService'

// get user form localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    users: [],
   
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// reg User





export const getUsers = createAsyncThunk(
    'users/getAll',
    async (_, thunkAPI) => {
      try {
       
        return await userService .getUsers()
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

  export const getUser = createAsyncThunk(
    'users/getUser',
    async (_, thunkAPI) => {
      try {
        const id = thunkAPI.getState().ad.ads[0].user
        console.log(id)
        return await userService .getUsers(id)
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




export const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { 
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.users.push(action.payload)
        } )
        .addCase(getUsers.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
        })
        
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer