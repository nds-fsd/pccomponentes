import Avatar from '../Profile/Avatar';
import styles from './WriteReview.module.css';

const WriteReview = ({ user }) => {
  return (
    <div>
      <h3>
        <span className='material-symbols-rounded'>border_color</span>Write your review
      </h3>
      <div className={styles.userContainer}>
        <Avatar username={user?.username} />
        <p>{user?.username}</p>
      </div>
      <form className={styles.form}>
        <textarea id='commentary' name='commentary' rows='4' cols='50' required></textarea>
        <input type='number' id='rate' name='rate' min='1' max='5' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default WriteReview;
