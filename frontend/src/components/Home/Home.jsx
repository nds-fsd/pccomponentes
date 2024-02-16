import Hero from '../Hero/Hero';
import CategoryList from '../CategoryList/CategoryList';
import HomeProductsBestSellers from '../HomeProductsBestSellers/HomeProductsBestSellers';

function Home({ product }) {
  return (
    <main>
      <Hero />
      <CategoryList product={product} />
      <HomeProductsBestSellers />
    </main>
  );
}

export default Home;
