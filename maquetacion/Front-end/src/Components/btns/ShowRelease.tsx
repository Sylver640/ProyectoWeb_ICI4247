import { IonCard} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';

// ========================================================================
// Componente de la lista de canciones
interface Song{
    _id: string,
    name: string,
    duration: string,
    duration_ms: number,
    url: string,
    game: string,
    game_id: string
}
// ========================================================================

// ========================================================================
// Componente de la lista de canciones
interface ShowReleaseProps {
    type: 'games' | 'songs';
    data: Song;
}
// ========================================================================

// ========================================================================
// Componente de la lista de canciones
const ShowRelease: React.FC<ShowReleaseProps> = ({type, data}) => {

    // Llamar a la constante de la historia
    const history = useHistory();

    // ========================================================================
    // Función para navegar
    const handleNavigate = (dataId: string) => {{
        history.push(`/tunebytes/${type}/${dataId}`);
    }}
    // ========================================================================

    // ========================================================================
    // Renderizado del componente
    if(!data){return null;}

    // ========================================================================
    // Renderizado del componente
    return(
        
        // ========================================================================
        <div className="flex-column flex-between width-100-pe ion-padding gap-15-px">

            {/* Título */}
            <div className="text-center font-bold font-size-25 ion-padding">New Release</div>

            {/* Mapeo de las canciones */}
             <div key={data._id} onClick={() => handleNavigate(data._id)}>
                
               <IonCard button className="ion-main-border ion-border-circle-15 text-center height-320 ripple-color-look">
                    <img alt="Silhouette of mountains" src={data.url} />
                </IonCard>

            </div> 
        </div>

    );

};

export default ShowRelease;