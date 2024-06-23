import AudioPlayer from 'react-h5-audio-player';
import React from 'react';

import 'react-h5-audio-player/lib/styles.css';
import "../../theme/music.css";

interface source{
    src: string
    name: string
    url: string
    game: string
}

const SongPlayer: React.FC<source> = ({src, name, url, game}) => {

    return(
        <div>
            <div className="flex-column flex-center align-center gap-15-px">
                
                <div className="width-100-pe opaque-bg height-120"></div>

                <div className="flex-column flex-center align-center ion-padding">
                    <img src={url} alt="Album Cover" className="border-circle-15" />
                    <h2>{name}</h2>
                    <h3 className="gray-txt">{game}</h3>
                </div>

            </div>

        <AudioPlayer
            className="player"
            autoPlay={false}
            showJumpControls={false}
            showSkipControls={true}
            showFilledVolume={true}
            src={src}
            autoPlayAfterSrcChange={false}
        />

    </div>
    );
};

export default SongPlayer;