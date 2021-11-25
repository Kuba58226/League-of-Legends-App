import './App.css';
import React, {useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './views/Login.js'
import Register from './views/Register.js'
import Home from './views/Home.js'
import Summoner from './views/Summoner.js'
import TierList from './views/TierList.js'
import Champions from './views/Champions.js'
import Champion from './views/Champion.js'
import LiveGame from './views/LiveGame.js'
import {contextObject,AppContext} from './AppContext';

function App() {
  const [loggedIn,setLoggedIn] = useState(contextObject.isUserLogged)
  const [token,setToken] = useState(contextObject.jwtToken)
  const [role,setAccountType] = useState(contextObject.accountType)

  return (
    <BrowserRouter>
      <AppContext.Provider value={{isUserLogged:loggedIn,toggleLoggedState:setLoggedIn,jwtToken:token,toggleTokenState:setToken,userRole:role,toggleRoleState:setAccountType}}>
        <Routes>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="summoner/:summonerName" element={<Summoner />}/>
          <Route path="tier-list/:gameType/:gameMode/:lane/:role" element={<TierList />}/>
          <Route path="champions" element={<Champions />}/>
          <Route path="champion/:champion" element={<Champion />}/>
          <Route path="live-game/:summonerName" element={<LiveGame />}/>
          <Route path="" element={<Home />}/>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
