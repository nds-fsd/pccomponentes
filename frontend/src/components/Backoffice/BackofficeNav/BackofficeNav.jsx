import computechLogo from '../../../assets/computech-logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import styles from './backofficeNav.module.css';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Products', '1', <span className='material-symbols-rounded'>inventory_2</span>),
  getItem('Categories', '2', <span className='material-symbols-rounded'>category</span>),
  getItem('Orders', '3', <span className='material-symbols-rounded'>conveyor_belt</span>),
  getItem('Users', '4', <span className='material-symbols-rounded'>person</span>),
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
