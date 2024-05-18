import { IonRouterLink, IonImg, IonTitle } from '@ionic/react';
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
                            <IonRouterLink routerLink={`/tunebytes/${tipo}/${card._id}`}>
                                <IonImg alt={`${tipo}`} src={card.url}/>
                                <p className='wf5-txt'>{`${card.name}`}</p>
                            </IonRouterLink>
                        </SwiperSlide>
                    );
                })}

            </Swiper>

        </div>
    ); 
};

export default showTop;