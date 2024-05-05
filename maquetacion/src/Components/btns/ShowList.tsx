import { IonCardContent, IonList, IonItem, IonThumbnail, IonLabel ,IonRouterLink} from '@ionic/react';
import {cards} from '../../Data/cards';
import React from 'react';

interface ShowListProps{
    clases?: string;
    tipo: 'games' | 'songs';
    title?: string;
}

const ShowList: React.FC<ShowListProps> = ({clases, tipo, title}) => {

    return(
        <div>
        <div className="text-center font-size-25 ion-padding">{title}</div>

        <IonCardContent className="main-bg">
            <IonList inset={true} className="main-bg">

                {cards.map((card) => {
                    return(
                    <IonRouterLink key={card.id} routerLink={`/tunebytes/${tipo}/${card.id}`}> 
                        <IonItem button={true} className={`ion-padding ion-border-circle-15 ion-border-transparent ripple-color-look ${clases}`}>
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                            </IonThumbnail>
                            <IonLabel>{`${tipo} : ${card.title}`}</IonLabel>
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