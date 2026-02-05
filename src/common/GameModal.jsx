import HomeBtn from "./HomeBtn";
import NextLevelBtn from "./NextLevelBtn";
import RestartBtn from "./RestartBtn";
import './GameModal.css';

const GameModal = ({restartGame,isOver,nextLevel}) => {
    return (
        <div id="GameModal">
            <div className="modal-overlay">
                <div className="modal-content">
                <p>{isOver ?"게임이 끝났습니다!" :"게임을 클리어했습니다"}</p>
                {isOver 
                ? <RestartBtn restartGame={restartGame}/>
                 : <NextLevelBtn nextLevel={nextLevel} />}
                <HomeBtn/>
            </div>
            </div>
            
        </div>
    );
};

export default GameModal;
