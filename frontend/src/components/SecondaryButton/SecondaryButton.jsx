import styles from './secondaryButton.module.css';

function SecondaryButton({ value, onClick, leftIcon, rightIcon }) {
  return (
    <button className={styles.button} type={'submmit'} onClick={onClick}>
      <span className='material-symbols-rounded'>{leftIcon}</span>
      {value}
      <span className='material-symbols-rounded'>{rightIcon}</span>
    </button>
  );
}

export default SecondaryButton;
