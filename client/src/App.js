import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './views/Login.js'
import Home from './views/Home.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}/>
        <Route path="" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
