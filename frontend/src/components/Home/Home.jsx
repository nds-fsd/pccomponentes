import Hero from '../Hero/Hero';
import CategoryList from '../CategoryList/CategoryList';
import ProductList from '../ProductList/ProductList';

function Home({ product }) {
  return (
    <main>
      <Hero />
      <CategoryList product={product} />
      <ProductList product={product} />
    </main>
  );
}

export default Home;
