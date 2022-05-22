import { useState, useEffect, useContext } from 'react';
import TeamsContext from '../context/TeamsContext';


export const Stickers = (props) => {


    var teams = props.teams
    var people = []
    var allUnlocked = true



    const clickButton = async () => {

        if (props.user.remaindailysticker == 1 || allUnlocked == true)
            await updateDate()

        await updateTeams();
        if (allUnlocked == true)
            await updateRemainSets("reset"); // tüm hepsi açılmışsa kullanıcıyı yormadan ekranı geçmek için remain setsi 0 lıyoruz
        else
            await updateRemainSets();

    }
    const updateDate = async () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ laststickerdate: Date.now().toString() })

        };
        await fetch("http://localhost:8000/user", requestOptions)
    }
    const updateRemainSets = async (reset) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ remaindailysticker: props.user.remaindailysticker - (reset == null ? 1 : props.user.remaindailysticker) })

        };
        await fetch("http://localhost:8000/user", requestOptions)
    }
    const updateTeams = async () => {
        people.forEach(element => {
            teams[element.teamIndex].members[element.memberIndex].locked = false;
        })


        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: teams })
        };


        await fetch(`http://localhost:8000/teams`, requestOptions)



    }
    const getStickers = () => {

        var lockedPeople = []
        var stickers = []
        allUnlocked = false

        for (let i = 0; i < teams.length; i++) {
            for (let j = 0; j < teams[i].members.length; j++) {

                if (teams[i].members[j].locked == true)
                    lockedPeople.push({ 'teamIndex': i, 'memberIndex': j })
            }

        }
        if (lockedPeople.length == 0) {

            allUnlocked = true
            return <h1 style={{ color: "black", backgroundColor: "transparent" }}>CONGRATULATIONS No Stickers To Open</h1>

        }

        for (let i = 0; i < 6; i++) {


            let randomIndex = Math.floor(Math.random() * lockedPeople.length)
            let person = lockedPeople[randomIndex];
            people.push(person)
            stickers.push(


                <div key={i} className="sticker-set">
                    <div className="sticker-content">


                        <img className="sticker-photo" src={teams[person.teamIndex].members[person.memberIndex].photo} alt="" />
                        <h2> trendyol </h2>
                        <p className="tech">Tech</p>
                        <div className="info">

                            <p>{teams[person.teamIndex].members[person.memberIndex].name}</p>
                            <p>{teams[person.teamIndex].members[person.memberIndex].position}</p>
                            <p>{teams[person.teamIndex].members[person.memberIndex].duration}</p>

                        </div>
                    </div>


                </div>


            )
        }

        return stickers


    }


    return (

        <>

            <div className="content">

                {getStickers()}
            </div>

            <button onClick={() => { clickButton() }} className="paste-button">PASTE TO YOUR ALBUM</button>

        </>
    )
}