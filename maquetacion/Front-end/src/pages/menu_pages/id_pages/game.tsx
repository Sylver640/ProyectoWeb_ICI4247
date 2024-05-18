import React from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";

const Game = () => {
    const { id } = useParams<{id: string}>();
    return(
        <IonContent>
            <div>
                <h2>Detalles del juego: {id}</h2>
                {/* Contenido de los detalles del juego */}
            </div>
        </IonContent>
    );
};

export default Game;