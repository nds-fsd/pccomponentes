import { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './categoryList.module.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);

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

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Equipment for advanced <span className={styles.accent}>gaming</span>
      </h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
