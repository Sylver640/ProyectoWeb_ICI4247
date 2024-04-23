import { IonInput, IonContent, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonCardSubtitle } from "@ionic/react";
import {cards} from "../../Data/cards";

import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Search = () => {
    return (
        <IonContent>

            <div className="flex-column flex-center ion-padding gap-5-px">

                {/* Barra de busqueda */}
                <IonItem lines="full" className="ion-web-bg ion-main-txt ion-border-circle ion-border ion-tertiary ion-border-main">
                    <IonInput
                        type="text"
                        placeholder="Search for a song"
                    ></IonInput>
                </IonItem>

                {/* Lista de canciones buscadas */}
                <div className='flex-column flex-start'>
                    
                    {/* Texto de busqueda reciente */}
                    <h2 className="font-bold ion-margin">Recent searches</h2>

                    <IonCardContent className='main-bg margin-0 padding-0'>
                        <IonList className='main-bg margin-0 padding-0'>

                            {cards.map((card) => {
                                return(
                                    <IonItem key={card.id} button={true} className="ripple-color-look ion-main-bg ion-border-main ion-wf5-txt width-100-pe">
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