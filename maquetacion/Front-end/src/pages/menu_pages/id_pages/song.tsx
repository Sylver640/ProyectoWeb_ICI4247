import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon } from "@ionic/react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import {chevronBackOutline} from "ionicons/icons";
import apiCall from "../../../hooks/apiCall"
import songCall from "../../../hooks/songCall";
import SongPlayer from "../../../Components/player/songPlayer";

// Import de los themes css
import "../../../theme/contenedores.css";
import "../../../theme/position.css";
import "../../../theme/ion.css";
import "../../../theme/text.css";
import "../../../theme/icon.css";

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
                const song = await searchDataId(id, 'songs');

                if (isMounted){
                    setName(song.name);
                    setUrl(song.url);
                    setGame(song.game);

                    const audioUrl = await searchAudio(song.game,song.key);
                    setAudio(audioUrl);
                }


            }catch(e){
                console.log(e);
            }
        } 

        fetchSong();

        return () => { isMounted = false; setAudio(''); }
    },[]);


    const getBack = () => {history.push('/home');}

    return(
        <>

        <IonHeader className="no-shadow">
            <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                <IonIcon slot="icon-only" icon={chevronBackOutline}/>
            </IonButton>
        </IonHeader>

        <IonContent className="ion-padding ion-grad">

            <SongPlayer src={audio} name={name} url={url} game={game} />

        </IonContent>
      </>
    );
};

export default Song;