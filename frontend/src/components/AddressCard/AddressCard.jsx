import React, { useState } from 'react';
import { api } from '../../_utils/api';

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

  return (
    <div>
      {editing ? (
        <div>
          <input
            type='text'
            value={editedAddress.street}
            onChange={(e) => setEditedAddress({ ...editedAddress, street: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <p>Street: {address.street}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
