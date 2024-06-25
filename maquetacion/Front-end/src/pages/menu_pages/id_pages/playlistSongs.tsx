import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon, IonPopover, IonList, IonItem } from "@ionic/react";
import { useParams, useHistory, useLocation } from "react-router";
import {chevronBackOutline, reorderTwoOutline} from "ionicons/icons";
import AudioPlayer from 'react-h5-audio-player';
import apiCall from "../../../hooks/apiCall"
import songCall from "../../../hooks/songCall";

import 'react-h5-audio-player/lib/styles.css';
import "../../../theme/music.css";

// Import de los themes css
import "../../../theme/contenedores.css";
import "../../../theme/position.css";
import "../../../theme/ion.css";
import "../../../theme/text.css";
import "../../../theme/icon.css";

const PlaylistSongs: React.FC = () =>{
    const { id } = useParams<{id: string}>();
    const location = useLocation<{ list: any[], index: number }>();
    const history = useHistory();
    const { searchDataId } = apiCall();
    const { searchAudio } = songCall();

    const [list , setList] = useState<any[]>([]);
    const [currentIndex, setIndex] = useState<number>(0);

    const [playlist, setPlaylist] = useState<any[]>([]);
    const [current, setCurrent] = useState<any>({
        id: "",
        name: "",
        game: "",
        key: "",
        url: ""
    });

    const [songList, setSongList] = useState<any[]>([]);
    const [currentSong, setCurrentSong] = useState<string>('');

    useEffect( () => {

        const fetchData = async () => {
            if(location.state){
                const list = location.state.list;
                const newIndex = location.state.index;

                setIndex(newIndex);
                setList(list);

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

    const handleNext = () => {
        if(currentIndex < list.length - 1){
            setIndex(currentIndex + 1);
            setCurrent(playlist[currentIndex + 1])
            setCurrentSong(songList[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if(currentIndex > 0){
            setIndex(currentIndex - 1);
            setCurrent(playlist[currentIndex - 1])
            setCurrentSong(songList[currentIndex - 1]);
        }
    };

    const getBack = () => {history.push('/home');}

    return(
        <>

        <IonHeader className="no-shadow flex-row flex-between">
            <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                <IonIcon slot="icon-only" icon={chevronBackOutline}/>
            </IonButton>
            <IonButton id="popover" className="ion-border-circle no-shadow ion-main-bg ion-txt-look">
                <IonIcon slot="icon-only" icon={reorderTwoOutline} />
                <IonPopover trigger="popover" dismissOnSelect={true}>
                    <IonList>
                        <IonItem button detail={false}>
                            Add to a playlist
                        </IonItem>

                        <IonItem button detail={false}>
                            delete from a playlist
                        </IonItem>

                    </IonList>
                </IonPopover>
            </IonButton>
        </IonHeader>

        <IonContent className="ion-padding ion-grad">

            <div className="flex-column flex-center align-center gap-15-px">
                
                <div className="width-100-pe opaque-bg height-120"></div>

                <div className="flex-column flex-center align-center ion-padding">
                    <img src={current.url} alt="Album Cover" className="border-circle-15" />
                    <h2>{current.name}</h2>
                    <h3 className="gray-txt">{current.game}</h3>
                </div>

            </div>

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

        </IonContent>
      </>
    );
};

export default PlaylistSongs;