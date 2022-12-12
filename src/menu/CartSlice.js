import { createSlice } from "@reduxjs/toolkit";

const intialCart = {
    menuId : "",
    menuName : "",
    menuPrice : '',
    quantity: '',
    toppings:[],
    priceWithQunt: '',
};

export const cartSlice = createSlice({
    name: "Cart",
    initialState: {      
        cartCurrent: intialCart,     
        cart: [],
    },

    reducers: {
        menuData: (state, action) => {
            state.cartCurrent = action.payload
        },
        addMenu: (state, action) => {
            console.log(action.payload);
            state.cart.push(action.payload);
            
        },
        updateMenu: (state, action) => {
            console.log("payload",action.payload)
            const temp = state.cart.find(item => (
                item.menuId === action.payload.menuId && item.menuPrice=== action.payload.menuPrice
            )
            )
            console.log("temp",temp)
            if(temp){
               
                    temp.quantity += action.payload.quantity
                    temp.priceWithQunt=temp.quantity*temp.menuPrice
                   
            //state.cart.push(action.payload);
            }
            else{
                state.cart.push({menuId: action.payload.menuId,
                     menuName:action.payload.menuName,
                     menuPrice:action.payload.menuPrice,
                     quantity:action.payload.quantity,
                     toppings:action.payload.toppings,
                     priceWithQunt:action.payload.menuPrice*action.payload.quantity});
            }
        },
        
        clearActiveMenu: (state) => { state.cart = []},
           
    },
    
})

export const  { menuData,addMenu,clearActiveMenu,updateMenu} = cartSlice.actions;

export default cartSlice.reducer;