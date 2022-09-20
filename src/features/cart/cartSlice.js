import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'http://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state, action) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
        },
        increase: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload)
            cartItem.amount += 1
        },
        decrease: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload)
            cartItem.amount -= 1
        },
        calculateTotal: (state, action) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state, action) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state, action) => {
            state.isLoading = false
        },
    }
})

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions

export default cartSlice.reducer