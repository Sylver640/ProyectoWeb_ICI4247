import { IonContent, IonHeader, IonTitle, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonImg, IonText} from "@ionic/react";
import { IonAvatar } from '@ionic/react';
import '../../styles/menu styles/Home.css';
import {cards} from "../../components/cards";


const Home = () => {
    return (
        <IonContent fullscreen={true}>

            <IonHeader translucent={true}>

                <div className="header-menu">
                    <IonTitle>TuneBytes</IonTitle>
                    <IonAvatar id="usuario-avatar">
                        <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                    </IonAvatar>
                </div>
                
            </IonHeader>

            <IonContent scrollX={true}>

                <div className="contenedor-menu">

                    <div className="welcome-text">
                        <IonAvatar id="usuario-avatar-small">
                            <IonImg className="img-user" src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>
                        <div className="titulo-scroll">Welcome User !!</div>
                    </div>

                    <div className="scroll-horizontal-header">

                        <div className="titulo-scroll">Titulo</div>

                        <div className="horizontal">

                            {cards.map((card) => {
                                return(
                                <IonCard key={card.id}>
                                    <IonCardHeader>
                                        <IonCardTitle>{card.title}</IonCardTitle>
                                        <IonCardSubtitle>{card.subtitle}</IonCardSubtitle>
                                    </IonCardHeader>
                                </IonCard>
                            );
                            })}

                        </div>

                    </div>

                </div>

            </IonContent>
        </IonContent>
    );
}

export default Home;