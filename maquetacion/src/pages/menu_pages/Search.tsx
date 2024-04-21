import { IonInput, IonContent, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonCardSubtitle } from "@ionic/react";
import '../../styles/menu styles/Search.css';
import {cards} from "../../components/cards";


const Search = () => {
    return (
        <IonContent>

            <div className="contenedor-search">

                {/* Barra de busqueda */}
                <IonItem lines="full" className="search-bar">
                    <IonInput
                        type="text"
                        placeholder="Search for a song"
                    ></IonInput>
                </IonItem>
            

                {/* Texto de busqueda reciente */}
                <p className="text-search">Recent searches</p>

                {/* Lista de canciones buscadas */}
                <div className="contenedor-songs">    
                    <IonCardContent className="search-list">
                        <IonList className="search-list">

                            {cards.map((card) => {
                                return(
                                    <IonItem key={card.id} button={true} className="song-searched">
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
            </div>
        </IonContent>
    );
}

export default Search;