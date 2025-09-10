const MatchCardGame = () => {
    return (
        <div id="MatchCardGame">
            <h1>Memory Cards</h1>
            <div class="grid-container"></div>
            <p>
                Score: <span class="score"></span>
            </p>
            <div class="actions">
                <button onclick="restart()">Restart</button>
            </div>
        </div>
    );
};

export default MatchCardGame;
