import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        checkOutItems: [],
        cartItemQuantity: 0, 
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const product = action.payload;
            const itemInCartIndex = state.cart.findIndex((item) => item.id === product.id);
            const itemInCart = state.cart[itemInCartIndex]

            if(itemInCartIndex !== -1) {
                state.cart[itemInCartIndex] = {...itemInCart, quantity: itemInCart.quantity + 1}
            } else {
                state.cart.push({...product, quantity: 1})
                state.cartItemQuantity += 1
            }
        },
        CLEAR_CART: (state) => {
            state.cart = []
            state.cartItemQuantity = 0;
        },
        EDIT_CART_ITEM: (state, action) => {
            const product = action.payload;
            const itemInCartIndex = state.cart.findIndex((item) => item.id === product.id);
            const itemInCart = state.cart[itemInCartIndex]

            state.cart[itemInCartIndex] = {...itemInCart, ...product}
        },
        ADD_TO_TOTAL: (state, action) => {
            const id = action.payload;
            const itemInCart = state.cart.find((item) => item.id === id);

        //    state.checkOutItems.push(itemInCart)
        },
        REMOVE_FROM_TOTAL: (state, action) => {
            const id = action.payload;

            // state.checkOutItems.filter(item => item.id === id)
        }

    }
});

export const { ADD_TO_CART, CLEAR_CART, EDIT_CART_ITEM, ADD_TO_TOTAL, REMOVE_FROM_TOTAL} = cartSlice.actions;

export default cartSlice.reducer