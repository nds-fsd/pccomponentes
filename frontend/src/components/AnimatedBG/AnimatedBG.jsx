import styles from "./animatedBG.module.css";

function BackgroundImage() {
  return (
  <div className={styles.bg}>
    <span className={`${styles.circles} ${styles.circle1}`}></span>
    <span className={`${styles.circles} ${styles.circle2}`}></span>
    <span className={`${styles.circles} ${styles.circle3}`}></span>
    <span className={`${styles.circles} ${styles.circle4}`}></span>
  </div>
  )
}

export default BackgroundImage