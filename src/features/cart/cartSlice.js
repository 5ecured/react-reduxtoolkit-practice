import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true
}

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
    }
})

// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions

export default cartSlice.reducer