import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import 'swiper/css';
import { Product } from '../../types/interfaces';
import styles from './Slider.module.css';
import 'swiper/css/pagination';

const Slider = ({ name, variants, masterVariant }: Product) => {
  let sliderElements: JSX.Element[] = [
    <SwiperSlide className={styles.slide} key={masterVariant.images[0].url}>
      <img className={styles.img} src={masterVariant.images[0].url} alt={name['en-US']} />
    </SwiperSlide>,
  ];
  if (variants.length !== 0) {
    sliderElements = variants.map((el) => (
      <SwiperSlide className={styles.slide} key={el.images[0].url}>
        <img className={styles.img} src={el.images[0].url} alt={name['en-US']} />
      </SwiperSlide>
    ));
  }

  return (
    <Swiper
      spaceBetween={3}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {sliderElements}
    </Swiper>
  );
};

export default Slider;
