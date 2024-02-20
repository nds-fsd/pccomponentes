import Hero from '../Hero/Hero';
import CategoryList from '../CategoryList/CategoryList';
import HomeProductsBestSellers from '../HomeProductsBestSellers/HomeProductsBestSellers';
import { useContext } from 'react';

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
