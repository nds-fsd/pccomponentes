import computechLogo from '../../../assets/computech-logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import styles from './backofficeNav.module.css';

const items = [
  {
    key: 'products',
    label: <Link to='/backoffice/products'>Products</Link>,
    icon: <span className='material-symbols-rounded'>inventory_2</span>,
  },
  {
    key: 'categories',
    label: <Link to='/backoffice/categories'>Categories</Link>,
    icon: <span className='material-symbols-rounded'>category</span>,
  },
  {
    key: 'users',
    label: <Link to='/backoffice/users'>Users</Link>,
    icon: <span className='material-symbols-rounded'>person</span>,
  },
  {
    key: 'companies',
    label: <Link to='/backoffice/companies'>Companies</Link>,
    icon: <span className='material-symbols-rounded'>apartment</span>,
  },
  {
    key: 'orders',
    label: <Link /*to='/backoffice/orders'*/>Orders</Link>,
    icon: <span className='material-symbols-rounded'>conveyor_belt</span>,
    disabled: true,
  },
];

const BackofficeNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <nav className={`${styles.navbar} ${collapsed ? styles.collapsed : ''}`}>
        <img src={computechLogo} alt='Computech logo' />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          theme='dark'
          inlineCollapsed={collapsed}
          items={items}
        />
        <button onClick={toggleCollapsed}>
          {collapsed ? (
            <span className='material-symbols-rounded'>keyboard_double_arrow_right</span>
          ) : (
            <span className='material-symbols-rounded'>keyboard_double_arrow_left</span>
          )}
        </button>
      </nav>
    </>
  );
};

export default BackofficeNav;
