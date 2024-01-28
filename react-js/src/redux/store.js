import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/couterSlides'
import userReducer from './slides/userSlides'
import productReducer from './slides/productSlides'
import orderReducer from './slides/orderSlides'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        product: productReducer,
        order: orderReducer
    },
})