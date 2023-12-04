import PrimaryButton from "../PrimaryButton/PrimaryButton"
import styles from "./hero.module.css";
import setupImage from "../../assets/img/3d-setup.png"

function Hero() {
  return (
    <section className={styles.hero}>
      <h1>Best <span className={styles.accent}>Pro Gaming</span><br />Accessories</h1>
      <h6>Discover precision controllers, immersive headsets, and more as we redefine your gaming experience.<br/>Elevate your play at <strong>CompuTech</strong></h6>
      <img src={setupImage} alt="3d image of a gamer setup" />
      <PrimaryButton />
    </section>
  )
}

export default Hero