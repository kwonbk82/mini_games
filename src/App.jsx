import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import './App.css';
import MatchCardGame from "./pages/MatchCardGame";
import { RulePage,HomePage } from "./pages";
import { useEffect, useState } from "react";
import axios from "axios";

const App=()=>{
    const {id} = useParams();
    const [isReady, setIsReady] = useState(false);
    const [lists, setLists] = useState([]);


    const fetchGame = async () => {
        try {
            const res = await axios.get('/data/minigames.json');
            setLists(res.data);
        } catch (e) {
            console.error('데이터 로딩 실패 :', e); // console.e를 console.error로 수정
        } finally {
            setIsReady(true);
        }
    };

    useEffect(() => {
        fetchGame();
    }, []);

    if (!isReady) {
        return <div>로딩 중...</div>;
    }

    return(
        <div id="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage lists={lists} />}/>
                    <Route path="/:id" element={<RulePage lists={lists}/>}/>
                    <Route path="/game/0" element={<MatchCardGame/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App;