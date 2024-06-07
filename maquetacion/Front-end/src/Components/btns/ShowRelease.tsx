import { IonCard} from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';

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
    const history = useHistory();

    const handleNavigate = (dataId: string) => {{
        history.push(`/tunebytes/${type}/${dataId}`);
    }}

    if(!data){return null;}

    return(
        <div className="flex-column flex-between width-100-pe ion-padding gap-15-px">
            <div className="text-center font-bold font-size-25 ion-padding">New Release</div>
             <div key={data._id} onClick={() => handleNavigate(data._id)}>
               <IonCard button className="ion-main-border ion-border-circle-15 text-center height-320 ripple-color-look">
                    <img alt="Silhouette of mountains" src={data.url} />
                </IonCard>
            </div> 
        </div>
    );

};

export default ShowRelease;