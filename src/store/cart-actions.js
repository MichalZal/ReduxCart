import { uiActions } from "./ui-slice";
import {cartActions } from './cart-slice'

export const fetchCartData = cart => {
	return async(dispatch) => {
    const fetchData = async() => {
      const res = await fetch('https://redux-store-4fb66-default-rtdb.europe-west1.firebasedatabase.app/cart.json')

      if(!res.ok) {
        throw new Error('could not fetch cart data')
      }

      const data = await res.json();

      return data
    }

    try {
      const cartData = await fetchData()
			dispatch(cartActions.replaceCart(cartData))
    } catch (err) {
      dispatch(uiActions.showNotification({
				status: 'error',
				title: 'error',
				message: 'Fetching cart data failed'
			}))
    }
  }
}


export const sendCartData = cart => {
	return async(dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'pending',
				message: 'Sending cart data!'
			})
		);

		const sendRequest = async() => {
      const res = await fetch('https://redux-store-4fb66-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })

      if (!res.ok) {
        throw new Error('Sending cart data failed')
      }
    }

		try {
			await sendRequest()
			dispatch(uiActions.showNotification({
				status: 'success',
				title: 'success',
				message: 'Sent cart data successfully'
			}))
		} catch (e) {
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'error',
				message: 'Sending cart data failed'
			}))
		}
	}
}
