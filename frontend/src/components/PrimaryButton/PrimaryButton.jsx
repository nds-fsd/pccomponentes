import styles from './primaryButton.module.css';

function PrimaryButton({ value, onClick, leftIcon, rightIcon }) {
  return (
    <button className={styles.button} type='submit' onClick={onClick}>
      <span className='material-symbols-rounded'>{leftIcon}</span>
      {value}
      <span className='material-symbols-rounded'>{rightIcon}</span>
    </button>
  );
}

export default PrimaryButton;
