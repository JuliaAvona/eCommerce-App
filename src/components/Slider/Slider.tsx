import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import 'swiper/css';
import { Product } from '../../types/interfaces';

const Slider = ({ name, variants }: Product) => {
  const sliderElements = variants.map((el) => (
    <SwiperSlide key={el.images[0].url}>
      <img src={el.images[0].url} alt={name['en-US']} />
    </SwiperSlide>
  ));

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {sliderElements}
    </Swiper>
  );
};

export default Slider;
