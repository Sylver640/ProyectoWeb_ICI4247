import { IonContent, IonImg, IonAvatar, IonButton, IonItem, IonLabel, IonToggle } from "@ionic/react";

import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Settings = () => {
    return (
        <IonContent>
            <div>
                <div className="flex-column flex-center align-center gap-15-px ion-padding">

                    {/* Foto de perfil del usuario */}
                    <div className="flex-row align-center flex-center">
                        <IonAvatar className="icon-big">
                            <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>
                    </div>

                    {/* Boton para cambiar la foto de perfil */}
                    <div>
                        <IonButton className="ion-border-circle ion-main-look ion-main-txt">CHANGE PROFILE PICTURE</IonButton>
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
                             <p>generico@gmail.com</p>
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