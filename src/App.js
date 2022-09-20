import React, { useEffect } from 'react'
import Navbar from './app/components/Navbar'
import CartContainer from './app/components/CartContainer'
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotal, getCartItems } from './features/cart/cartSlice'
import Modal from './app/components/Modal'


const App = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const isLoading = useSelector(state => state.cart.isLoading)
  const isOpen = useSelector(state => state.modal.isOpen)

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  // useEffect(() => {
  //   dispatch(getCartItems())
  // }, [])

  // if (isLoading) {
  //   return (
  //     <div className='loading'>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App