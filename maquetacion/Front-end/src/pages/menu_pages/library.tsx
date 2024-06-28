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
    useIonModal,
    IonText,
    IonList,
    IonCard,
    IonAlert
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { addCircleSharp } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import { useLocalStorage } from "../../Data/useLocalStorage";
import {UsersCall} from "../../hooks/usersCall";
import { useHistory } from "react-router";

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";


// Modal para crear una nueva playlist
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
            <IonItem>
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
// ========================================================================

// ========================================================================
// Función para mostrar la biblioteca de playlists
const library = () => {
    
    // Llamada a la función de crear una playlist
    const [present, dismiss] = useIonModal(ModalPlaylist, {
        dismiss: (data: string, role: string) => dismiss(data, role),
    });

    // Llamada a la función de la API
    const {getPlaylistUser, createPlaylist} = UsersCall();

    // Variables de estado
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [header, setHeader] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    // Hook para redireccionar
    const history = useHistory();

    // ========================================================================
    // Función para obtener las playlists del usuario
    useEffect(() => {
      const fetchList = async () => {
          try{
              let email = useLocalStorage('user').getValue();
              const list_user = await getPlaylistUser(email);
              setPlaylists(list_user);

              let url = useLocalStorage('url').getValue();
              setUrl(url);
          }catch(e){
              console.log(e);
          }

      }

      fetchList();
    }, []);
    // ========================================================================

    // ========================================================================
    // Función para agregar una playlist
    const addPlaylist = async (name: string) => {
        let id = useLocalStorage('id').getValue();

        try{
            const response = await createPlaylist(id, name);
            if(response.status === "playlist_created"){
                setHeader("Success");
                setAlertMessage("Playlist created successfully, refresh de screen to see it");
            }else{
                setHeader("Error");
                setAlertMessage("This name is already in use, try another one");
            }
            setShowAlert(true);
        }catch(e){
            console.log(e);
            setHeader("Error");
            setAlertMessage("There was an error creating the playlist");
            setShowAlert(true);
        }
    }
    // ========================================================================

    // ========================================================================
    // Función para abrir el modal
    const openModal = () => {
        present({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'confirm') {
                    addPlaylist(ev.detail.data);
                }
            },
        });
    };
    // ========================================================================


    // ========================================================================
    // Función para redireccionar
    const goto = (path: string) => {
      history.push(path);
    };
    // ========================================================================

    // ========================================================================
    // Renderizado de la página
    return (
        <IonContent className="ion-grad">
            <div className="flex-column">

                {/* Header de la página */}
                <div className="ion-padding flex-row align-center flex-between">

                    {/* Avatar del usuario */}
                    <IonAvatar className='icon-mid'>
                            <IonImg src={url} />
                    </IonAvatar>
                    
                    <div className="font-size-25 font-bold">Playlists</div>
                        
                        {/* Botón para crear una playlist */}
                        <IonButton className="ion-main-look" aria-label="Favorite" shape="round" size="small" fill="solid" onClick={() => openModal()}>
                            <IonIcon icon={addCircleSharp} aria-hidden="true" className="font-size-20"/>
                        </IonButton>

                    </div>

                {/* Lista de playlists */}
                <IonList className='opaque-total'>
                  {playlists.map((card) => {
                      return(
                          <IonCard 
                              button key={card.idPlaylist} 
                              className='ion-main-bg ion-wff-txt text-center ripple-color-look ion-margin ion-padding'
                              onClick={() => goto(`/tunebytes/playlist/${card.idPlaylist}`)}
                              >

                              <img alt="Playlist" src={card.Url} />
                              <IonText className="font-bold font-size-20">{card.Nombre}</IonText>
                          </IonCard>
                      );
                  })}
                </IonList>

                {/* Espacio en blanco */}
                <div className="opaque-total icon-min"></div>
            
                {/* Alerta */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={header}
                    message={alertMessage}
                    buttons={['OK']}
                />

            </div>
        </IonContent>
    );
}

export default library;