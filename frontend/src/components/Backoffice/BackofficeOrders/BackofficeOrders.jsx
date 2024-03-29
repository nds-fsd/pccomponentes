import { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, Select, Tag } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SendOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './BackofficeOrders.module.css';

const BackofficeOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserVisible, setIsUserVisible] = useState(false);
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderOwner, setOrderOwner] = useState([]);
  const [productOrder, setProductOrder] = useState([]);
  const [form] = Form.useForm();

  const getAllOrders = async () => {
    return api.get('/orders');
  };

  const showTotal = (total) => `Total ${total} orders`;

  useEffect(() => {
    getAllOrders()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }, []);

  const startEditing = (key) => {
    const orderToEdit = orders.find((order) => order._id === key);
    setEditingOrder(orderToEdit);
    form.setFieldsValue(orderToEdit);
    setIsModalVisible(true);
  };

  const saveEdit = async (values) => {
    try {
      const updatedOrder = { ...editingOrder, ...values };
      await api.patch(`/orders/${updatedOrder._id}`, updatedOrder);

      setOrders((prevOrders) => prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)));

      setIsModalVisible(false);
      form.resetFields();
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const orderDelete = async (key) => {
    try {
      const orderId = key;

      await api.delete(`/categories/${orderId}`);

      // Update the order state by filtering out the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const createOrder = async (values) => {
    try {
      const response = await api.post('/orders', values);
      setOrders((prevOrders) => [...prevOrders, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating order', error);
    }
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

  const showProductModal = () => {
    setIsProductVisible(true);
  };

  const handleProductCancel = () => {
    setIsProductVisible(false);
  };

  const formattedOrder = orders.map((order) => ({
    key: order._id,
    user: order.user,
    products: order.products,
    address: order.address,
    status: order.status,
  }));

  const showUser = (key) => {
    setOrderOwner(key);
  };

  const showProduct = (key) => {
    setProductOrder(key);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Username',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return (
          <a
            key={user.key}
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
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products) =>
        products.map((product) => {
          return (
            <div key={product.key}>
              <a
                key={product._id}
                onClick={() => {
                  showProduct(product);
                  showProductModal();
                }}
              >
                {product.name}
              </a>
              <br />
            </div>
          );
        }),
    },
    {
      title: 'Address ID',
      dataIndex: 'address',
      key: 'address',
      render: (addressId) => (
        <div key={addressId.key}>
          <p>{addressId.street}</p>
          <p>
            {addressId.country} {addressId.postalCode}
          </p>
        </div>
      ),
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let capitalizedStatus = capitalizeFirstLetter(status);
        switch (status) {
          case 'created':
            return <Tag icon={<ClockCircleOutlined />}>{capitalizedStatus}</Tag>;
          case 'preparing':
            return (
              <Tag icon={<SyncOutlined />} color='#fc9403'>
                {capitalizedStatus}
              </Tag>
            );
          case 'sent':
            return (
              <Tag icon={<SendOutlined />} color='#4261e1'>
                {capitalizedStatus}
              </Tag>
            );
          case 'delivered':
            return (
              <Tag icon={<CheckCircleOutlined />} color='#22965c'>
                {capitalizedStatus}
              </Tag>
            );
          case 'cancelled':
            return (
              <Tag icon={<CloseCircleOutlined />} color='#e72513'>
                {capitalizedStatus}
              </Tag>
            );
        }
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button type='icon' icon={<EditOutlined />} onClick={() => startEditing(record.key)}></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => orderDelete(record.key)}>
            <Button type='icon' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main className={styles.main}>
      <h1>Orders</h1>
      <Table
        dataSource={formattedOrder}
        columns={columns}
        size='small'
        scroll={{ y: 500 }}
        pagination={{
          total: formattedOrder.length,
          showTotal: showTotal,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '500'],
        }}
        className={styles.table}
      />
      <Modal
        title={editingOrder ? 'Edit Order' : 'Add New Order'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={editingOrder ? saveEdit : createOrder}>
          <Form.Item name='status' label='Status' rules={[{ required: true }]}>
            <Select
              style={{ width: 120 }}
              options={[
                {
                  value: 'created',
                  label: 'Created',
                },
                {
                  value: 'preparing',
                  label: 'Preparing',
                },
                {
                  value: 'sent',
                  label: 'Sent',
                },
                {
                  value: 'delivered',
                  label: 'Delivered',
                },
                {
                  value: 'cancelled',
                  label: 'Cancelled',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title='User info' closeIcon='' open={isUserVisible} footer='' onCancel={handleUserCancel}>
        <h4>User</h4>
        <p>{orderOwner.username}</p>
        <h4>Email</h4>
        <p>{orderOwner.email}</p>
        <h4>Role</h4>
        <p>{orderOwner.role}</p>
        <h4>Newsletter</h4>
        {orderOwner.newsletter ? <p>✅</p> : <p>❌</p>}
      </Modal>
      <Modal title='Product info' closeIcon='' open={isProductVisible} footer='' onCancel={handleProductCancel}>
        <h4>Product Name</h4>
        <p>{productOrder.name}</p>
        <h4>Description</h4>
        <p>{productOrder.description}</p>
        <h4>Brand</h4>
        <p>{productOrder.brand}</p>
        <h4>Stock</h4>
        <p>{productOrder.stock}</p>
        <h4>Price</h4>
        {productOrder.sale ? (
          <>
            <del>{productOrder.price}€</del>
            <p>{productOrder.sale}€</p>
          </>
        ) : (
          <p>{productOrder.price}€</p>
        )}
      </Modal>
    </main>
  );
};

export default BackofficeOrders;
