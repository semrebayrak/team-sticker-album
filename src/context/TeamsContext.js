import React, { useState, createContext, useEffect } from 'react'

const TeamsContext = createContext()

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState();
    useEffect(() => {
        const fetchPeople = async () => {

            await fetch("http://localhost:8000/teams").then(res => res.json()).then(result => setTeams(result.data));

        }


        fetchPeople();
        

    }, [])



    
    return <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
}

export default TeamsContext 