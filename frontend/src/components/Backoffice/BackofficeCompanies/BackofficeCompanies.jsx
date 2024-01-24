import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Modal, Form, Input, Space } from 'antd';
// import { runes } from 'runes2';
import { api } from '../../../_utils/api';
import styles from './BackofficeCompanies.module.css';

const BackofficeCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data);
    } catch (error) {
      console.log('Error fetching companies:', error);
    }
  };

  const handleDelete = async (key) => {
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

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text) => <a>{text}</a>,
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
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        companies.length >= 1 ? (
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record._id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <main className={styles.main}>
      <h1>Companies</h1>
      <Button type='primary' onClick={showModal}>
        Add Company
      </Button>
      <Table dataSource={companies} columns={columns} />

      <Modal title='Add New Company' open={isModalVisible} onCancel={handleCancel} onOk={() => form.submit()}>
        <Form form={form} onFinish={createCompany}>
          <Form.Item name='companyName' label='Company Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='phoneNumber' label='Phone Number' rules={[{ required: true, type: 'number' }]}>
            <Space.Compact>
              <Input
                style={{
                  width: '20%',
                }}
                defaultValue='+34'
              />
              <Input
                style={{
                  width: '80%',
                }}
                count={{
                  show: true,
                  max: 9,
                  strategy: (txt) => runes(txt).length,
                  exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                }}
                onKeyUp={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Space.Compact>
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
