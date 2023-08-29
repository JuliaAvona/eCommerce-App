import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Product } from '../../types/interfaces';
import styles from './Slider.module.css';

const Slider = ({ name, variants, masterVariant }: Product) => {
  let sliderElements: JSX.Element[] = [
    <SwiperSlide className={styles.slide} key={masterVariant.images[0].url}>
      <img className={styles.img} src={masterVariant.images[0].url} alt={name['en-US']} />
    </SwiperSlide>,
  ];
  if (masterVariant.images.length !== 0) {
    sliderElements = masterVariant.images.map((el) => (
      <SwiperSlide className={styles.slide} key={el.url}>
        <img className={styles.img} src={el.url} alt={name['en-US']} />
      </SwiperSlide>
    ));
  }

  return (
    <Swiper navigation modules={[Navigation]} className="mySwiper">
      {sliderElements}
    </Swiper>
  );
};

export default Slider;
