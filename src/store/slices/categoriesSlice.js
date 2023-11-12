import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategoriesWithProducts = createAsyncThunk(
  'categories/fetchCategoriesWithProducts',
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/categories/products`
    );
    const categoriesWithProducts = await response.json();
    return categoriesWithProducts;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCategoriesWithProducts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCategoriesWithProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.categories = action.payload;
    },
    [fetchCategoriesWithProducts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default categoriesSlice.reducer;
