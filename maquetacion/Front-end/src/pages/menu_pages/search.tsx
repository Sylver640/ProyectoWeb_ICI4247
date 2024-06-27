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
import { useLocalStorage } from '../../Data/useLocalStorage';

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
    const [url, setUrl] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const list_songs = await searchData('songs','');
                setSongList(list_songs);

                const list_games = await searchData('games','');
                setGameList(list_games);

                let url = useLocalStorage('url').getValue();
                setUrl(url);
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
            setResults(selectRandomElement(songList, 9));
        }else{
            setResults(selectRandomElement(gameList, 2));
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

    const selectRandomElement = (list:any[], count:number) => {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <IonContent className='ion-grad'>
            <IonHeader>
                <div className='flex-column padding-top-15'>
                    <div className='flex-row ion-padding'>
                        <IonAvatar className="icon-min width-max height-max">
                            <IonImg className="width-max height-max" src={url} />
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

            <IonList className='no-shadow opaque-total ion-margin'>
                {results.map((item, index) => {
                    return(
                        <IonItem key={item._id} button className='no-shadow ion-transparent ion-border-transparent' onClick={() => handleNavigate(item._id)}>
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