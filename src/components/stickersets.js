import { useNavigate, BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import '../css/dailysticker.css';

import { useState, useEffect, useContext } from 'react';
import TeamsContext from '../context/TeamsContext';
import { Stickers } from './stickers';



export const Stickersets = (props) => {

    const [stickerClicked, setStickerClicked] = useState(false)
    const lockedImage = "../assets/anon.png"

    const getStickerSets = () => {
        let content = [];
        for (let i = 0; i < props.user.remaindailysticker; i++) {

            content.push(


                <div key={i} className="sticker set">
                    <div className="sticker-content">

                        <div className="ribbon">
                            <h3> </h3>

                        </div>
                        <img style={{ width: '60%' }} src={lockedImage} alt="" />
                        <h2> trendyol </h2>
                        <p className="tech">Tech</p>
                    </div>


                    <button onClick={() => { setStickerClicked(true); }} className="sticker-button">OPEN</button>

                </div>
            );
        }
        return content;

    }


    return (

        <div data-testId="overlay-div" className="overlay">
            <div className="sticker-container">
                {
                    stickerClicked ?
                        <Stickers teams={props.teams} user={props.user} setStickerClicked={setStickerClicked}/>
                        :
                        <>
                            <h1>Daily Sticker Sets <br /> You have {props.user.remaindailysticker} Sticker Sets To Open</h1>
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

export default Stickersets
