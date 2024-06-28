import React,{ useState, useEffect } from "react";
import { 
    IonContent, 
    IonHeader,  
    IonImg, 
    IonMenu,
    IonMenuButton,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import { useLocalStorage } from "../../Data/useLocalStorage";
import { useHistory } from "react-router";
import useApi from '../../hooks/apiCall';
import {UsersCall} from "../../hooks/usersCall";

// Import de los componentes
import ShowSlides from '../../Components/btns/ShowSlides';
import ShowRelease from "../../Components/btns/ShowRelease";
import ShowTop from "../../Components/btns/showTop";

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Home = () => {

    // Llamar a la constantes de la API
    const { searchData } = useApi();
    const {getUserByEmail} = UsersCall();

    // Datos del usuario   
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [gamelist, setGameList] = useState<any[]>([]);

    // Llamar a la constante de la historia
    const history = useHistory();

    // Data de canciones
    const [songs, setSongs] = useState<any>([]);

    // ========================================================================
    // Obtener los datos del usuario
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const list_songs = await searchData('songs', "?limit=5");
                setSongs(list_songs);

                const list_games = await searchData('games','');
                setGameList(list_games);

                let email = useLocalStorage('user').getValue();
                const user = await getUserByEmail(email);

                setName(user.Nombre);
                setUrl(user.url);

                useLocalStorage('nombre').setValue(user.Nombre);
                useLocalStorage('url').setValue(user.url);


            }
            catch(e){
                console.log(e);
            }
        };

        fetchData();
    }, []);
    // ========================================================================


    // ========================================================================
    // Redireccionar la pagina
    const goTo = (path: string) => {
        history.push(path);
    }
    // ========================================================================


    // ========================================================================
    // Cerrar la sesion del usuario
    const getBack = () => {
        if(useLocalStorage('rememberMe').getValue() === 'true'){ 
            useLocalStorage('rememberMe').setValue('false');
        }

        history.push("/login");
    }
    // ========================================================================

    // Pagina Home
    return (
        <>  
            {/* Menu de la aplicacion */}
            <IonMenu side="end" contentId="main-content">
                
                {/* Header del menu */}
                <IonHeader className="no-shadow">
                    <div className="flex-row align-center ion-padding gap-15-px">
                        <IonAvatar className="icon-mid width-max height-max">
                            <IonImg className="width-max height-max" src={url}/>
                        </IonAvatar>
                        <IonLabel className="font-bold">{name}</IonLabel>
                    </div>
                </IonHeader>

                {/* Contenido del menu */}
                <IonContent>
                    <IonList lines="none" className="padding-0">

                        <IonItem button className="ion-main-bg ripple-color-look" onClick={() => goTo("/settings")}>
                            <IonLabel className="font-bold">Settings</IonLabel>
                        </IonItem>

                        <IonItem button className="ion-main-bg ripple-color-look" onClick={() => getBack()}>
                                <IonLabel className="font-bold">Log out</IonLabel>
                        </IonItem>

                    </IonList>
                </IonContent>

            </IonMenu>


            {/* Contenido del home */}
            <IonContent fullscreen={true} id="main-content">

                <IonHeader translucent={true} className="fixed">

                    {/* Logo de la aplicacion, por ahora es la del bitcoin */}
                    {/* Foto de perfil del usuario, por ahora es uno generico */}
                    <div className="flex-row flex-between align-center opaque-bg">
                        <IonImg className="icon-min margin-left-2" alt="logo" src="./fish.png" />
                        <IonButton slot="start" className="ion-border-circle ion-txt-look ripple-color-look icon-min margin-right-2 no-shadow ion-transparent"><IonMenuButton /></IonButton>
                    </div>
                    
                </IonHeader>

                {/* Contenido del home */}
                <IonContent scrollX={true} className="ion-grad">

                    {/* Mostrando una caja naranja */}
                    <div className="width-100-pe opaque-bg height-120"></div>

                        <div className="ion-padding">
                            <div className="flex-column flex-between width-100-pe gap-15-px">

                            {/* Mensaje de bienvenida al usuario */}
                            <div className="flex-row flex-start align-center gap-3-vw">
                                <IonAvatar className="flex-row flex-center align-center icon-mid width-max height-max">
                                    <IonImg className="width-max height-max" src={url} />
                                </IonAvatar>
                                <div className="text-left font-25 ion-padding">Welcome {name} !!</div>
                            </div>

                            {/* Recomendaciones para el usuario, en el futuro tendra mas protagonismo*/}
                            <div className="flex-column">

                                {/* Aqui se mostraran la musica recomendada */}
                                <ShowSlides clases="border-circle-15" tipo="songs" title="Recomendations" type={songs} spaceBetween={0.1} SlidesPerView={2}/>

                                {/* Nuevo album salido o insertado dentro de la aplicacion */}
                                <ShowRelease type="games" data={gamelist[1]}/>
                                
                                {/* Top Tracks mas escuchados de la plataforma */}
                                <ShowTop tipo="songs" title="Top Tracks" type={songs}/>
                                
                                {/* Soundtracks de videojuegos */}
                                <ShowSlides clases="border-circle-15" tipo="games" title="Game sountracks" type={gamelist} spaceBetween={0.1} SlidesPerView={1}/>
                            
                            </div>
                        </div>
                    </div>

                    {/* Mostrando una caja naranja */}
                    <div className="width-100-pe height-120"></div>

                </IonContent>
            </IonContent>
        </>
    );
}

export default Home;