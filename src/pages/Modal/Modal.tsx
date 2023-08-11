import React from 'react';
import './Modal.css';

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'modal active' : 'active'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal__content active' : 'active'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
