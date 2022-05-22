import { useNavigate, BrowserRouter, Routes, Route, Outlet, useParams } from 'react-router-dom';
import TeamsContext from '../context/TeamsContext';
import React, { useState, useEffect, useContext } from 'react';





export const Home = (props) => {
  const routerHistory = useNavigate();
  const [discoveredPeople, setDiscoveredPeople] = useState(0);
  const lockedImage = "../assets/anon.png"
  let { page } = useParams();

  try { // reflesh atılırsa diye local storageda tutuyoruz
    var teams = useContext(TeamsContext)
    var team = teams[page - 1]
    localStorage.setItem('team', JSON.stringify(team))
  }
  catch (err) {
    var team = JSON.parse(localStorage.getItem('team'));
  }



  useEffect(() => {
    let ct = 0;
    for (let index = 0; index < team.members.length; index++) {
      if (team.members[index].locked != true) {
        ct++;
      }

    }
    setDiscoveredPeople(ct)
  }, [])

  const changePage = (direction) => {
    if (page == 1 && direction == -1)
      routerHistory('/')
    else
      routerHistory(`/${(Number(page) + direction)}/${teams[page - 1 + direction].name.replaceAll(" ", "").toLowerCase()}`)
  }

  return (
    <React.Fragment data-testId={'Home'}>
      <img style={{ position: 'absolute', width: '10vw', left: '-1%', zIndex: 20, top: '50%', transform: 'rotate(180deg)' }} onClick={() => changePage(-1)} src="../assets/nextpage.png" alt="" />
      <img style={{ position: 'absolute', width: '10vw', right: '-1%', zIndex: 20, top: '50%' }} onClick={() => changePage(1)} src="../assets/nextpage.png" alt="" />

      {

        <div style={{ position: 'fixed', bottom: '-30px', right: '25%', zIndex: 20, fontSize: '40px', width: '50%', textAlign: 'center' }}>
          <p style={{ fontSize: '30px' }}>
            <b>
              {discoveredPeople > 0 ? `${discoveredPeople} People Found in ${team.name}`
                :
                "Empty Team Space, There is not Any Team Member Found Yet"}
            </b>

          </p>
        </div>


      }

      <div className="book">
        <div className="cover pg1">

          <img className="team-logo" src={team.logo} alt="" />


          <div data-testId="team-name" className="team-name">

            <h1>{team.name}</h1>
          </div>




          <h2 className="team-motto"> {team.motto}</h2>

          <h3> {team.description}</h3>

          <h3> {team.contact}</h3>



        </div>
        <div className="cover pg2">

          {
            team.members.map((member, index) => {

              return (
                <div key={member.name} className={`person p${index}`}>

                  <div className="photo">

                    <img className={member.locked && "discovered-image"} src={member.locked ? lockedImage : member.photo} alt="" />
                  </div>
                  <p> {member.name ?? ""}</p>
                  <p> {member.position ?? ""}</p>
                  <p> {member.duration ?? ""}</p>
                </div>
              )
            }
            )
          }

        </div>

      </div>

    </React.Fragment>

  )
}
export default Home;