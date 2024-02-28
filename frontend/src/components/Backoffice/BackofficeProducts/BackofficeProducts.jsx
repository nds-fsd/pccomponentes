import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, InputNumber, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './BackofficeProducts.module.css';
import ImageUpload from '../../ImageUpload/ImageUpload';

const BackofficeProducts = () => {
  const [products, setProducts] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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

  const addPhoto = (photoData) => {
    console.log('Photo added:', photoData);
  };

  const getAllProducts = async () => {
    return api.get('/products');
  };

  const getAllCategories = async () => {
    return api.get('/categories');
  };

  const showTotal = (total) => `Total ${total} products`;

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log('Error!', error);
      });

    getAllCategories()
      .then((response) => {
        setCategoryNames(response.data);
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }, []);

  const startEditing = (key) => {
    const productToEdit = products.find((product) => product._id === key);
    setEditingProduct(productToEdit);
    form.setFieldsValue(productToEdit);
    const categories = productToEdit.categories.map((category) => {
      return { label: category?.name, value: category?._id };
    });
    form.setFieldValue('categories', categories);
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
      getAllProducts()
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log('Error!', error);
        });
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

  const formattedProducts = products.map((product) => ({
    key: product._id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categories: product.categories,
  }));

  const formattedCategories = categoryNames.map((category, i) => {
    return { label: categoryNames[i]?.name, value: categoryNames[i]?._id };
  });

  const columns = [
    Table.EXPAND_COLUMN,
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
      width: '15%',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '15%',
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      width: '15%',
      render: (record) => (
        <>
          {record.map((category) => {
            return (
              <Tag color='blue' key={category._id}>
                {category.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 80,
      render: (_, record) => (
        <>
          <Button type='icon' icon={<EditOutlined />} onClick={() => startEditing(record.key)}></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => productDelete(record.key)}>
            <Button type='icon'>
              <span className='material-symbols-rounded'>delete</span>
            </Button>
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
        dataSource={formattedProducts}
        columns={columns}
        size='small'
        pagination={{
          total: formattedProducts.length,
          showTotal: showTotal,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '500'],
        }}
        scroll={{ y: 500 }}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
        }}
        className={styles.table}
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
          <Form.Item name='categories' label='Categories' rules={[{ required: true }]}>
            <Select mode='multiple' placeholder='Select categories' options={formattedCategories} />
          </Form.Item>
          {/* <Form.Item label='Product Image'></Form.Item> */}
        </Form>

        <ImageUpload productId={editingProduct ? editingProduct._id : null} addPhoto={addPhoto} />
      </Modal>
    </main>
  );
};

export default BackofficeProducts;
