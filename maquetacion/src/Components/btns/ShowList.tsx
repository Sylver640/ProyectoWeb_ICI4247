import { IonCardContent, IonList, IonItem, IonThumbnail, IonLabel ,IonRouterLink} from '@ionic/react';
import React from 'react';

interface ShowListProps{
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
    type: any[];
}

const ShowList: React.FC<ShowListProps> = ({clases, tipo, title, type}) => {

    return(
        <div>
        <div className="text-center font-size-25 ion-padding">{title}</div>

        <IonCardContent className="main-bg">
            <IonList inset={true} className="main-bg">

                {type.map((card) => {
                    return(
                    <IonRouterLink key={card._id} routerLink={`/tunebytes/${tipo}/${card._id}`}> 
                        <IonItem button={true} className={`ion-padding ion-border-circle-15 ion-border-transparent ripple-color-look ${clases}`}>
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src={card.url} />
                            </IonThumbnail>
                            <IonLabel>{card.name}</IonLabel>
                        </IonItem>
                    </IonRouterLink>
                    );
                })}
            </IonList>
        </IonCardContent>
    </div>
    ); 
};

export default ShowList;