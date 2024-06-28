import { IonImg } from '@ionic/react';
import { useHistory } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import React from 'react';

// Import de los themes css
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// ========================================================================
// Componente de la lista de canciones
interface ShowListProps{
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
    type: any[];
}
// ========================================================================


// ========================================================================
// Componente de la lista de canciones
const showTop: React.FC<ShowListProps> = ({clases, tipo, title, type}) => {

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
            <div className="text-center font-size-25 ion-padding font-bold">{title}</div>

            {/* Swiper */}
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
                    
                {/* Mapeo de las cartas */}
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