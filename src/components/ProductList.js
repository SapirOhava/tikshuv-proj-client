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
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center">
        <p>Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="row">
        {categories.map(
          (category) =>
            category.products.length > 0 && (
              <div key={category._id} className="col">
                <h3>
                  {category.name} - {category.products.length} products
                </h3>
                <ul className="list-group">
                  {category.products.map((product, index) => (
                    <li key={product._id} className="list-group-item">
                      {index + 1}. {product.name} - ({product.count})
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProductList;
