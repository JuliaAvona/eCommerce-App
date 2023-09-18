import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import styles from './Slider.module.css';

interface ISlider {
  images: Array<{ url: string }>;
}

const Slider = ({ images }: ISlider) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <>
      <Carousel data-bs-theme="dark">
        {images.map((img: { url: string }) => {
          return (
            <Carousel.Item className={styles.item} interval={3000} key={img.url} onClick={() => handleClick()}>
              <Image src={img.url} className={styles.img} alt="Product" fluid />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Modal show={show} onHide={handleClick}>
        <Modal.Body>
          <Carousel data-bs-theme="dark">
            {images.map((img: { url: string }) => {
              return (
                <Carousel.Item className={styles.item} key={img.url}>
                  <Image src={img.url} className={styles.img} alt="Product" fluid />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Slider;
