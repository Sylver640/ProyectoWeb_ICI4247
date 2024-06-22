import React, { useState } from "react";
import { 
    IonContent, 
    IonImg, 
    IonIcon, 
    IonButton,
    IonAlert
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { addCircleSharp } from 'ionicons/icons';
import ListPlaylist from "../../Components/playlist/listPlaylist";
import { playlist } from "../../Data/playlist";

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const library = () => {
    const [playlists, setPlaylists] = useState(playlist);
    const [showAlert, setShowAlert] = useState(false);

    const addPlaylist = (name: string) => {
        const newPlaylist = {
            id: playlists.length + 1,
            name: name,
            url: "https://www.w3schools.com/howto/img_avatar.png",
            list: []
        };

        setPlaylists([...playlists, newPlaylist]);
    }

    const handleAlertDismiss = (e:CustomEvent) => {
        const data = (e.detail.data as any);
        if (data && data.values && data.values[0]) {
            addPlaylist(data.values[0]);
        }

        setShowAlert(false);
    }

    return (
        <IonContent className="ion-grad">
            <div className="flex-column">
                <div className="ion-padding flex-row align-center flex-between">
                    <IonAvatar className='icon-mid'>
                            <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                    
                    <div className="font-size-25 font-bold">Playlists</div>

                    <IonButton className="ion-main-look" id="create-playlist" aria-label="Favorite" shape="round" size="small" fill="solid" onClick={()=> setShowAlert(true)}>
                        <IonIcon icon={addCircleSharp} aria-hidden="true" className="font-size-20"/>
                    </IonButton>

                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={handleAlertDismiss}
                        trigger="create-playlist"
                        header="Create a playlist"
                        buttons={['Cancel', 'OK']}
                        inputs={[
                            {
                                type: 'text',
                                placeholder: 'Name of the playlist',
                                attributes:{
                                    maxlength: 10
                                }
                            },
                        ]}
                    />
                </div>

                <ListPlaylist/>

            </div>
        </IonContent>
    );
}

export default library;