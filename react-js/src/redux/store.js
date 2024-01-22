import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/couterSlides'
import userReducer from './slides/userSlides'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    },
})