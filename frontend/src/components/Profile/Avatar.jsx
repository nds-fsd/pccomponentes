import React from 'react';
import styles from './avatar.module.css';

const Avatar = ({ username }) => {
  const getInitials = (name) => {
    if (!name) return '';
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  };

  return (
    <div className={styles.avatar}>
      <span>{getInitials(username)}</span>
    </div>
  );
};

export default Avatar;
