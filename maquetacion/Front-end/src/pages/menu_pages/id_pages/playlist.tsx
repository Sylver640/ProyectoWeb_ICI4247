import React from "react";
import { IonContent, IonCard, IonButton, IonIcon, IonImg, IonText, IonList, IonItem, IonThumbnail, IonLabel, IonPopover } from "@ionic/react";
import { chevronBackOutline, ellipsisVertical } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import { playlist } from "../../../Data/playlist";

const Playlist = () => {
    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const filterPlaylist = playlist.filter(item => item.id === parseInt(id));

    const getBack = () => {
        history.goBack();
    };

    const goTo = (id: string, position:number) => {
        history.push({
            pathname:`/tunebytes/playlist/songs/${id}`,
            state: {list: filterPlaylist[0].list, index: position}
        });
    };

    return(
        <IonContent className="ion-grad flex-column gap-15-px">

            <div className="flex-row flex-start">
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>
            </div>

            <div className="width-100-pe flex-column flex-center align-center gap-15-px">

                <IonCard className="width-70-pe">
                    <IonImg src={filterPlaylist[0].url} className="ion-border-circle-15" alt="foto playlist"/>
                </IonCard>
                
                <div className="flex-row flex-between align-center width-70-pe">
                    <IonText className="font-bold">{filterPlaylist[0].name}</IonText>

                    <IonButton slot="start" id="playlist-button" className="ion-border-circle no-shadow ion-transparent">
                        <IonIcon slot="icon-only" icon={ellipsisVertical}/>
                        <IonPopover trigger="playlist-button" dismissOnSelect={true}>
                            <IonList>
                                <IonItem button detail={false}>
                                    Delete playlist
                                </IonItem>
                            </IonList>
                        </IonPopover>
                    </IonButton>
                </div>

                <IonList className="width-100-pe no-shadow opaque-total ion-padding">
                    {filterPlaylist[0].list.map((item, indentation) => {

                        return(
                            <IonItem button className='no-shadow ion-transparent ion-border-transparent' key={item.index} onClick={() => goTo(item.song_id, indentation)}>

                                <IonThumbnail slot="start" className="">
                                    <img alt="Song photo" src={item.url} />
                                </IonThumbnail>

                                <IonLabel>{item.name}</IonLabel>
                                
                            </IonItem>
                        );
                    })}

                </IonList>

            </div>

        </IonContent>
    );
};

export default Playlist;