import styles from './button.module.css';

function PrimaryButton({ value, onClick, leftIcon, rightIcon }) {
  return (
    <button className={`${styles.button} ${styles.primaryButton}`} type='submit' onClick={onClick}>
      <span className='material-symbols-rounded'>{leftIcon}</span>
      {value}
      <span className='material-symbols-rounded'>{rightIcon}</span>
    </button>
  );
}

function SecondaryButton({ value, onClick, leftIcon, rightIcon }) {
  return (
    <button className={`${styles.button} ${styles.secondaryButton}`} type='submit' onClick={onClick}>
      <span className='material-symbols-rounded'>{leftIcon}</span>
      {value}
      <span className='material-symbols-rounded'>{rightIcon}</span>
    </button>
  );
}

function TextButton({ value, onClick, leftIcon, rightIcon }) {
  return (
    <button className={`${styles.button} ${styles.textButton}`} type='submit' onClick={onClick}>
      <span className='material-symbols-rounded'>{leftIcon}</span>
      {value}
      <span className='material-symbols-rounded'>{rightIcon}</span>
    </button>
  );
}

export { PrimaryButton, SecondaryButton, TextButton };
