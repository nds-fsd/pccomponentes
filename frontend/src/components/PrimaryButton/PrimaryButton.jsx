import styles from './primaryButton.module.css';

function PrimaryButton({ btnType, value, onClick }) {
  return <input className={styles.button} type={btnType} value={value} onClick={onClick} />;
}

export default PrimaryButton;
