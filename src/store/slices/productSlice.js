import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/products`
    );
    const products = await response.json();
    return products;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
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
    const newProduct = await response.json();
    return newProduct;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    postStatus: 'idle', // Separate status for POST to track add operations
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addProduct.pending]: (state) => {
      state.postStatus = 'loading';
    },
    [addProduct.fulfilled]: (state, action) => {
      state.postStatus = 'succeeded';
      state.products.push(action.payload);
    },
    [addProduct.rejected]: (state, action) => {
      state.postStatus = 'failed';
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;
