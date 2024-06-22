import React, { useState, useEffect } from 'react';
import { 
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonAvatar,
    IonImg,
    IonButton,
    IonList,
    IonItem,
    IonLabel
} from "@ionic/react";
import useApi from '../../hooks/apiCall';
import { useHistory } from 'react-router';

// Import de los themes css
import "../../theme/contenedores.css";
import "../../theme/position.css";
import "../../theme/ion.css";
import "../../theme/text.css";
import "../../theme/icon.css";

const Search = () => {
    const { searchData } = useApi();
    const [selectedOption, setSelectedOption] = useState<string>('songs');
    const [songList, setSongList] = useState<any[]>([]);
    const [gameList, setGameList] = useState<any[]>([]);
    const [results, setResults] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const list_songs = await searchData('songs','');
                setSongList(list_songs);

                const list_games = await searchData('games','');
                setGameList(list_games);
                
            }
            catch(e){
                console.log(e);
            }
        };

        fetchData();
    }, []);

    const  handleButtonClick = (option: string) => {
        setSelectedOption(option);

        if(option === 'songs'){
            setResults(songList);
        }else{
            setResults(gameList);
        }
    }

    const handleInput = (e: any) => {
        const target = e.target as HTMLIonSearchbarElement;
        const query = target?.value?.toLowerCase() || '';

        if (selectedOption === 'songs') {
            setResults(songList.filter(song => song.name.toLowerCase().includes(query)));
        } else if (selectedOption === 'games') {
            setResults(gameList.filter(game => game.name.toLowerCase().includes(query)));
        }
    }

    const handleNavigate = (id: string) => {{
        history.push(`/tunebytes/${selectedOption}/${id}`);
    }}

    return (
        <IonContent className='ion-grad'>
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
                            placeholder="What do you want to search?"
                            debounce={1000}
                            onIonInput={(e) => handleInput(e)}
                        ></IonSearchbar>
                    </IonToolbar>
                </div>
            </IonHeader>

            <div className="flex-column flex-center ion-padding gap-5-px">

                {/* Opciones de búsqueda */}
                <div className="flex-row gap-15-px ion-padding">

                    <IonButton 
                    className={`ion-border-circle ${selectedOption === 'songs' ? 'ion-main-look' : 'ion-gray-bg'}`}
                    onClick={() => handleButtonClick('songs')}
                    >
                    Songs</IonButton>

                    <IonButton 
                    className={`ion-border-circle ${selectedOption === 'games' ? 'ion-main-look' : 'ion-gray-bg'}`}
                    onClick={() => handleButtonClick('games')}
                    >
                    Games</IonButton>

                </div>

            </div>

            <IonList>
                {results.map((item, index) => {
                    console.log(item);
                    return(
                        <IonItem key={item._id} button className='no-shadow ripple-color-look' onClick={() => handleNavigate(item._id)}>
                            <IonAvatar aria-hidden="true" slot='start'>
                                <img src={item.url} alt="imagen"/>
                            </IonAvatar>
                            <IonLabel className='font-bold'>{item.name}</IonLabel>
                        </IonItem>
                    );
                })}
            </IonList>

        </IonContent>
    );
};

export default Search;