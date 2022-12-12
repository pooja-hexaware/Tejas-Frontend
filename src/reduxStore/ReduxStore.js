import { configureStore } from '@reduxjs/toolkit';
import toppingsReducer from '../toppings/ToppingsSlice';
import CartReducer from '../menu/CartSlice';

export const Reduxstore = configureStore({
    reducer: {
        toppings: toppingsReducer,
        Cart: CartReducer,

    },
})