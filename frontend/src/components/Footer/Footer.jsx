import styles from "./footer.module.css";
import computechLogo from "../../assets/computech-logo.svg"

function Footer() {
  return (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.text}>
        <p>Terms and conditions</p>
        <p>Privacy Policy</p>
      </div>
      <img src={computechLogo} alt="Computech logo" />
    </div>
  </footer>
  )
}

export default Footer