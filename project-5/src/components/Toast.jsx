import React from 'react';
import { IconCheck } from './Icons';

export const Toast = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="toast-container">
      <div className="toast-pill">
        <div className="toast-icon">
          <IconCheck size={16} />
        </div>
        <span className="toast-text">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
