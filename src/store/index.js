import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productReducer,
  },
});
