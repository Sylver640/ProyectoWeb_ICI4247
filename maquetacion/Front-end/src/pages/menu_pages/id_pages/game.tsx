import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon, IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { apiCall } from "../../../hooks/apiCall";

const Game = () => {
    const history = useHistory();
    const { searchDataId } = apiCall();
    const { id } = useParams<{id: string}>();
    

    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [songList, setSongList] = useState<any[]>([]);
    const [company, setCompany] = useState<string>('');

    const getBack = () => {
        history.replace('/home');
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
               const game = await searchDataId(id, 'games');

                setName(game.name);
                setUrl(game.url);
                setCompany(game.company);
                setSongList(game.ost);

            }
            catch(e){
                console.log(e);
            }
        };

        fetchData();
    },[]);

    const goTo = (id: string, position:number) => {
        history.push({
            pathname:`/tunebytes/playlist/songs/${id}`,
            state: {list: songList, index: position}
        });
    };

    return(
        <IonContent>
            <IonHeader>
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>
            </IonHeader>
            <div className="flex-column">
                <img src={url} alt="imagen juego" className="ion-margin"/>
                
                <div className="ion-padding">
                    <h1 className="font-bold">{name}</h1>
                    <h3 className="font-bold gray-txt">{company}</h3>
                </div>

                {songList.map((song, index) => {
                    return(
                        <IonItem button key={index} className="no-shadow ripple-color-look" onClick={() => goTo(song._id, index)}>
                            <IonAvatar aria-hidden="true" slot='start'>
                                <img src={url} alt="cancion"/>
                            </IonAvatar>
                            <IonLabel className="font-bold">{song.name}</IonLabel>
                        </IonItem>
                    );
                })}

                <div className="opaque-total ion-padding ion-margin"></div>
            </div>
        </IonContent>
    );
};

export default Game;