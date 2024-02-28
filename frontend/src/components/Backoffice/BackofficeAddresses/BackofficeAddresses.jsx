import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './BackofficeAddresses.module.css';
import Title from 'antd/es/typography/Title';

const BackofficeAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserVisible, setIsUserVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressUser, setAddressUser] = useState([]);
  const [form] = Form.useForm();

  const getAddresses = async () => {
    return api.get('/addresses');
  };

  const getAllUsers = async () => {
    return api.get('/users');
  };

  const getAllAddresses = () => {
    getAddresses()
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  };

  const showTotal = (total) => `Total ${total} addresses`;

  useEffect(() => {
    getAllAddresses();
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }, []);

  const startEditing = (key) => {
    const addressToEdit = addresses.find((address) => address._id === key);
    setEditingAddress(addressToEdit);
    form.setFieldsValue(addressToEdit);

    const userToEdit = { label: addressToEdit?.user.username, value: addressToEdit?.user._id };

    form.setFieldValue('user', userToEdit);

    setIsModalVisible(true);
  };

  const saveEdit = async (values) => {
    try {
      const updatedAddress = { ...editingAddress, ...values };
      await api.patch(`/addresses/${updatedAddress._id}`, updatedAddress);

      setAddresses((prevAddresses) =>
        prevAddresses.map((address) => (address._id === updatedAddress._id ? updatedAddress : address))
      );

      setIsModalVisible(false);
      form.resetFields();
      setEditingAddress(null);
      getAllAddresses();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const addressDelete = async (key) => {
    try {
      const addressId = key;

      await api.delete(`/categories/${addressId}`);

      // Update the address state by filtering out the deleted address
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address._id !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const createAddress = async (values) => {
    try {
      const response = await api.post('/addresses', values);
      setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating address', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showUserModal = () => {
    setIsUserVisible(true);
  };

  const handleUserCancel = () => {
    setIsUserVisible(false);
  };

  const formattedAddresses = addresses.map((address) => ({
    key: address._id,
    user: address.user,
    street: address.street,
    country: address.country,
    postalCode: address.postalCode,
  }));

  const formUsers = users.map((user, i) => {
    return { label: users[i]?.username, value: users[i]?._id };
  });

  const showUser = (key) => {
    setAddressUser(key);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return (
          <a
            onClick={() => {
              showUser(user);
              showUserModal();
            }}
          >
            {user.username}
          </a>
        );
      },
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Postal Code',
      dataIndex: 'postalCode',
      key: 'postalCode',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button
            type='icon'
            icon={<EditOutlined />}
            onClick={() => {
              console.log('EDIT', record.key);
              startEditing(record.key);
            }}
          ></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => addressDelete(record.key)}>
            <Button type='icon' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Addresses</h1>
      <Button type='primary' onClick={showModal}>
        Add Address
      </Button>
      <Table
        dataSource={formattedAddresses}
        columns={columns}
        size='small'
        scroll={{ y: 500 }}
        pagination={{
          total: formattedAddresses.length,
          showTotal: showTotal,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '500'],
        }}
        className={styles.table}
      />
      <Modal
        title={editingAddress ? 'Edit Address' : 'Add New Address'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={editingAddress ? saveEdit : createAddress}>
          <Form.Item name='user' label='User' rules={[{ required: true }]}>
            <Select placeholder='Select user' options={formUsers} />
          </Form.Item>
          <Form.Item name='street' label='Street' rules={[{ required: true }]}>
            <Input placeholder='Enter street...' />
          </Form.Item>
          <Form.Item name='country' label='Country' rules={[{ required: true }]}>
            <Input placeholder='Enter country...' />
          </Form.Item>
          <Form.Item name='postalCode' label='Postal Code' rules={[{ required: true }]}>
            <Input placeholder='Enter postal code...' />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title='User info' closeIcon='' open={isUserVisible} footer='' onCancel={handleUserCancel}>
        <h4>User</h4>
        <p>{addressUser.username}</p>
        <h4>Email</h4>
        <p>{addressUser.email}</p>
        <h4>Role</h4>
        <p>{addressUser.role}</p>
        <h4>Newsletter</h4>
        <p>{`${addressUser.newsletter}`}</p>
      </Modal>
    </main>
  );
};

export default BackofficeAddresses;
