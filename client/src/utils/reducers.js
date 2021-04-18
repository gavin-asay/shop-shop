import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
	name: 'store',
	initialState: {
		products: [],
		categories: [],
		currentCategory: '',
		cart: [],
		cartOpen: false,
	},
	reducers: {
		updateProducts: (state, action) => {
			// redux toolkit dependencies take code that ostensibly mutates the state and instead creates a new state object
			state.products = action.payload;
		},
		updateCategories: (state, action) => {
			state.categories = action.payload;
		},
		updateCurrentCategory: (state, action) => {
			state.currentCategory = action.payload;
		},
		addToCart: (state, action) => {
			state.cart.push(action.payload);
			if (!state.cartOpen) state.cartOpen = true;
		},
		addMultipletoCart: (state, action) => {
			state.cart = state.cart.concat(action.payload);
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter(product => product._id !== action.payload._id);
			state.cartOpen = state.cart.length > 0;
		},
		updateCartQuantity: (state, action) => {
			state.cartOpen = true;
			state.cart = state.cart.map(product => {
				if (action.payload._id === product._id) {
					product.purchaseQuantity = action.payload.purchaseQuantity;
				}
				return product;
			});
		},
		clearCart: state => {
			state.cart = [];
			state.cartOpen = false;
		},
		toggleCart: state => {
			state.cartOpen = !state.cartOpen;
		},
	},
});

export const {
	updateProducts,
	updateCategories,
	updateCurrentCategory,
	addToCart,
	addMultipletoCart,
	removeFromCart,
	updateCartQuantity,
	clearCart,
	toggleCart,
} = storeSlice.actions; // createSlice automatically creates storeSlice.actions

export default storeSlice.reducer;
