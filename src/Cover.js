import { useNavigate, BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import './css/cover.css';
import TeamsContext from './api/context/TeamsContext';
import { useState, useEffect, useContext, useRef } from 'react';
import Stickersets from './components/dailystickers';
import { useCallback } from 'react';
import { fetchStickerInfo } from './api/service';




export const Cover = () => {

  const routerHistory = useNavigate();
  const teams = useContext(TeamsContext)
  const [remainDailySticker, setRemainDailySticker] = useState(0)
  const [lastStickerDate, setLastStickerDate] = useState('')




  const fetchData = useCallback(async () => {
    var tempData = await fetchStickerInfo();
    console.log(tempData)
    setLastStickerDate(tempData.lastStickerDate)
    setRemainDailySticker(tempData.remainDailySticker)
  
  }, [])

  useEffect(() => {


    fetchData();

  }, [])



  const changePage = () => {

    routerHistory(`/${(1)}/${teams[0].name.replaceAll(" ", "").toLowerCase()}`);
  }
  return (

    <>
      {
        remainDailySticker > 0 && <Stickersets teams={teams} remaindailysticker={remainDailySticker} />
      }
      <img style={{ position: 'absolute', width: '10vw', right: '-1%', zIndex: 20, top: '50%' }} onClick={() => changePage()} src="../assets/nextpage.png" alt="" />
      <h1>Team Sticker Album</h1>
      <div className="cover">
        <div className="background">

          <h1 className="trendyol-h">Trendyol</h1>

          <p><b>Team Sticker Album</b></p>


          <div className="circle">


            <div className="mouth" />
            <div className="mouth-cover"></div>

          </div>


        </div>
      </div>
    </>

  )
}

export default Cover;