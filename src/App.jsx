import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import './App.css';
import MatchCardGame from "./pages/MatchCardGame";

const App=()=>{
    return(
        <div id="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/game/0" element={<MatchCardGame/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App;