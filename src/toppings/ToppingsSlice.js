import { createSlice } from "@reduxjs/toolkit";

const intialToppings = {
    toppingName : "",
    toppingPrice : "",
};

export const toppingsSlice = createSlice({
    name: "toppings",
    initialState: {
        toppingCurrent: intialToppings,
        toppings: [],
    },

    reducers: {
        toppingsData: (state, action) => {
            state.toppingCurrent = action.payload
        },
        addToppings: (state, action) => {
            console.log(action.payload);
            state.toppings.push(action.payload);
            
        },
        
        clearActiveToppings: (state) => { state.toppings = []},
           
    },
    
})

export const  { toppingsData,addToppings,clearActiveToppings} = toppingsSlice.actions;

export default toppingsSlice.reducer;