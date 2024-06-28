import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon, IonPopover, IonList, IonItem, IonActionSheet, IonAlert } from "@ionic/react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import {chevronBackOutline, reorderTwoOutline} from "ionicons/icons";
import apiCall from "../../../hooks/apiCall"
import songCall from "../../../hooks/songCall";
import SongPlayer from "../../../Components/player/songPlayer";
import {useLocalStorage} from "../../../Data/useLocalStorage";
import {UsersCall} from "../../../hooks/usersCall";

// Import de los themes css
import "../../../theme/contenedores.css";
import "../../../theme/position.css";
import "../../../theme/ion.css";
import "../../../theme/text.css";
import "../../../theme/icon.css";

// ========================================================================
// Página de la canción
const Song: React.FC = () =>{

    // Obtener el id de la canción
    const { id } = useParams<{id: string}>();

    // Llamar a la constante de la API
    const { searchDataId } = apiCall();
    const { searchAudio } = songCall();
    const {getPlaylistUser, addSongPlaylist} = UsersCall();

    const [ name, setName ] = useState<string>('');
    const [ url, setUrl ] = useState<string>('');
    const [ audio, setAudio ] = useState<string>('');
    const [ game, setGame ] = useState<string>('');
    const [header, setHeader] = useState<string>('')
    const [message, setMessage] = useState<string>('');
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [list, setList] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [popOveropen, setPopOverOpen] = useState<boolean>(false);

    // Llamar a la constante de la historia
    const history = useHistory();
    
    // ========================================================================
    // Función para regresar
    useEffect( () => {
        let isMounted = true;

        const fetchSong = async () => {
            try{
                const song = await searchDataId(id, 'songs');

                if (isMounted){
                    setName(song.name);
                    setUrl(song.url);
                    setGame(song.game);

                    const audioUrl = await searchAudio(song.game,song.key);
                    setAudio(audioUrl);
                }

                let email = useLocalStorage('user').getValue();
                const new_list = await getPlaylistUser(email);

                setList(new_list);

            }catch(e){
                console.log(e);
            }
        } 

        fetchSong();

        return () => { isMounted = false; setAudio(''); }
    },[]);
    // ========================================================================

    // ========================================================================
    // Función para regresar
    const getBack = () => {history.push('/home');}
    // ========================================================================

    // ========================================================================
    // Función para añadir la canción a la playlist
    const addSong = async (name:string, id:string) => {
        try{
            const response = await addSongPlaylist(name, id);
            if(response.status === "song_added_to_playlist"){
                setHeader("Success");
                setMessage("Song added to playlist");
            }else{
                setHeader("Error");
                setMessage("Something went wrong, try again later");
                console.log("Error");
            }
            setAlertOpen(true);
        }catch(e){
            console.log(e);
            setHeader("Error");
            setMessage("Something went wrong, try again later");
            setAlertOpen(true);
        }
    }
    // ========================================================================

    // ========================================================================
    // Renderizado de la página
    return(
        <IonContent className="ion-padding ion-grad">

            {/* Cabecera de la página */}
            <IonHeader className="no-shadow flex-row flex-between">

                {/* Botone para regresar */}
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look ion-transparent"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>
                
                {/* Botón las opciones*/}
                <IonButton className="ion-border-circle no-shadow ion-main-bg ion-txt-look ion-transparent" onClick={() => setIsOpen(true)}>
                    <IonIcon slot="icon-only" icon={reorderTwoOutline} />
                </IonButton>

            </IonHeader>

            {/* Acciones */}
            <IonActionSheet
                    isOpen={isOpen}
                    buttons={[
                        {
                            text:"Add to playlist",
                            handler: () => setPopOverOpen(true)
                        },
                        {
                            text:"Cancel",
                            role:"cancel",
                            data:{
                                action:'cancel'
                            }
                        }
                    ]}
                    onDidDismiss={() => setIsOpen(false)}
            />

            {/* Popover */}
            <IonPopover isOpen={popOveropen} onDidDismiss={() => setPopOverOpen(false)}>
                <IonList>
                    {list.map( (item) => (
                        <IonItem key={item.idPlaylist} onClick={() => addSong(item.Nombre, id)}>{item.Nombre}</IonItem>
                    ))}
                </IonList>
            </IonPopover>
            
            {/* Reproductor de la canción */}
            <SongPlayer src={audio} name={name} url={url} game={game} />
            
            {/* Alerta */}
            <IonAlert
                isOpen={alertOpen}
                onDidDismiss={() => setAlertOpen(false)}
                header={header}
                message={message}
                buttons={['OK']}
            ></IonAlert>

        </IonContent>
    );
};

export default Song;