import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './BackofficeProducts.module.css';

const BackofficeProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const [form] = Form.useForm();

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

  const startEditing = (key) => {
    const productToEdit = products.find((product) => product._id === key);
    setEditingProduct(productToEdit);
    form.setFieldsValue(productToEdit);
    setIsModalVisible(true);
  };

  const saveEdit = async (values) => {
    try {
      const updatedProduct = { ...editingProduct, ...values };
      await api.patch(`/products/${updatedProduct._id}`, updatedProduct);

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
      );

      setIsModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const productDelete = async (key) => {
    try {
      const productId = key;

      await api.delete(`/products/${productId}`);

      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
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
      width: '15%',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '15%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 80,
      render: (_, record) => (
        <>
          <Button type='icon' icon={<EditOutlined />} onClick={() => startEditing(record.key)}></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => productDelete(record.key)}>
            <Button type='icon' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
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
        size='small'
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
        }}
      />
      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={editingProduct ? saveEdit : createProduct}>
          <Form.Item name='name' label='Product Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='brand' label='Brand' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[{ required: true, type: 'number' }]}>
            <InputNumber min={0} style={{ width: 120 }} addonAfter='€' />
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
