import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './backofficeUsers.module.css';

const BackofficeUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const getAllUsers = async () => {
    return api.get('/users');
  };

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log('Error!');
      });
  }, []);

  const userDelete = async (key) => {
    try {
      const userId = key;

      await api.delete(`/users/${userId}`);

      // Update the users state by filtering out the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const createUser = async (values) => {
    try {
      const response = await api.post('/users', values);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  const startEditing = (key) => {
    const userToEdit = users.find((user) => user._id === key);
    setEditingUser(userToEdit);
    form.setFieldsValue(userToEdit);
    setIsModalVisible(true);
  };

  const saveEdit = async (values) => {
    try {
      const updatedUser = { ...editingUser, ...values };
      await api.patch(`/users/${updatedUser._id}`, updatedUser);

      setUsers((prevUsers) => prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user)));

      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  const formattedUsers = users.map((user) => ({
    key: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  }));

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },

    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 80,
      render: (_, record) => (
        <>
          <Button type='icon' icon={<EditOutlined />} onClick={() => startEditing(record.key)}></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => userDelete(record.key)}>
            <Button type='icon' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Users</h1>
      <Button type='primary' onClick={showModal}>
        Add User
      </Button>
      <Table
        dataSource={formattedUsers}
        columns={columns}
        size='small'
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
        className={styles.table}
      />
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} initialValues={{ role: 'user' }} onFinish={editingUser ? saveEdit : createUser}>
          <Form.Item name='username' label='Username' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {editingUser ? (
            ''
          ) : (
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item name='role' label='Role' rules={[{ required: true }]}>
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: 'user',
                  label: 'User',
                },
                {
                  value: 'admin',
                  label: 'Admin',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default BackofficeUsers;
