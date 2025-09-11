import axios from 'axios';
import { useState, useEffect } from 'react'; // useEffect 추가
import HomeList from '../components/homepage/HomeList';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './HomePage.css';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const HomePage = ({lists}) => {

    return (
        <div id="HomePage">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="home-swiper"
            >
                {lists.map((item) => (
                    <SwiperSlide key={item.id}>
                        <HomeList lists={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomePage;