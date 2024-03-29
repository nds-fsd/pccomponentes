import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload as AntUpload } from 'antd';
import axios from 'axios';
import { api } from '../../_utils/api';

const apiCloudinary = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/computech/image/upload`,
  headers: {
    'Content-type': 'multipart/form-data',
  },
  timeout: 10000,
});

const CloudinaryAntUpload = ({ productId }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const cloudinaryUpload = async (file) => {
    const responseGet = await api.get(`/products/${productId}`);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset_computech');

    try {
      const res = await apiCloudinary.post('', formData);
      const response = await api.patch(`/products/${productId}`, {
        image: [...responseGet.data.image, res.data.secure_url],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const addedFile = newFileList[newFileList.length - 1];
    if (addedFile && !addedFile.url && addedFile.status === 'done') {
      await cloudinaryUpload(addedFile.originFileObj);
    }
  };

  return (
    <>
      <AntUpload
        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : (
          <div>
            <PlusOutlined />
            <div>Upload</div>
          </div>
        )}
      </AntUpload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CloudinaryAntUpload;
