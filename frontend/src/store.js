// import {combineReducers, configureStore}from '@reduxjs/toolkit';
// import productsReducer from './slices/productsSlice';
// import productReducer from './slices/productSlice';
// import authReducer from'./slices/authSlice';

// const reducer=combineReducers({
//     productsState:productsReducer,
//     productState:productReducer,
//     authState:authReducer
    
// })

// const store=configureStore({
//     // reducer:{
//     //     productsState:productsReducer,
//     //     productState:productReducer
//     // }
//     reducer
// })

// export default store;

import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
const store = configureStore({
    reducer: {
        productsState: productsReducer,
        productState: productReducer,
        authState: authReducer,
        cartState:cartReducer,
        orderState:orderReducer
    }
});

export default store;