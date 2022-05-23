import '../css/sticker.css';
import { useState } from 'react';
import StickerSet from './stickerset';
import Sticker from './sticker';



export const DailyStickers = (props) => {

    const [stickerClicked, setStickerClicked] = useState(false)
    const remaindailysticker = props.remaindailysticker
    const getStickerSets = () => {
        let content = [];
        for (let i = 0; i < remaindailysticker ; i++) {
            content.push(
                <div key={i} className="sticker set">
                    <Sticker/>
                    <button onClick={() => { setStickerClicked(true); }} className="sticker-button">OPEN</button>
                </div>
            );
        }
        return content;

    }
    return (

        <div className="overlay">
            <div className="sticker-container">
                {
                    stickerClicked ?
                        <StickerSet teams={props.teams} remaindailysticker={remaindailysticker} setStickerClicked={setStickerClicked} />
                        :
                        <>
                            <h1>Daily Sticker Sets <br /> You have {remaindailysticker} Sticker Sets To Open</h1>
                            <div className="content">
                                {
                                    getStickerSets()
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default DailyStickers
