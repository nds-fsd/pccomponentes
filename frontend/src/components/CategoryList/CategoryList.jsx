import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './categoryList.module.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
          <div key={category._id}>
            <Link to={`/category/${category._id}`}>
              {/* Utiliza Link para navegar a la ruta de la categoría */}
              <CategoryCard
                category={category}
                onSelectCategory={() => {
                  console.log('Category card clicked:', category._id);
                  setSelectedCategoryId(category._id);
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
