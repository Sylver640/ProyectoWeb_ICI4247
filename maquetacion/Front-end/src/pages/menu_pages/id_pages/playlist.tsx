import React, {useEffect, useState} from "react";
import { 
    IonContent, 
    IonCard, 
    IonButton, 
    IonIcon, 
    IonImg, 
    IonText, 
    IonList, 
    IonItem, 
    IonThumbnail, 
    IonLabel, 
    IonPopover, 
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonAlert
 } from "@ionic/react";
import { chevronBackOutline, ellipsisVertical, trash } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import { useLocalStorage } from "../../../Data/useLocalStorage";
import {Camera, CameraSource, CameraResultType} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Filesystem } from "@capacitor/filesystem";
import {UsersCall} from "../../../hooks/usersCall";

const Playlist = () => {
    const history = useHistory();
    const [url, setUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const { id } = useParams<{id: string}>();
    const [list, setList] = useState<any[]>([]);
    const [header, setHeader] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const { getlistPlaylist, getPlaylist_byId, deletePlaylist, deleteSongPlaylist, update_playlist } = UsersCall();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect( () => {
        const fetchData = async () => {
            try{
                let email = useLocalStorage('user').getValue();
                const playlist = await getPlaylist_byId(id);
                setUrl(playlist.Url);
                setName(playlist.Nombre);
                const lista = await getlistPlaylist(email, playlist.Nombre);
                setList(lista);
            }catch(e){
                console.log(e);
            }
        }

        fetchData();
    }, []);

    const getBack = () => {
        history.push("/menu");
    };

    const goTo = (id: string, position:number) => {
        history.push({
            pathname:`/tunebytes/playlist/songs/${id}`,
            state: {list: list, index: position, game: false}
        });
    };

    const delplatlist = async () => {
        try{

            if(list.length > 0){

                for(let i = 0; i < list.length; i++){
                    try{
                        let id = list[i].song_id;
                        const response = await deleteSongPlaylist(name, id);
                    }catch(e){
                        console.log(e);
                        return;
                    }
                }
            }

            const response = await deletePlaylist(name);
            if(response.status === "playlist_deleted"){
                history.push("/menu");
            }else{
                console.log("Algo ocurrio");
                return;
            }
        }catch(e){
            console.log(e);
        }
    };

    const deleteSong = async (id: string) => {
        try{
            const response = await deleteSongPlaylist(name, id);
            if(response.status === "song_deleted"){
                setHeader("Error");
                setMessage("There was an error deleting the song");
            }else{
                setHeader("Success");
                setMessage("Song deleted");
            }

            setAlertOpen(true);
        }catch(e){
            console.log(e);
            setHeader("Error");
            setMessage("There was an error deleting the song");
            setAlertOpen(true);
        }
    }

    const changePhoto = async () => {
        const platform = Capacitor.getPlatform();

        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        if(platform === 'web' && image.webPath){
            let newUrl = image.webPath;
            setUrl(image.webPath);
            useLocalStorage('url').setValue(image.webPath);

            try{
                const response = await update_playlist("Url",newUrl, name);
                
                if(response.status === "playlist_updated"){
                    setHeader("Success");
                    setMessage("Playlist updated");
                }else{
                    setHeader("Error");
                    setMessage("There was an error updating the playlist");
                }
                setAlertOpen(true);
                    
            }catch(e){
                console.log(e);
                setHeader("Error");
                setMessage("There was an error updating the playlist");
                setAlertOpen(true);
                return;
            }

        }else{
            try{
                const file = await Filesystem.readFile({
                    path: image.path!
                });

                const base64Data = `data:image/${image.format};base64,${file.data}`;
                let newUrl = base64Data;
                setUrl(base64Data);
                useLocalStorage('url').setValue(base64Data);

                const response = await update_playlist("Url",newUrl, name);

                if(response.status === "playlist_updated"){
                    console.log("Playlist updated");
                }else{
                    console.log("Playlist not updated");
                }
            }catch(e){
                console.log(e);
                return;
            }
        }

        try{
            


        }catch(e){
            console.log(e);
        }
    }

    return(
        <IonContent className="ion-grad flex-column gap-15-px">

            <div className="flex-row flex-start">
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look ion-transparent"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>
            </div>

            <div className="width-100-pe flex-column flex-center align-center gap-15-px">

                <IonCard className="width-70-pe">
                    <IonImg src={url} className="ion-border-circle-15" alt="foto playlist"/>
                </IonCard>
                
                <div className="flex-row flex-between align-center width-70-pe">
                    <IonText className="font-bold">{name}</IonText>

                    <IonButton slot="start" className="ion-border-circle no-shadow ion-transparent" onClick={() => setIsOpen(true)}>
                        <IonIcon slot="icon-only" icon={ellipsisVertical}/>
                    </IonButton>
                </div>

                <IonPopover isOpen={isOpen} dismissOnSelect={true} onDidDismiss={() => setIsOpen(false)}>
                    <IonList>
                        <IonItem button detail={false} onClick={() => delplatlist()}>
                            Delete playlist
                        </IonItem>

                        <IonItem button detail={false} onClick={() => changePhoto()}>
                            Change Photo
                        </IonItem>

                    </IonList>
                </IonPopover>

                <IonList className="width-100-pe no-shadow opaque-total ion-padding">
                    {list.map((item, indentation) => {

                        return(
                            <IonItemSliding key={item.idCancion}>
                                <IonItem button className='no-shadow ion-transparent ion-border-transparent' onClick={() => goTo(item.song_id, indentation)}>

                                    <IonThumbnail slot="start" className="">
                                        <img alt="Song photo" src={item.Url} />
                                    </IonThumbnail>

                                    <IonLabel>{item.Nombre}</IonLabel>
                                    
                                </IonItem>

                                <IonItemOptions side="end">
                                    <IonItemOption color="danger">
                                    <IonIcon slot="icon-only" icon={trash} onClick={() => deleteSong(item.song_id)}></IonIcon>
                                    </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                        );
                    })}

                </IonList>

                <div className="opaque-total icon-min"></div>

                <IonAlert
                    isOpen={alertOpen}
                    onDidDismiss={() => setAlertOpen(false)}
                    header={header}
                    message={message}
                    buttons={['OK']}
                />

            </div>

        </IonContent>
    );
};

export default Playlist;