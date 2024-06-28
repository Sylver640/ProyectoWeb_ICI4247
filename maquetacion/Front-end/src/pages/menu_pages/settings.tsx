import React, {useState, useEffect} from 'react';
import { IonContent, IonImg, IonAvatar, IonButton, IonItem, IonLabel, IonToggle } from "@ionic/react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Filesystem} from '@capacitor/filesystem';
import {Capacitor} from '@capacitor/core';
import { useLocalStorage } from '../../Data/useLocalStorage';
import {UsersCall} from '../../hooks/usersCall';

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

// ========================================================================
// Página de configuración
const Settings = () => {

    // Datos del usuario
    const [email, setEmail] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    // Llamar a la constante de la API
    const {update_user} = UsersCall();

    // ========================================================================
    // Obtener los datos del usuario
    useEffect(() => {
        let email = useLocalStorage('user').getValue();
        setEmail(email);
        let url = useLocalStorage('url').getValue();
        setUrl(url);
    },[]);
    // ========================================================================


    // ========================================================================
    // Seleccionar imagen
    const selectImage = async () => {
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
                const response = await update_user(newUrl,'url', email);

                if(response.status === "user_updated"){
                    console.log("User updated");
                }else{
                    console.log("User not updated");
                }

            }catch(e){
                console.log(e);
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

                const response = await update_user(newUrl,'url', email);

                if(response.status === "user_updated"){
                    console.log("User updated");
                }else{
                    console.log("User not updated");
                }
                
            }catch(e){
                console.log(e);
                return;
            }
        }
    }
    // ========================================================================

    // ========================================================================
    // Renderizar la página
    return (
        <IonContent>
            <div>
                <div className="flex-column flex-center align-center gap-15-px ion-padding">

                    {/* Foto de perfil del usuario */}
                    <div className="flex-row align-center flex-center">
                        <IonAvatar className="icon-big">
                            <IonImg src={url} />
                        </IonAvatar>
                    </div>

                    {/* Boton para cambiar la foto de perfil */}
                    <div>
                        <IonButton className="ion-border-circle ion-main-look ion-main-txt" onClick={() => selectImage()}>CHANGE PROFILE PICTURE</IonButton>
                    </div>

                </div>

                {/* Configuraciones de la cuenta */}

                {/* Seccion de la cuenta */}
                <div className="flex-column flex-start ion-padding width-100-pe gap-5-px">
                    <div className="font-bold font-size-15">ACCOUNT</div>
                    <IonItem button className="ion-main-bg ion-wf5-bg ion-border-main ripple-color-look">
                        <IonLabel>
                            <h3>Premium Plan</h3>
                             <p>View Plans</p>
                         </IonLabel>
                    </IonItem>
                    <IonItem button className="ion-main-bg ion-wf5-bg ion-border-main ripple-color-look">
                        <IonLabel>
                            <h3>Email</h3>
                             <p>{email}</p>
                         </IonLabel>
                    </IonItem>
                </div>

                {/* Seccion de la aplicacion */}
                <div className="flex-column flex-start ion-padding width-100-pe gap-5-px">

                    <div className="font-bold font-size-15">PLAYBACK SETTINGS</div>

                        <div className="flex-row align-center flex-wrap-2 width-100-pe gap-5-px">
                                <IonItem className="width-90-pe ion-main-bg ion-wf5-bg ion-border-main">
                                    <IonLabel>
                                        <h3>Offline mode</h3>
                                        <p>Play downloaded songs offline</p>
                                    </IonLabel>
                                </IonItem>
                                <div>
                                    <IonToggle className="ion-toggle-main" checked={false}></IonToggle>
                                </div>
                            </div>

                            <div className="flex-row align-center flex-wrap-2 width-100-pe gap-5-px">
                                <IonItem className="width-90-pe ion-main-bg ion-wf5-bg ion-border-main">
                                    <IonLabel>
                                        <h3>Breaktime between songs</h3>
                                        <p>Adjust app delay between songs to 5 seconds</p>
                                    </IonLabel>
                                </IonItem>
                                <div>
                                    <IonToggle className="ion-toggle-main" checked={false}></IonToggle>
                                </div>
                        </div>
                </div>

            </div>    
        </IonContent>
    );
}

export default Settings;