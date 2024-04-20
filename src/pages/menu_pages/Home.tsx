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
    IonButton
} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import '../../styles/menu styles/Home.css';
import {cards} from "../../components/cards";

const Home = () => {
    return (
        <IonContent fullscreen={true}>

            <IonHeader translucent={true}>

                <div className="header-menu">

                    <div className="header-items">
                            <IonButton className="header-item">Podcast</IonButton>
                            <IonButton className="header-item">Playlist</IonButton>
                    </div>

                    <IonAvatar id="usuario-avatar">
                        <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                </div>
                
            </IonHeader>

            <IonContent scrollX={true} scrollY={true}>

                <div className="contenedor-menu">

                    <div className="welcome-text">
                        <IonAvatar id="usuario-avatar-small">
                            <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>
                        <div className="titulo-scroll">Welcome User !!</div>
                    </div>

                    <div className="scroll-horizontal-header">

                        <div className="titulo-scroll">Recomendations</div>

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

                        <div className="contenedor-menu">
                            <div className="titulo-scroll-center">New Release</div>
                            <IonCard id="new-release">
                                <IonCardTitle>Album</IonCardTitle>
                            </IonCard>
                        </div>

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