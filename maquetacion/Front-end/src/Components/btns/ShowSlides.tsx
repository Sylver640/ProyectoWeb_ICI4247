import { IonCard, IonCardContent, IonNote, IonCardTitle } from '@ionic/react';
import { useHistory } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import React from 'react';

// Import de los themes css
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/pagination';

// ========================================================================
// Componente de la lista de canciones
interface ShowSlidesProps {
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
    type: any[];
    spaceBetween: number;
    SlidesPerView: number;
}
// ========================================================================

// ========================================================================
// Componente de la lista de canciones
const ShowSlides: React.FC<ShowSlidesProps> = ({clases, tipo, title, type, spaceBetween, SlidesPerView}) => {

    // Llamar a la constante de la historia
    const history = useHistory();

    // ========================================================================
    // Función para navegar
    const handleNavigate = (cardId: string) => {{
        history.push(`/tunebytes/${tipo}/${cardId}`);
    }}
    // ========================================================================

    // ========================================================================
    // Renderizado del componente
    return(
            <div>

                {/* Título */}
                <div className="text-left font-size-25 ion-padding font-bold">{title}</div>

                {/* Swiper */}
                <div className="flex-row flex-nowrap overflow-x-auto"> 

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={spaceBetween}
                    slidesPerView={SlidesPerView}
                    pagination={{ clickable: true }}
                    className='mySwiper'
                >
                    
                    {/* Mapeo de las canciones */}
                    {type.map((card) => {
                        return (
                            
                            <SwiperSlide key={card._id}>
                                <div onClick={() => handleNavigate(card._id)}>
                                    <IonCard button  className={`width-min-190 ion-main-bg ripple-color-look ${clases}`}>

                                        <img alt={`${tipo}`} src={card.url} />

                                        <IonCardContent className="ion-main-bg">
                                            <IonCardTitle className='wff-txt font-size-15 font-bold'>{card.name}</IonCardTitle>
                                            <IonNote color="medium">{card.game}</IonNote>
                                        </IonCardContent>

                                    </IonCard>
                                </div>
                            </SwiperSlide>

                        );
                    })};

                </Swiper>

                </div>
            </div>
    );
};

export default ShowSlides;