import { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './categoryList.module.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    console.log('Fetching products for category:', categoryId);
    try {
      const response = await api.get(`/products/byCategory/${categoryId}`);
      console.log('Fetched products for category:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Equipment for advanced <span className={styles.accent}>gaming</span>
      </h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onSelectCategory={() => {
              console.log('Category card clicked:', category._id);
              setSelectedCategoryId(category._id);
              fetchProductsByCategory(category._id);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
