import { IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import React from 'react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


interface ShowListProps{
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
    type: any[];
}

const showTop: React.FC<ShowListProps> = ({clases, tipo, title, type}) => {
    const history = useHistory();


    const handleNavigate = (cardId: string) => {{
        history.push(`/tunebytes/${tipo}/${cardId}`);
    }}

    return(
        <div>

            <div className="text-center font-size-25 ion-padding font-bold">{title}</div>

            <Swiper
                modules={[EffectCoverflow, Pagination]}
                effect={'coverflow'}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                className='mySwiper'
            >

                {type.map((card) => {
                    return(
                        <SwiperSlide key={card._id}>
                            <div onClick={() => handleNavigate(card._id)}>
                                <IonImg alt={`${tipo}`} src={card.url}/>
                                <p className='wf5-txt'>{`${card.name}`}</p>
                            </div>
                        </SwiperSlide>
                    );
                })}

            </Swiper>

        </div>
    ); 
};

export default showTop;