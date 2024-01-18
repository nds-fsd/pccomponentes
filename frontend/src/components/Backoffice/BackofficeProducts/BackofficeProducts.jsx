import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, InputNumber } from 'antd';
import { api } from '../../../_utils/api';
import styles from './BackofficeProducts.module.css';

const BackofficeProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const productId = key;
      await api.delete(`/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const createProduct = async (values) => {
    try {
      const response = await api.post('/products', values);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        products.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Products</h1>
      <Button type='primary' onClick={showModal}>
        Add Product
      </Button>
      <Table dataSource={products} columns={columns} />

      <Modal title='Add New Product' visible={isModalVisible} onCancel={handleCancel} onOk={() => form.submit()}>
        <Form form={form} onFinish={createProduct}>
          <Form.Item name='name' label='Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='brand' label='Brand' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='stock' label='Stock' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default BackofficeProducts;
