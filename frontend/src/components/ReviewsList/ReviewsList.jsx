import React, { createContext } from 'react';
import Review from '../Review/Review';
import WriteReview from '../WriteReview/WriteReview';
import { getUserSession } from '../../_utils/localStorage.utils';
import { api } from '../../_utils/api';
import { useQuery, useMutation } from 'react-query';
import { message } from 'antd';
import styles from './reviewsList.module.css';

const ReviewsList = ({ productId, isLogged }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const createSuccessToast = () => {
    messageApi.open({
      type: 'success',
      content: 'Review created successfully!',
      style: {
        marginTop: '90px',
      },
    });
  };
  const deleteSuccessToast = () => {
    messageApi.open({
      type: 'success',
      content: 'Review deleted successfully!',
      style: {
        marginTop: '90px',
      },
    });
  };
  const createReviewError = () => {
    messageApi.open({
      type: 'error',
      content: 'Error creating review, try again later',
      style: {
        marginTop: '90px',
      },
    });
  };
  const deleteReviewError = () => {
    messageApi.open({
      type: 'error',
      content: 'Error deleting review, try again later',
      style: {
        marginTop: '90px',
      },
    });
  };
  const user = getUserSession();
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useQuery(['reviews', productId], () => getReviewsByProductId(productId));

  const createReviewMutation = useMutation((newReview) => createReview(newReview), {
    onSuccess: () => {
      refetch();
      createSuccessToast();
    },
  });

  const deleteReviewMutation = useMutation((reviewId) => deleteReview(reviewId), {
    onSuccess: () => {
      refetch();
      deleteSuccessToast();
    },
  });

  const handleCreateReview = async (reviewData) => {
    try {
      await createReviewMutation.mutateAsync(reviewData);
    } catch (error) {
      createReviewError();
      console.error('Error creating review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewMutation.mutateAsync(reviewId);
    } catch (error) {
      deleteReviewError();
      console.error('Error deleting review:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) return <div>Error fetching reviews</div>;

  return (
    <section className={styles.reviewsSection}>
      {contextHolder}
      <h3>Reviews</h3>
      <WriteReview isLogged={isLogged} onCreateReview={handleCreateReview} user={user} />
      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Review key={review._id} review={review} deleteReview={() => handleDeleteReview(review._id)} user={user} />
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </section>
  );
};

const getReviewsByProductId = async (productId) => {
  const response = await api.get(`/reviews?productId=${productId}`);
  return response.data;
};

const createReview = async (newReview) => {
  await api.post('/reviews', newReview);
};

const deleteReview = async (reviewId) => {
  await api.delete(`/reviews/${reviewId}`);
};

export default ReviewsList;
