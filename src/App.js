import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'

import {useSelector, useDispatch} from 'react-redux'
import {useEffect, Fragment} from 'react'
import { sendCartData, fetchCartData } from './store/cart-actions'

let isInitialized = true;

function App() {
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {

    if (isInitialized) {
      isInitialized = false;
      return;
    }
    
    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
