import styles from './rateStars.module.css';
import { Rate, ConfigProvider, theme } from 'antd';

const RateStars = ({ rating }) => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Rate disabled defaultValue={rating} />
    </ConfigProvider>
  );
};

export default RateStars;
