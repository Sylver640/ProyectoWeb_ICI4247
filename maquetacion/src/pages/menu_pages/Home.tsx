import { 
    IonContent, 
    IonHeader,  
    IonCard, 
    IonCardSubtitle, 
    IonCardHeader, 
    IonCardTitle, 
    IonImg, 
    IonCardContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonIcon
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import '../../styles/menu styles/Home.css';
import {cards} from "../../components/cards";
import {logoBitcoin} from 'ionicons/icons';

const Home = () => {
    return (
        <IonContent fullscreen={true}>

            <IonHeader translucent={true}>

                {/* Logo de la aplicacion, por ahora es la del bitcoin */}
                {/* Foto de perfil del usuario, por ahora es uno generico */}
                <div className="header-menu">
                    <IonIcon icon={logoBitcoin} size="large"></IonIcon>
                    <IonAvatar id="usuario-avatar">
                        <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                </div>
                
            </IonHeader>

            {/* Contenido del home */}
            <IonContent scrollX={true} scrollY={true}>

                <div className="contenedor-menu">

                    {/* Mensaje de bienvenida al usuario */}
                    <div className="welcome-text">
                        <IonAvatar id="usuario-avatar-small">
                            <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>
                        <div className="titulo-scroll">Welcome User !!</div>
                    </div>

                    {/* Recomendaciones para el usuario, en el futuro tendra mas protagonismo*/}
                    <div className="scroll-horizontal-header">

                        <div className="titulo-scroll">Recomendations</div>

                        {/* Aqui se mostraran la musica recomendada */}
                        <div className="horizontal">

                            {cards.map((card) => {
                                return(
                                <IonCard key={card.id} id="song-card">
                                    <IonCardHeader>
                                        <IonCardTitle>{card.title}</IonCardTitle>
                                        <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>
                            );
                            })}

                    </div>
                        
                        {/* Nuevo album salido o insertado dentro de la aplicacion */}
                        <div className="contenedor-menu">
                            <div className="titulo-scroll-center">New Release</div>
                            <IonCard id="new-release">
                                <IonCardTitle>Album</IonCardTitle>
                            </IonCard>
                        </div>
                        
                        {/* Top Tracks mas escuchados de la plataforma */}
                        <div>
                            <div className="titulo-scroll-center">Top Tracks</div>

                            <IonCardContent className="lista-track">
                                <IonList inset={true} className="lista-track">

                                    {cards.map((card) => {
                                        return(
                                            <IonItem key={card.id} button={true} id="song-tracklist">
                                                <IonThumbnail slot="start">
                                                    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                                </IonThumbnail>
                                                <IonLabel>{card.title}</IonLabel>
                                            </IonItem>
                                    );
                            })}
                                </IonList>
                            </IonCardContent>
                        </div>
                        
                        {/* Soundtracks de videojuegos */}
                        <div className="scroll-horizontal-header">

                            <div className="titulo-scroll">Game soundtracks</div>

                                <div className="horizontal">

                                    {cards.map((card) => {
                                        return(
                                            <IonCard key={card.id} id="game-card">
                                                <IonCardHeader>
                                                    <IonCardTitle>{card.game}</IonCardTitle>
                                                </IonCardHeader>
                                            </IonCard>
                                            );
                                        })}

                                </div>
                            </div>
                        </div>

                </div>

            </IonContent>
        </IonContent>
    );
}

export default Home;