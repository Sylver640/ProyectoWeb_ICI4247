import React from 'react';
import { 
    IonContent, 
    IonCardContent, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonAvatar,
    IonImg
} from "@ionic/react";

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Search = () => {
    return (
        <IonContent>
            <IonHeader>
                <div className='flex-column padding-top-15'>
                    <div className='flex-row ion-padding'>
                        <IonAvatar className="icon-min width-max height-max">
                            <IonImg className="width-max height-max" src="https://www.w3schools.com/howto/img_avatar.png" />
                        </IonAvatar>

                        <IonTitle className='font-size-25'>Search</IonTitle>
                    </div>

                    <IonToolbar className='ion-main-bg'>
                        <IonSearchbar 
                            className='ion-wff-bg ion-txt-look ion-border-circle-15'
                            placeholder="What do you want to hear?"
                        ></IonSearchbar>
                    </IonToolbar>
                </div>
            </IonHeader>

            <div className="flex-column flex-center ion-padding gap-5-px">

                {/* Lista de canciones buscadas */}
                <div className='flex-column flex-start'>
                    
                    {/* Texto de busqueda reciente */}
                    <h2 className="font-bold ion-margin">Recent searches</h2>

                    <IonCardContent className='main-bg margin-0 padding-0'>
                    </IonCardContent>
                </div>
            </div>
        </IonContent>
    );
}

export default Search;