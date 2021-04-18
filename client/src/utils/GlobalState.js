import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducers';

export default configureStore({
	reducer: {
		store: storeReducer,
	},
});
