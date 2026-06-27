import React from 'react';
import './style/Confirmdialog.css';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <div className="confirm-icon">🌙</div>
        <h3>{title || 'Emin misiniz?'}</h3>
        <p>{message || 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?'}</p>
        <div className="confirm-actions">
          <button className="confirm-cancel" onClick={onCancel}>
            {cancelText || 'Hayır, Vazgeç'}
          </button>
          <button className="confirm-ok" onClick={onConfirm}>
            {confirmText || 'Evet, Devam Et'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;