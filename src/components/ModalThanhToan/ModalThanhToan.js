import React from 'react';
import './ModalThanhToan.scss'; // Import CSS

const ModalThanhToan = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ModalThanhToan-overlay">
      <div className="ModalThanhToan-container">
        <div className="ModalThanhToan-header">
          <h2>Thông tin chi tiết</h2>
          <button className="ModalThanhToan-close-button" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="ModalThanhToan-body">{children}</div>
        <div className="ModalThanhToan-footer">
          <button className="ModalThanhToan-action-button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalThanhToan;
