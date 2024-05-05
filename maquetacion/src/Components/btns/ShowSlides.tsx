import { IonCard, IonCardHeader, IonCardTitle, IonRouterLink, IonNote, IonLabel} from '@ionic/react';
import React from 'react';

interface ShowSlidesProps {
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
    type: any[];
}

const ShowSlides: React.FC<ShowSlidesProps> = ({clases, tipo, title, type}) => {

    return(
            <div>
                <div className="text-left font-size-25 ion-padding">{title}</div>

                <div className="flex-row flex-nowrap overflow-x-auto"> 

                    {type.map((card) => {
                        return(
                            <IonRouterLink key={card._id} routerLink={`/tunebytes/${tipo}/${card._id}`}> 
                                <IonCard button  className={`width-min-190 ion-main-bg ripple-color-look ${clases}`}>
                                    <img alt="Silhouette of mountains" src={card.url} />
                                    <IonCardHeader className="ion-main-bg">
                                        <IonLabel className='wff-txt font-size-15 font-bold'>{card.name}</IonLabel>
                                        <IonNote color="medium">{card.game}</IonNote>
                                    </IonCardHeader>
                                </IonCard>
                            </IonRouterLink>  
                    );
                    })}

                </div>
            </div>
    );
};

export default ShowSlides;