import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProduct,
  fetchCategoriesWithProducts,
} from '../store/slices/categoriesSlice';
const CategorySelect = () => {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const totalProducts = useSelector((state) => state.categories.totalProducts);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategoriesWithProducts());
    }
  }, [status, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = {
      name: productName,
      category: selectedCategory,
    };
    dispatch(addProduct(product));
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 align-items-center">
      <div className="col-auto">
        <input
          id="productName"
          type="text"
          placeholder="Product"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <select
          id="categorySelect"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={status === 'loading'}
        >
          <option value="">Select a Category</option>
          {status === 'succeeded' &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
      <div className="col-auto">Total Products: {totalProducts}</div>
      {error && <div className="col-12">{error}</div>}
    </form>
  );
};

export default CategorySelect;
