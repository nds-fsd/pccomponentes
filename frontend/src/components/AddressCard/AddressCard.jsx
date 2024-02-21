import React, { useState } from 'react';
import { api } from '../../_utils/api';
import styles from './addressCard.module.css';

const AddressCard = ({ address }) => {
  const [editing, setEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState({ ...address });

  const handleEdit = async () => {
    try {
      const response = await api.patch(`/addresses/${address._id}`, editedAddress);
      console.log('Address updated:', response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/addresses/${address._id}`);
      console.log('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const openModal = () => {
    setEditing(true);
  };

  const closeModal = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <label>
              Street:
              <input
                type='text'
                value={editedAddress.street}
                onChange={(e) => setEditedAddress({ ...editedAddress, street: e.target.value })}
              />
            </label>
            <label>
              Country:
              <input
                type='text'
                value={editedAddress.country}
                onChange={(e) => setEditedAddress({ ...editedAddress, country: e.target.value })}
              />
            </label>
            <label>
              Postal Code:
              <input
                type='text'
                value={editedAddress.postalCode}
                onChange={(e) => setEditedAddress({ ...editedAddress, postalCode: e.target.value })}
              />
            </label>
            <button onClick={handleEdit}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <p>Street: {address.street}</p>
          <p>Country: {address.country}</p>
          <p>Postal Code: {address.postalCode}</p>
          <button onClick={openModal}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
