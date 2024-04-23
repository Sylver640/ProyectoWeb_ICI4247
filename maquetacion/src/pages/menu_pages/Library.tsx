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
                <div className="contenedor-header-library">
                    <IonAvatar>
                            <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                    
                    <div id="library-text">Your Library</div>

                    <IonButton id="agregar"><IonIcon icon={addCircleOutline} id="agregar-icon" size="large"></IonIcon></IonButton>
                </div>

                <div className="contenedor-opciones">
                    <IonButton>Playlists</IonButton>
                    <IonButton>Albums</IonButton>
                    <IonButton>Artists</IonButton>
                </div>

                <div className="contenedor-songs">    
                    <IonCardContent className="search-list">
                        <IonList className="search-list">

                            {cards.map((card) => {
                                return(
                                    <IonItem key={card.id} button={true}>
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