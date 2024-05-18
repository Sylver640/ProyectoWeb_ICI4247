import { IonCard, IonRouterLink} from '@ionic/react';
import React from 'react';

interface Song{
    _id: string,
    name: string,
    duration: string,
    duration_ms: number,
    url: string,
    game: string,
    game_id: string
}


interface ShowReleaseProps {
    type: 'games' | 'songs';
    data: Song;
}

const ShowRelease: React.FC<ShowReleaseProps> = ({type, data}) => {

    if(!data){return null;}

    return(
        <div className="flex-column flex-between width-100-pe ion-padding gap-15-px">
            <div className="text-center font-bold font-size-25 ion-padding">New Release</div>
             <IonRouterLink key={data._id} routerLink={`/tunebytes/${type}/${data._id}`}>
               <IonCard button className="ion-main-border ion-border-circle-15 text-center height-320 ripple-color-look">
                    <img alt="Silhouette of mountains" src={data.url} />
                </IonCard>
            </IonRouterLink> 
        </div>
    );

};

export default ShowRelease;