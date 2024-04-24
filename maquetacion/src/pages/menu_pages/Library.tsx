import React from 'react';
import { IonContent, IonImg, IonIcon, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import {cards} from "../../Data/cards";

import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

{/* Libreria aun sin maquetar */} 
const library = () => {
    return (
        <IonContent>
            <div>
                <div className="ion-padding flex-row align-center flex-between">
                    <IonAvatar className='icon-mid'>
                            <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                    
                    <div className="font-size-25 font-bold">Your Library</div>

                    <IonButton className='ion-main-look ion-border-circle' size='small'><IonIcon icon={addCircleOutline} size="large"></IonIcon></IonButton>
                </div>

                <div className="flex-row gap-15-px ion-padding">
                    <IonButton className='ion-main-look ion-border-circle'>Playlists</IonButton>
                    <IonButton className='ion-main-look ion-border-circle'>Albums</IonButton>
                    <IonButton className='ion-main-look ion-border-circle'>Artists</IonButton>
                </div>

                <div>    
                    <IonCardContent className="ion-main-bg">
                        <IonList className="ion-main-bg padding-0">

                            {cards.map((card) => {
                                return(
                                    <IonItem key={card.id} button={true} className='ion-main-bg ion-border-main ripple-color-look'>
                                        <IonThumbnail slot="start">
                                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                        </IonThumbnail>
                                        <IonLabel>{card.libreria}</IonLabel>
                                    </IonItem>
                                    );
                                })}

                        </IonList>
                    </IonCardContent>
                </div>
            </div>
        </IonContent>
    );
}

export default library;