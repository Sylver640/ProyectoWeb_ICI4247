import {playlist} from '../../Data/playlist';
import { IonList, IonCard, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import React from 'react';

interface playlistInfo{
    id: number,
    name: string,
    url: string
}

interface list{
    list: playlistInfo[]
}

const ListPlaylist: React.FC = () => {
    const history = useHistory();

    const goto = (path: string) => {
        history.push(path);
    };

    return(
        <div >
            <IonList className='opaque-total'>
                {playlist.map((card) => {
                    return(
                        <IonCard 
                            button key={card.id} 
                            className='ion-main-bg ion-wff-txt font-size-20 text-center ion-padding font-bold ripple-color-look'
                            onClick={() => goto(`/tunebytes/playlist/${card.id}`)}
                            >
                            <img alt="Playlist" src={card.url} />
                            <IonText>{card.name}</IonText>
                        </IonCard>
                    );
                })}
            </IonList>
        </div>
    );
};

export default ListPlaylist;
