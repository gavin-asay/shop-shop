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

// import {
// 	UPDATE_PRODUCTS,
// 	UPDATE_CATEGORIES,
// 	UPDATE_CURRENT_CATEGORY,
// 	ADD_TO_CART,
// 	ADD_MULTIPLE_TO_CART,
// 	REMOVE_FROM_CART,
// 	UPDATE_CART_QUANTITY,
// 	CLEAR_CART,
// 	TOGGLE_CART,
// } from './actions';
// import { useReducer } from 'react';

// export const reducer = (state, action) => {
// 	switch (action.type) {
// 		case UPDATE_PRODUCTS:
// 			return {
// 				...state,
// 				products: [...action.products],
// 			};
// 		case UPDATE_CATEGORIES:
// 			return {
// 				...state,
// 				categories: [...action.categories],
// 			};
// 		case UPDATE_CURRENT_CATEGORY:
// 			return {
// 				...state,
// 				currentCategory: action.currentCategory,
// 			};
// 		case ADD_TO_CART:
// 			return {
// 				...state,
// 				cartOpen: true,
// 				cart: [...state.cart, action.product],
// 			};
// 		case ADD_MULTIPLE_TO_CART:
// 			return {
// 				...state,
// 				cart: [...state.cart, ...action.products],
// 			};
// 		case REMOVE_FROM_CART:
// 			let newState = state.cart.filter(product => {
// 				return product._id !== action._id;
// 			});

// 			return {
// 				...state,
// 				cartOpen: newState.length > 0,
// 				cart: newState,
// 			};
// 		case UPDATE_CART_QUANTITY:
// 			return {
// 				...state,
// 				cartOpen: true,
// 				cart: state.cart.map(product => {
// 					if (action._id === product._id) {
// 						product.purchaseQuantity = action.purchaseQuantity;
// 					}
// 					return product;
// 				}),
// 			};
// 		case CLEAR_CART:
// 			return {
// 				...state,
// 				cartOpen: false,
// 				cart: [],
// 			};
// 		case TOGGLE_CART:
// 			return {
// 				...state,
// 				cartOpen: !state.cartOpen,
// 			};
// 		default:
// 			return state;
// 	}
// };

// export function useProductReducer(initialState) {
// 	return useReducer(reducer, initialState);
// }
