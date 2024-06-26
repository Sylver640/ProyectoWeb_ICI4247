import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon, IonPopover, IonList, IonItem, IonAlert, IonActionSheet } from "@ionic/react";
import { useParams, useHistory, useLocation } from "react-router";
import {chevronBackOutline, reorderTwoOutline} from "ionicons/icons";
import AudioPlayer from 'react-h5-audio-player';
import apiCall from "../../../hooks/apiCall"
import songCall from "../../../hooks/songCall";
import UsersCall from "../../../hooks/usersCall";
import { useLocalStorage } from "../../../Data/useLocalStorage";

import 'react-h5-audio-player/lib/styles.css';
import "../../../theme/music.css";

// Import de los themes css
import "../../../theme/contenedores.css";
import "../../../theme/position.css";
import "../../../theme/ion.css";
import "../../../theme/text.css";
import "../../../theme/icon.css";

// ========================================================================
// Página de la lista de canciones
const PlaylistSongs: React.FC = () =>{

    // Obtener el id de la canción
    const { id } = useParams<{id: string}>();
    const location = useLocation<{ list: any[], index: number, game: boolean }>();

    // Llamar a la constante de la historia
    const history = useHistory();

    // Llamar a la constante de la API
    const { searchDataId } = apiCall();
    const { searchAudio } = songCall();
    const { addSongPlaylist, getPlaylistUser } = UsersCall();

    // Datos de la lista de canciones
    const [list , setList] = useState<any[]>([]);
    const [currentIndex, setIndex] = useState<number>(0);
    const [header, setHeader] = useState<string>('')
    const [message, setMessage] = useState<string>('');
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [popOveropen, setPopOverOpen] = useState<boolean>(false);
    const [Userlist, setUserList] = useState<any[]>([]);
    const [isGame, setIsGame] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Datos de la canción actual
    const [playlist, setPlaylist] = useState<any[]>([]);
    const [current, setCurrent] = useState<any>({
        _id: "",
        name: "",
        game: "",
        key: "",
        url: ""
    });

    // Datos de la lista de canciones
    const [songList, setSongList] = useState<any[]>([]);
    const [currentSong, setCurrentSong] = useState<string>('');

    // ========================================================================
    // Obtener los datos de la lista de canciones
    useEffect( () => {

        const fetchData = async () => {
            if(location.state){
                const list = location.state.list;
                const newIndex = location.state.index;

                setIndex(newIndex);
                setList(list);
                
                const isgame = location.state.game;
                setIsGame(isgame);
                if(isgame){
                    let email = useLocalStorage('user').getValue();
                    const lista = await getPlaylistUser(email);
                    setUserList(lista);
                }

                if(list.length === 0) return;

                try{
                        let songs: any[] = [];
                        for(let i = 0; i < list.length; i++){
                            const song = await searchDataId(list[i].song_id, 'songs');
                            songs.push(song);
                        }
                        setPlaylist(songs);

                        setCurrent(songs[currentIndex]);

                        let sources: any[] = [];
                        for(let i = 0; i < songs.length; i++){
                            const audioUrl = await searchAudio(songs[i].game, songs[i].key);
                            sources.push(audioUrl);
                        }

                        setSongList(sources);
                        setCurrentSong(sources[currentIndex]);
                }catch(e){
                    console.log(e); 
                }
            }
        };

        fetchData();
        
    }, [location.state]);
    // ========================================================================

    // ========================================================================
    // Función para ir a la siguiente canción
    const handleNext = () => {
        if(currentIndex < list.length - 1){
            setIndex(currentIndex + 1);
            setCurrent(playlist[currentIndex + 1])
            setCurrentSong(songList[currentIndex + 1]);
        }
    };
    // ========================================================================

    // ========================================================================
    // Función para ir a la canción anterior
    const handlePrev = () => {
        if(currentIndex > 0){
            setIndex(currentIndex - 1);
            setCurrent(playlist[currentIndex - 1])
            setCurrentSong(songList[currentIndex - 1]);
        }
    };
    // ========================================================================

    // ========================================================================
    // Función para añadir una canción a la lista de reproducción
    const addSong = async (name:string, id: string) => {
        console.log(id);
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
    // Función para regresar
    const getBack = () => {history.push('/home');}
    // ========================================================================

    // ========================================================================
    // Renderizado de la página
    return(
        <IonContent className="ion-padding ion-grad">

            {/* Cabecera de la página */}
            <IonHeader className="no-shadow flex-row flex-between">

                {/* Botón para regresar */}
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look ion-transparent"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>

                {/* Botón para añadir a la lista de reproducción */}
                {isGame &&
                    <>
                        <IonButton onClick={() => setIsOpen(true)} className="ion-border-circle no-shadow ion-main-bg ion-txt-look ion-transparent">
                            <IonIcon slot="icon-only" icon={reorderTwoOutline} />
                        </IonButton>
                        <IonActionSheet
                            isOpen={isOpen}
                            buttons={[
                                {
                                    text: "Add to playlist",
                                    handler: () => setPopOverOpen(true)
                                },
                                {
                                    text: "Cancel",
                                    role: "cancel",
                                    data: {
                                        action: 'cancel'
                                    }
                                }
                            ]}
                            onDidDismiss={() => setIsOpen(false)}
                        />
                    </>
                }

        </IonHeader>

        {/* Contenido de la página */}
        <div className="flex-column flex-center align-center gap-15-px">

                {/* Datos del juego */}
                <div className="flex-column flex-center align-center ion-padding">
                    <img src={current.url} alt="Album Cover" className="border-circle-15" />
                    <h2>{current.name}</h2>
                    <h3 className="gray-txt">{current.game}</h3>
                </div>

            </div>
            
            {/* Botones de control */}
            {isGame &&
                <IonPopover isOpen={popOveropen} onDidDismiss={() => setPopOverOpen(false)}>
                    <IonList>
                        {Userlist.map( (item) => (
                            <IonItem key={item.idPlaylist} onClick={() => addSong(item.Nombre,current._id)}>{item.Nombre}</IonItem>
                        ))}
                    </IonList>
                </IonPopover>
            }

            {/* Reproductor de audio */}
            <AudioPlayer 
                className="player"
                autoPlay={false}
                showJumpControls={false}
                showSkipControls={true}
                showFilledVolume={true}
                src={currentSong}
                onClickPrevious={handlePrev}
                onClickNext={handleNext}
                autoPlayAfterSrcChange={false}
            />

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

export default PlaylistSongs;