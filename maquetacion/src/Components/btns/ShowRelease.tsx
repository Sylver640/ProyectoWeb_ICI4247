import { IonCard, IonRouterLink} from '@ionic/react';
import {cards} from '../../Data/cards';
import React from 'react';

const ShowRelease: React.FC = () => {

    return(
        <div className="flex-column flex-between width-100-pe ion-padding gap-15-px">
            <div className="text-center font-size-25 ion-padding">New Release</div>
            <IonRouterLink key={cards[2].id} routerLink={`/tunebytes/games/${cards[2].id}`}>
                <IonCard button className="ion-main-border ion-border-circle-15 text-center height-320 ripple-color-look">
                    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                </IonCard>
            </IonRouterLink>
        </div>
    );

};

export default ShowRelease;