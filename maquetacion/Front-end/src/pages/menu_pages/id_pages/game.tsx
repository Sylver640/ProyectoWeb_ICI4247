import React from "react";
import { IonContent, IonHeader, IonButton, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useParams } from "react-router";

const Game = () => {
    const history = useHistory();
    const { id } = useParams<{id: string}>();

    const getBack = () => {
        history.replace('/home');
    }

    return(
        <IonContent>
            <IonHeader>
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>
            </IonHeader>
            <div>
                <h2>Detalles del juego: {id}</h2>
                {/* Contenido de los detalles del juego */}
            </div>
        </IonContent>
    );
};

export default Game;