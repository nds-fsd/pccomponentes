import styles from './review.module.css';

const Review = ({ review }) => {
  return (
    <div>
      <div>Avatar</div>
      <p>{review.user}</p>
      <div>{review.rate}</div>
      <p>{review.comentary}</p>
      <p>{review.date}</p>
    </div>
  );
};

export default Review;
