import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesWithProducts } from '../store/slices/categoriesSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategoriesWithProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to load products.</p>;
  }

  return (
    <div>
      {categories.map(
        (category) =>
          category.products.length > 0 && (
            <div key={category._id}>
              <h3>{category.name}</h3>
              <ul>
                {category.products.map((product) => (
                  <li key={product._id}>{product.name}</li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default ProductList;
