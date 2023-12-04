import styles from "./animatedBG.module.css";

function BackgroundImage() {
  return (
  <div className={styles.bg}>
    <div className={`${styles.circles} ${styles.circle1}`}></div>
    <div className={`${styles.circles} ${styles.circle2}`}></div>
    <div className={`${styles.circles} ${styles.circle3}`}></div>
    <div className={`${styles.circles} ${styles.circle4}`}></div>
  </div>
  )
}

export default BackgroundImage