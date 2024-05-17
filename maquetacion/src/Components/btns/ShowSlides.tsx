import { IonRouterLink, IonCard, IonCardContent, IonNote, IonCardTitle } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import React from 'react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/pagination';

interface ShowSlidesProps {
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
    type: any[];
}

const ShowSlides: React.FC<ShowSlidesProps> = ({clases, tipo, title, type}) => {

    return(
            <div>
                <div className="text-left font-size-25 ion-padding font-bold">{title}</div>

                <div className="flex-row flex-nowrap overflow-x-auto"> 

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={0.1}
                    slidesPerView={2}
                    pagination={{ clickable: true }}
                    className='mySwiper'
                >

                    {type.map((card) => {
                        return (
                            
                            <SwiperSlide key={card._id}>
                                <IonRouterLink routerLink={`/tunebytes/${tipo}/${card._id}`}>
                            
                                    <IonCard button  className={`width-min-190 ion-main-bg ripple-color-look ${clases}`}>

                                        <img alt={`${tipo}`} src={card.url} />

                                        <IonCardContent className="ion-main-bg">
                                            <IonCardTitle className='wff-txt font-size-15 font-bold'>{card.name}</IonCardTitle>
                                            <IonNote color="medium">{card.game}</IonNote>
                                        </IonCardContent>

                                    </IonCard>
                                    
                                </IonRouterLink>
                            </SwiperSlide>

                        );
                    })};

                </Swiper>

                </div>
            </div>
    );
};

export default ShowSlides;