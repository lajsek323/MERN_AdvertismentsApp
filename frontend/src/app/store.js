import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adReducer from '../features/ads/adsSlice';
import userReducer from '../features/users/userSlice';
import comReducer from '../features/comments/comSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ad: adReducer,
    users: userReducer,
    com: comReducer,
  },
});
