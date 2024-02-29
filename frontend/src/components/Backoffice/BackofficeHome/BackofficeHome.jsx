import { Statistic } from 'antd';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { api } from '../../../_utils/api';
import styles from './backofficeHome.module.css';

const formatter = (value) => <CountUp end={value} separator='.' />;

const BackofficeHome = () => {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [companies, setCompanies] = useState(0);

  const fetchUsers = async () => {
    const response = await api.get('/users');
    setUsers(response.data.length);
  };
  const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data.length);
  };
  const fetchOrders = async () => {
    const response = await api.get('/orders');
    setOrders(response.data.length);
  };
  const fetchCompanies = async () => {
    const response = await api.get('/companies');
    setCompanies(response.data.length);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
    fetchCompanies();
  }, []);
  return (
    <main className={`${styles.main} wrapper`}>
      <div className={styles.card}>
        <span className='material-symbols-rounded'>person</span>
        <Statistic title='Active Users' value={users} formatter={formatter} />
      </div>
      <div className={styles.card}>
        <span className='material-symbols-rounded'>inventory_2</span>
        <Statistic title='Products' value={products} formatter={formatter} />
      </div>
      <div className={styles.card}>
        <span className='material-symbols-rounded'>conveyor_belt</span>
        <Statistic title='Orders' value={orders} formatter={formatter} />
      </div>
      <div className={styles.card}>
        <span className='material-symbols-rounded'>apartment</span>
        <Statistic title='Active Companies' value={companies} formatter={formatter} />
      </div>
    </main>
  );
};

export default BackofficeHome;
