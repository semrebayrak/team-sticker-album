import { useNavigate, BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import './css/cover.css';
import TeamsContext from './context/TeamsContext';
import { useState, useEffect, useContext } from 'react';
import Stickersets from './components/stickersets';




export const Cover = () => {

  const routerHistory = useNavigate();


  const teams = useContext(TeamsContext)

  const [lastStickerDate, setLastStickerDate] = useState();

  const [stickerData, setStickerData] = useState(new Date());
  

  function diffHoursMoreThan24(date) {

    var diff = (Date.now() -date) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff)) > 24;

  }

  useEffect(() => {
    const fetchStickerInfo = async () => {

      await fetch("http://localhost:8000/user").then(res => res.json()).then(result => setStickerData(result));

    }
    const fetchLastStickerDate = async () => {

      await fetch("http://localhost:8000/user").then(res => res.json()).then(result => setLastStickerDate(result.laststickerdate));

    }
    fetchLastStickerDate();
    fetchStickerInfo();

  }, [])



  const changePage = () => {

    routerHistory(`/${(1)}/${teams[0].name.replaceAll(" ", "").toLowerCase()}`);
  }
  return (

    <>
      {
        diffHoursMoreThan24(lastStickerDate)&&stickerData.remaindailysticker>0 && <Stickersets teams={teams} user={stickerData} />
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