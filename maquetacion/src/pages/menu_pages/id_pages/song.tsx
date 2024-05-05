import React from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";

const Song: React.FC = () =>{
    const { id } = useParams<{id: string}>();
    return(
        <IonContent>
            <div>
                <h2>Detalles de la canción {id}</h2>
                {/* Contenido de los detalles de la canción */}
            </div>
        </IonContent>
    );
};

export default Song;