import React from "react";
import { IonContent, IonCard, IonButton, IonIcon, IonImg, IonText, IonList, IonItem, IonThumbnail, IonLabel } from "@ionic/react";
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

                    <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look">
                        <IonIcon slot="icon-only" icon={ellipsisVertical}/>
                    </IonButton>
                </div>

                <IonList className="width-100-pe">
                    {filterPlaylist[0].list.map((item, indentation) => {

                        return(
                            <IonItem button key={item.index} onClick={() => goTo(item.id, indentation)}>

                                <IonThumbnail slot="start" className="">
                                    <img alt="Song photo" src={item.url} />
                                </IonThumbnail>

                                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-look ion-wf5-txt">
                                    <IonIcon slot="icon-only" icon={ellipsisVertical}/>
                                </IonButton>

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