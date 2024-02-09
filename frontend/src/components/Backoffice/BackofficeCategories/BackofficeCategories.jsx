import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './BackofficeCategories.module.css';

const BackofficeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const getAllCategories = async () => {
    return api.get('/categories');
  };

  const showTotal = (total) => `Total ${total} categories`;

  useEffect(() => {
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }, []);

  const startEditing = (key) => {
    const categoryToEdit = categories.find((category) => category._id === key);
    setEditingCategory(categoryToEdit);
    form.setFieldsValue(categoryToEdit);
    setIsModalVisible(true);
  };

  const saveEdit = async (values) => {
    try {
      const updatedCategory = { ...editingCategory, ...values };
      await api.patch(`/categories/${updatedCategory._id}`, updatedCategory);

      setCategories((prevCategories) =>
        prevCategories.map((category) => (category._id === updatedCategory._id ? updatedCategory : category))
      );

      setIsModalVisible(false);
      form.resetFields();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const categoryDelete = async (key) => {
    try {
      const categoryId = key;

      await api.delete(`/categories/${categoryId}`);

      // Update the category state by filtering out the deleted product
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const createCategory = async (values) => {
    try {
      const response = await api.post('/categories', values);
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating category', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formattedCategories = categories.map((category) => ({
    key: category._id,
    name: category.name,
    image: category.image,
  }));

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Category Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => (
        <a href={img} target='_blank'>
          <img src={img} width='64' />
        </a>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button type='icon' icon={<EditOutlined />} onClick={() => startEditing(record.key)}></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => categoryDelete(record.key)}>
            <Button type='icon' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Categories</h1>
      <Button type='primary' onClick={showModal}>
        Add Category
      </Button>
      <Table
        dataSource={formattedCategories}
        columns={columns}
        size='small'
        scroll={{ y: 500 }}
        pagination={{
          total: formattedCategories.length,
          showTotal: showTotal,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '500'],
        }}
        className={styles.table}
      />
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={editingCategory ? saveEdit : createCategory}>
          <Form.Item name='name' label='Category Name' rules={[{ required: true }]}>
            <Input placeholder='Category name' />
          </Form.Item>
          <Form.Item name='image' label='Category Image' rules={[{ required: true }]}>
            <Input placeholder='Paste img url...' />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default BackofficeCategories;
