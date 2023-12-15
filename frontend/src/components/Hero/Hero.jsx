import styles from './hero.module.css';
import setupImage from '../../assets/img/3d-setup.png';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1>
          Best <span className={styles.accent}>Pro Gaming</span> Accessories
        </h1>
        <p>
          Discover precision controllers, immersive headsets, and more as we
          redefine your gaming experience.
          <br />
          Elevate your play at <strong>CompuTech</strong>
        </p>
      </div>
      <img src={setupImage} alt='3d image of a gamer setup' />
    </section>
  );
}

export default Hero;
