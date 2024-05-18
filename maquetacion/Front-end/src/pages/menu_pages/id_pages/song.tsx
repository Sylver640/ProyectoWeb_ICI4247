import React, { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import apiCall from "../../../hooks/apiCall"

const Song: React.FC = () =>{
    const { id } = useParams<{id: string}>();
    const { searchDataId } = apiCall();
    const [song, setSong] = useState<any>([]);

    useEffect( () => {

        const fetchSong = async () => {
            try{
                const song = await searchDataId(`http://54.233.215.80:3000/songs/${id}`);
                setSong(song);
                
            }catch(e){
                console.log(e);
            }
        } 

        fetchSong();
    },[]);

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