import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon } from "@ionic/react";
import { useParams } from "react-router";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import apiCall from "../../../hooks/apiCall"
import songCall from "../../../hooks/songCall";
import {chevronBackOutline} from "ionicons/icons";
import { useHistory } from "react-router";

// Import de los themes css
import "../../../theme/contenedores.css";
import "../../../theme/position.css";
import "../../../theme/ion.css";
import "../../../theme/text.css";
import "../../../theme/icon.css";
import "../../../theme/music.css";

const Song: React.FC = () =>{
    const { id } = useParams<{id: string}>();
    const { searchDataId } = apiCall();
    const { searchAudio } = songCall();
    const [ name, setName ] = useState<string>('');
    const [ url, setUrl ] = useState<string>('');
    const [ audio, setAudio ] = useState<string>('');
    const [ game, setGame ] = useState<string>('');
    const history = useHistory();

    useEffect( () => {
        let isMounted = true;

        const fetchSong = async () => {
            try{

                const song = await searchDataId(`http://54.233.215.80:3000/songs/${id}`);

                if (isMounted){
                    setName(song.name);
                    setUrl(song.url);
                    setGame(song.game);

                    const audioUrl = await searchAudio(song.game,song.key);
                    setAudio(audioUrl);
                    isMounted = false;
                }


            }catch(e){
                console.log(e);
            }
        } 

        fetchSong();

        return () => { isMounted = false; }
    },[]);


    const getBack = () => {
        history.replace('/home');
    }


    return(
        <>

        <IonHeader className="no-shadow">

        </IonHeader>

        <IonContent className="ion-padding">
            <div className="flex-column flex-center align-center gap-15-px">
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>

                <div className="width-100-pe opaque-bg height-120"></div>

                <div className="flex-column flex-center align-center ion-padding">
                    <img src={url} alt="Album Cover" className="border-circle-15" />
                    <h2>{name}</h2>
                    <h3 className="gray-txt">{game}</h3>
                </div>

                <AudioPlayer
                    className="player"
                    autoPlay={false}
                    src={audio}
                />

            </div>
        </IonContent>
      </>
    );
};

export default Song;