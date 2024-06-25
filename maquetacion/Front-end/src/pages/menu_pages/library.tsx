import React, { useRef, useState, useEffect } from "react";
import { 
    IonContent, 
    IonImg, 
    IonIcon, 
    IonButton,
    IonHeader,
    IonInput,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonItem,
    IonPage,
    useIonModal
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { addCircleSharp } from 'ionicons/icons';
import ListPlaylist from "../../Components/playlist/listPlaylist";
import { playlist } from "../../Data/playlist";
import { OverlayEventDetail } from '@ionic/core/components';

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const ModalPlaylist = ({ dismiss }: { dismiss: (data?: string | null | undefined | number, role?: string) => void }) => {
    const inputRef = useRef<HTMLIonInputElement>(null);
    return (
      <IonPage>
        <IonHeader className="no-shadow text-center">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => dismiss(null, 'cancel')}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>New Playlist</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => dismiss(inputRef.current?.value, 'confirm')} strong={true}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-grad">
            <IonItem className="">
                <IonInput
                    className="ion-wf5-txt ion-primary"
                    ref={inputRef}
                    labelPlacement="stacked" 
                    label="Enter your new playlist name" 
                    placeholder="Playlist"
                />
          </IonItem>
        </IonContent>
      </IonPage>
    );
  };

const library = () => {
    const [playlists, setPlaylists] = useState(playlist);
    const [present, dismiss] = useIonModal(ModalPlaylist, {
        dismiss: (data: string, role: string) => dismiss(data, role),
    });

    const addPlaylist = (name: string) => {
        const newPlaylist = {
            id: playlists.length + 1,
            name: name,
            url: "https://www.w3schools.com/howto/img_avatar.png",
            list: []
        };

        setPlaylists([...playlists, newPlaylist]);
    }

    const openModal = () => {
        present({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'confirm') {
                    addPlaylist(ev.detail.data);
                }
            },
        });
    };

    return (
        <IonContent className="ion-grad">
            <div className="flex-column">
                <div className="ion-padding flex-row align-center flex-between">
                    <IonAvatar className='icon-mid'>
                            <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                    
                    <div className="font-size-25 font-bold">Playlists</div>

                        <IonButton className="ion-main-look" aria-label="Favorite" shape="round" size="small" fill="solid" onClick={() => openModal()}>
                            <IonIcon icon={addCircleSharp} aria-hidden="true" className="font-size-20"/>
                        </IonButton>

                    </div>

                <ListPlaylist/>

            </div>
        </IonContent>
    );
}

export default library;