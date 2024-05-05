import React, { useState, useEffect } from "react";
import { 
    IonContent, 
    IonHeader,  
    IonImg, 
    IonIcon,
    IonMenu,
    IonMenuButton,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonRouterLink
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import {logoBitcoin} from 'ionicons/icons';
import axios from 'axios';

// Import de los componentes
import ShowSlides from '../../Components/btns/ShowSlides';
import ShowRelease from "../../Components/btns/ShowRelease";
import ShowList from "../../Components/btns/ShowList";

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Home = () => {

    // Data de canciones
    const [songs, setSongs] = useState<any>([]);

    // Variables para axios get de songs
    var options = {
        method: 'GET',
        url: 'http://localhost:3000/songs?limit=5',
      };

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.request(options);
                setSongs(response.data.songs);
            }catch(error){
                console.error('Error fetching Data: ',error);
            };
        }

        fetchData();
    }, []);

    return (
        <>  
            {/* Menu de la aplicacion */}
            <IonMenu side="end" contentId="main-content">
                
                {/* Header del menu */}
                <IonHeader>
                    <div className="flex-row align-center ion-padding gap-15-px">
                        <IonAvatar className="icon-mid width-max height-max">
                            <IonImg className="width-max height-max" src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>
                        <IonLabel className="font-bold">User</IonLabel>
                    </div>
                </IonHeader>

                {/* Contenido del menu */}
                <IonContent>
                    <IonList lines="none" className="padding-0">

                        <IonItem button className="ion-main-bg ripple-color-look">
                            <IonLabel className="font-bold">View perfil</IonLabel>
                        </IonItem>

                        <IonRouterLink routerLink="/settings">
                            <IonItem button className="ion-main-bg ripple-color-look">
                                <IonLabel className="font-bold">Settings</IonLabel>
                            </IonItem>
                        </IonRouterLink>

                        <IonItem button className="ion-main-bg ripple-color-look">
                            <IonLabel className="font-bold">Log out</IonLabel>
                        </IonItem>

                    </IonList>
                </IonContent>

            </IonMenu>


            {/* Contenido del home */}
            <IonContent fullscreen={true} id="main-content">

                <IonHeader translucent={true} className="fixed">

                    {/* Logo de la aplicacion, por ahora es la del bitcoin */}
                    {/* Foto de perfil del usuario, por ahora es uno generico */}
                    <div className="flex-row flex-between align-center opaque-bg ion-padding">
                        <IonIcon icon={logoBitcoin} size="large"></IonIcon>
                        <IonButton slot="start" className="ion-border-circle ion-main-bg ion-txt-look ripple-color-look icon-min"><IonMenuButton /></IonButton>
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

                                {/* Aqui se mostraran la musica recomendada */}
                                <ShowSlides clases="border-circle-15" tipo="songs" title="Recomendations" type={songs}/>

                                {/* Nuevo album salido o insertado dentro de la aplicacion */}
                                <ShowRelease />
                                
                                {/* Top Tracks mas escuchados de la plataforma */}
                                <ShowList tipo="songs" title="Top Tracks"/>
                                
                                {/* Soundtracks de videojuegos */}
                                <ShowSlides clases="border-circle-15" tipo="games" title="Game sountracks" type={songs}/>
                            
                            </div>
                        </div>
                    </div>

                </IonContent>
            </IonContent>
        </>
    );
}

export default Home;