import React, { useState, useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import { api } from '../../../_utils/api';
import styles from './BackofficeProducts.module.css';

const BackofficeProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    return api.get('/products');
  };

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log('Error!');
      });
  }, []);

  const formatedProducts = products.map((product) => ({
    key: product._id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
  }));

  const handleDelete = async (key) => {
    try {
      const productId = key;

      await api.delete(`/products/${productId}`);

      const newData = formatedProducts.filter((product) => product.key !== key);
      setProducts(newData);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price (€)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        formatedProducts.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Products</h1>
      <Table dataSource={formatedProducts} columns={columns} />
    </main>
  );
};

export default BackofficeProducts;
