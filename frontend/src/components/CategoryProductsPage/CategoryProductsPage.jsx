import { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import ProductCard from '../ProductCard/ProductCard';

function CategoryProductsPage({ match }) {
  const categoryId = match.params.categoryId;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.get(`/products/byCategory/${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <div>
      <h2>Products in Category</h2>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default CategoryProductsPage;
