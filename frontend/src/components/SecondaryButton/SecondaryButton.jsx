import styles from './secondaryButton.module.css';

function SecondaryButton({ btnType, value, onClick }) {
  return <input className={styles.button} type={btnType} value={value} onClick={onClick} />;
}

export default SecondaryButton;
