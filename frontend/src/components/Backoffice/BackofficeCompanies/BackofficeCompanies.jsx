import { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { api } from '../../../_utils/api';
import styles from './BackofficeCompanies.module.css';

const BackofficeCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [form] = Form.useForm();

  const getAllCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data);
    } catch (error) {
      console.log('Error fetching companies:', error);
    }
  };

  const showTotal = (total) => `Total ${total} companies`;

  useEffect(() => {
    getAllCompanies();
  }, []);

  const startEditing = (key) => {
    const companyToEdit = companies.find((company) => company._id === key);
    setEditingCompany(companyToEdit);
    form.setFieldsValue(companyToEdit);
    setIsModalVisible(true);
  };

  const saveEdit = async (values) => {
    try {
      const updatedCompany = { ...editingCompany, ...values };
      await api.patch(`/companies/${updatedCompany._id}`, updatedCompany);

      setCompanies((prevCompanies) =>
        prevCompanies.map((order) => (order._id === updatedCompany._id ? updatedCompany : order))
      );

      setIsModalVisible(false);
      form.resetFields();
      setEditingCompany(null);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const companyDelete = async (key) => {
    try {
      const companyId = key;
      await api.delete(`/companies/${companyId}`);
      setCompanies((prevCompanies) => prevCompanies.filter((company) => company._id !== companyId));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const createCompany = async (values) => {
    try {
      const response = await api.post('/companies', values);
      setCompanies((prevCompanies) => [...prevCompanies, response.data]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formattedCompanies = companies.map((company) => ({
    key: company._id,
    name: company.name,
    phoneNumber: company.phoneNumber,
    socials: company.socials,
    email: company.email,
  }));

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Socials',
      dataIndex: 'socials',
      key: 'socials',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button type='icon' icon={<EditOutlined />} onClick={() => startEditing(record.key)}></Button>
          <Popconfirm title='Sure to delete?' onConfirm={() => companyDelete(record.key)}>
            <Button type='icon' icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Companies</h1>
      <Button type='primary' onClick={showModal}>
        Add Company
      </Button>
      <Table
        dataSource={formattedCompanies}
        columns={columns}
        size='small'
        scroll={{ y: 500 }}
        pagination={{
          total: formattedCompanies.length,
          showTotal: showTotal,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '500'],
        }}
        className={styles.table}
      />

      <Modal
        title={editingCompany ? 'Edit Company' : 'Add New Company'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={editingCompany ? saveEdit : createCompany}>
          <Form.Item name='name' label='Company Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='phoneNumber' label='Phone Number' rules={[{ required: true, type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name='socials' label='Socials'>
            <Input />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};

export default BackofficeCompany;
