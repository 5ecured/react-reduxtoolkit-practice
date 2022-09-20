import React, { useEffect } from 'react'
import Navbar from './app/components/Navbar'
import CartContainer from './app/components/CartContainer'
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotal } from './features/cart/cartSlice'

const App = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App