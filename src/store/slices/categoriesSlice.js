import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addProduct = createAsyncThunk(
  'categories/addProduct',
  async (product, { dispatch }) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    const newProduct = await response.json();

    dispatch(fetchCategoriesWithProducts());
    return newProduct;
  }
);

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
    totalProducts: 0,
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
      state.totalProducts = action.payload.reduce((total, category) => {
        return total + category.products.length;
      }, 0);
    },
    [fetchCategoriesWithProducts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addProduct.fulfilled]: (state, action) => {},
    [addProduct.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [addProduct.pending]: (state) => {
      state.status = 'loading';
    },
  },
});

export default categoriesSlice.reducer;
