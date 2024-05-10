import React from "react";
import { IonContent, IonImg, IonIcon, IonButton, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';

// Import de los themes css
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
                    </IonCardContent>
                </div>
            </div>
        </IonContent>
    );
}

export default library;