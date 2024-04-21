import { IonContent, IonImg, IonAvatar, IonButton, IonItem, IonLabel, IonToggle } from "@ionic/react";
import '../../styles/menu styles/Settings.css';

const Settings = () => {
    return (
        <IonContent>
            <div>
                <div className="contenedor-col">

                    {/* Foto de perfil del usuario */}
                    <div className="center-av">
                        <IonAvatar id="usuario-avatar-settings">
                            <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>
                    </div>

                    {/* Boton para cambiar la foto de perfil */}
                    <div>
                        <IonButton id="btn-avatar">CHANGE PROFILE PICTURE</IonButton>
                    </div>

                </div>

                {/* Configuraciones de la cuenta */}

                {/* Seccion de la cuenta */}
                <div className="left-av">
                    <div className="texto-titulo">ACCOUNT</div>
                    <IonItem button className="full-width-button">
                        <IonLabel>
                            <h3>Premium Plan</h3>
                             <p>View Plans</p>
                         </IonLabel>
                    </IonItem>
                    <IonItem button className="full-width-button">
                        <IonLabel>
                            <h3>Email</h3>
                             <p>generico@gmail.com</p>
                         </IonLabel>
                    </IonItem>
                </div>

                {/* Seccion de la aplicacion */}
                <div className="left-av">
                    <div className="texto-titulo">PLAYBACK SETTINGS</div>

                    <div className="two-rows">
                        <div className="setting">
                                <IonItem className="fifthy-width-button">
                                    <IonLabel>
                                        <h3>Offline mode</h3>
                                        <p>Play downloaded songs offline</p>
                                    </IonLabel>
                                </IonItem>
                                <div className="toggle-container">
                                    <IonToggle className="toggle-settings" checked={false}></IonToggle>
                                </div>
                            </div>

                            <div className="setting">
                                <IonItem className="fifthy-width-button">
                                    <IonLabel>
                                        <h3>Breaktime between songs</h3>
                                        <p>Adjust app delay between songs to 5 seconds</p>
                                    </IonLabel>
                                </IonItem>
                                <div className="toggle-container">
                                    <IonToggle className="toggle-settings" checked={false}></IonToggle>
                                </div>
                        </div>

                    </div>
                </div>

            </div>    
        </IonContent>
    );
}

export default Settings;