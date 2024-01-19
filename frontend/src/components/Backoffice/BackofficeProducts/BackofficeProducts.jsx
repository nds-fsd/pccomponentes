import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, InputNumber } from 'antd';
import { api } from '../../../_utils/api';
import styles from './BackofficeProducts.module.css';

const BackofficeProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const productDelete = async (key) => {
    try {
      const productId = key;

      await api.delete(`/products/${productId}`);

      // Update the products state by filtering out the deleted product
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
      console.error('Error creating product', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatedProducts = products.map((product) => ({
    key: product._id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    Table.EXPAND_COLUMN,
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
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) =>
        formatedProducts.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => productDelete(record.key)}>
            <Button type='primary'>Delete</Button>
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
      <Table
        dataSource={formatedProducts}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
        }}
      />
      <Modal title='Add New Product' open={isModalVisible} onCancel={handleCancel} onOk={() => form.submit()}>
        <Form form={form} onFinish={createProduct}>
          <Form.Item name='name' label='Product Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='brand' label='Brand' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[{ required: true, type: 'number' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='stock' label='Stock' rules={[{ required: true, type: 'number' }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='description' label='Description' rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default BackofficeProducts;
