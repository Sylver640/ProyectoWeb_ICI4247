import React from "react";
import { 
    IonContent, 
    IonHeader,  
    IonCard, 
    IonCardSubtitle, 
    IonCardHeader, 
    IonCardTitle, 
    IonImg, 
    IonCardContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonIcon
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import {cards} from "../../Data/cards";
import {logoBitcoin} from 'ionicons/icons';

import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Home = () => {
    return (
        <IonContent fullscreen={true}>

            <IonHeader translucent={true} className="fixed">

                {/* Logo de la aplicacion, por ahora es la del bitcoin */}
                {/* Foto de perfil del usuario, por ahora es uno generico */}
                <div className="flex-row flex-between align-center height-auto top-0 opaque-bg width-100-pe ion-padding">
                    <IonIcon icon={logoBitcoin} size="large"></IonIcon>
                    <IonAvatar className="icon-min width-max height-max">
                        <IonImg className="width-max height-max" src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                </div>
                
            </IonHeader>

            {/* Contenido del home */}
            <IonContent scrollX={true}>

                {/* Mostrando una caja naranja */}
                <div className="width-100-pe main-look height-120"></div>

                <div className="ion-padding">
                    <div className="flex-column flex-between width-100-pe gap-15-px">

                        {/* Mensaje de bienvenida al usuario */}
                        <div className="flex-row flex-start align-center gap-3-vw">
                            <IonAvatar className="flex-row flex-center align-center icon-mid width-max height-max">
                                <IonImg className="width-max height-max" src="https://www.w3schools.com/howto/img_avatar.png" />
                            </IonAvatar>
                            <div className="text-left font-25 ion-padding">Welcome User !!</div>
                        </div>

                        {/* Recomendaciones para el usuario, en el futuro tendra mas protagonismo*/}
                        <div className="flex-column">

                            <div className="text-left font-size-25 ion-padding">Recomendations</div>

                            {/* Aqui se mostraran la musica recomendada */}
                            <div className="flex-row flex-nowrap overflow-x-auto"> 

                                {cards.map((card) => {
                                    return(
                                    <IonCard key={card.id} className="ion-r29-bg ion-wf5-txt ion-margin text-center width-min-110 height-110">
                                        <IonCardHeader>
                                            <IonCardTitle>{card.title}</IonCardTitle>
                                            <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
                                        </IonCardHeader>
                                    </IonCard>
                                );
                                })}

                        </div>
                            
                            {/* Nuevo album salido o insertado dentro de la aplicacion */}
                            <div className="flex-column flex-between width-100-pe ion-padding gap-15-px">
                                <div className="text-center font-size-25 ion-padding">New Release</div>
                                <IonCard className="ion-r29-bg ion-border-circle-15 text-center height-320">
                                    <IonCardTitle>Album</IonCardTitle>
                                </IonCard>
                            </div>
                            
                            {/* Top Tracks mas escuchados de la plataforma */}
                            <div>
                                <div className="text-center font-size-25 ion-padding">Top Tracks</div>

                                <IonCardContent className="main-bg">
                                    <IonList inset={true} className="main-bg">

                                        {cards.map((card) => {
                                            return(
                                                <IonItem key={card.id} button={true} className="ion-padding ion-border-circle-15 ion-border-transparent ripple-color-look">
                                                    <IonThumbnail slot="start">
                                                        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                                    </IonThumbnail>
                                                    <IonLabel>{card.title}</IonLabel>
                                                </IonItem>
                                            );
                                        })}
                                    </IonList>
                                </IonCardContent>
                            </div>
                            
                            {/* Soundtracks de videojuegos */}
                            <div className="flex-column">

                                <div className="text-center font-size-25 ion-padding ion-padding">Game soundtracks</div>

                                    <div className="flex-row flex-nowrap overflow-x-auto">

                                        {cards.map((card) => {
                                            return(
                                                <IonCard key={card.id} className="width-min-110 height-110 border-circle text-center">
                                                    <IonCardHeader>
                                                        <IonCardTitle>{card.game}</IonCardTitle>
                                                    </IonCardHeader>
                                                </IonCard>
                                            );
                                        })}

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </IonContent>
        </IonContent>
    );
}

export default Home;