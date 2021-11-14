import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './views/Login.js'
import Home from './views/Home.js'
import Summoner from './views/Summoner.js'
import TierList from './views/TierList.js'
import Champions from './views/Champions.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="summoner/:summonerName" element={<Summoner />}/>
        <Route path="tier-list/:gameType/:gameMode/:lane/:role" element={<TierList />}/>
        <Route path="champions" element={<Champions />}/>
        <Route path="" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
