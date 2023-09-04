/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalImg.module.css';
import Slider from '../Slider/Slider';
import { Product } from '../../types/interfaces';

const ModalImg = (prod: Product) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className={styles.btn}>
        <Button variant="outline-secondary" size="sm" onClick={handleShow}>
          🔎
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Eco </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Slider {...prod} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalImg;
