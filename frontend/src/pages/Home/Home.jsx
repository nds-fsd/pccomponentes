import Hero from '../../components/Hero/Hero';
import CategoryList from '../../components/CategoryList/CategoryList';
import HomeProductsBestSellers from '../../components/HomeProductsBestSellers/HomeProductsBestSellers';

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
