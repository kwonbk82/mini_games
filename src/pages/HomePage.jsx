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
import { useParams } from 'react-router-dom';

const HomePage = () => {
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const [lists, setLists] = useState([]);


    const fetchGame = async () => {
        try {
            const res = await axios.get('/data/minigames.json');
            setLists(res.data);
        } catch (e) {
            console.error('데이터 로딩 실패 :', e); // console.e를 console.error로 수정
        } finally {
            setIsReady(true);
        }
    };

    useEffect(() => {
        fetchGame();
    }, []);

    if (!isReady) {
        return <div>로딩 중...</div>;
    }

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