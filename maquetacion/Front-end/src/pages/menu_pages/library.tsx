import React from "react";
import { IonContent, IonImg, IonIcon, IonButton, IonCardContent } from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { addCircleSharp } from 'ionicons/icons';

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

{/* Libreria aun sin maquetar */} 
const library = () => {
    return (
        <IonContent className="ion-grad">
            <div>
                <div className="ion-padding flex-row align-center flex-between">
                    <IonAvatar className='icon-mid'>
                            <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                    
                    <div className="font-size-25 font-bold">Your Library</div>

                    <IonButton className="ion-main-look" aria-label="Favorite" shape="round" size="small" fill="solid">
                        <IonIcon icon={addCircleSharp} aria-hidden="true" className="font-size-20"/>
                    </IonButton>
                </div>

                <div className="flex-row gap-15-px ion-padding">
                    <IonButton className='ion-main-look ion-border-circle'>Playlists</IonButton>
                    <IonButton className='ion-main-look ion-border-circle'>Albums</IonButton>
                    <IonButton className='ion-main-look ion-border-circle'>Artists</IonButton>
                </div>

                <div>    
                    <IonCardContent className="ion-main-bg">
                    </IonCardContent>
                </div>
            </div>
        </IonContent>
    );
}

export default library;