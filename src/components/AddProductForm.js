import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { addProduct } from '../store/slices/productSlice';

const CategorySelect = () => {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  // Fetch categories when component mounts and status is 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="categorySelect">Category:</label>
        <select
          id="categorySelect"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={status === 'loading'}
        >
          <option value="">Select a Category</option>
          {status === 'succeeded' &&
            categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default CategorySelect;
