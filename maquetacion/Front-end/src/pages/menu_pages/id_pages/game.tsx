import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonButton, IonIcon, IonAvatar, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { apiCall } from "../../../hooks/apiCall";

// ========================================================================
// Página de juego
const Game = () => {

    // Llamar a la constante de la historia
    const history = useHistory();

    // Llamar a la constante de la API
    const { searchDataId } = apiCall();

    // Obtener el id del juego
    const { id } = useParams<{id: string}>();
    
    // Datos del juego
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [songList, setSongList] = useState<any[]>([]);
    const [company, setCompany] = useState<string>('');

    // ========================================================================
    // Obtener los datos del juego
    useEffect(() => {
        const fetchData = async () => {
            try{
               const game = await searchDataId(id, 'games');

                setName(game.name);
                setUrl(game.url);
                setCompany(game.company);
                setSongList(game.ost);

            }
            catch(e){
                console.log(e);
            }
        };

        fetchData();
    },[]);
    // ========================================================================

    // ========================================================================
    // Función para ir a la canción
    const goTo = (id: string, position:number) => {
        history.push({
            pathname:`/tunebytes/playlist/songs/${id}`,
            state: {list: songList, index: position, game: true}
        });
    };
    // ========================================================================

    // ========================================================================
    // Función para regresar
    const getBack = () => {
        history.replace('/home');
    }
    // ========================================================================

    // ========================================================================
    // Renderizar la página
    return(
        <IonContent className="ion-grad">

            {/* Botón para regresar */}
            <IonHeader>
                <IonButton slot="start" className="ion-border-circle no-shadow ion-main-bg ion-txt-look"  onClick={() => getBack()}>
                    <IonIcon slot="icon-only" icon={chevronBackOutline}/>
                </IonButton>
            </IonHeader>

            {/* Contenido de la página */}
            <div className="flex-column">

                {/* Datos del juego */}
                <img src={url} alt="imagen juego" className="ion-margin"/>
                
                <div className="ion-padding">
                    <h1 className="font-bold">{name}</h1>
                    <h3 className="font-bold gray-txt">{company}</h3>
                </div>

                {/* Lista de canciones */}
                <IonList className="ion-margin opaque-total">
                    {songList.map((song, index) => {
                        return(
                            <IonItem button key={index} className="no-shadow ripple-color-look ion-transparent ion-border-transparent" onClick={() => goTo(song._id, index)}>
                                <IonAvatar aria-hidden="true" slot='start'>
                                    <img src={url} alt="cancion"/>
                                </IonAvatar>
                                <IonLabel className="font-bold">{song.name}</IonLabel>
                            </IonItem>
                        );
                    })}
                </IonList>
                
                {/* Espacio en blanco */}
                <div className="opaque-total ion-padding ion-margin"></div>
                
            </div>
        </IonContent>
    );
};

export default Game;