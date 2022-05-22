
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Cover from './Cover';
import { useState, useEffect, useContext } from 'react';
import { TeamsProvider } from './context/TeamsContext';
import './css/app.css';
function App() {


  return (


    <TeamsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/:page/:teams" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </TeamsProvider>


  );
}

export default App;
