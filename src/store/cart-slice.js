import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalQuantity: 0,
	},
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items
		}, 
		addItemToCart(state, action) {
			const newItem = action.payload;
      // podanego itema w payloadzie dodajemy do zmiennej
			const existingItem = state.items.find((item) => item.id === newItem.id);
			// potem sprawdzamy czy taki item już istnieje w koszyku
			state.totalQuantity++;

      if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
          name: newItem.title,
				});
			} else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price
      }
      // jeśli nie to dodajemy ten nowy item do koszyka
		},

		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find(item => item.id === id) 
			if (existingItem.quantity === 1) {
				state.items = state.items.filter(item => item.id !== id)
				state.totalQuantity--;
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});


export const cartActions = cartSlice.actions
export default cartSlice

