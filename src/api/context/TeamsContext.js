import React, { useState, createContext, useEffect } from 'react'
import { useCallback } from 'react';

const TeamsContext = createContext()

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState();

    const fetchPeople = useCallback(async () => {

        await fetch("http://localhost:8000/teams").then(res => res.json()).then(result => setTeams(result.data));


    }, [])
    useEffect(() => {



        fetchPeople();


    }, [fetchPeople])




    return <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>
}

export default TeamsContext 