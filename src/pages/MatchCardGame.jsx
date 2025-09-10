import { useEffect, useState } from 'react';
import Card from '../components/matchcard/Card';
import './MatchCardGame.css';
import HomeBtn from '../common/HomeBtn';

const MatchCardGame = () => {
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [lockBoard, setLockBoard] = useState(false);

    // 게임 시작 또는 재시작
    const startGame = async () => {
        setScore(0);
        setFirstCard(null);
        setSecondCard(null);
        setLockBoard(false);

        try {
            const res = await fetch('/data/cards.json');
            const data = await res.json();
            const newCards = [...data, ...data]
                .sort(() => Math.random() - 0.5)
                .map((card) => ({ ...card, id: Math.random() })); // 고유 id 추가
            setCards(newCards);
        } catch (error) {
            console.error('Failed to fetch cards:', error);
        }
    };

    useEffect(() => {
        startGame();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // 카드 뒤집기 로직
    const handleFlip = (clickedCard) => {
        if (lockBoard || clickedCard.id === firstCard?.id) return;

        if (!firstCard) {
            setFirstCard(clickedCard);
            return;
        }

        setSecondCard(clickedCard);
        setScore((prevScore) => prevScore + 1);
        setLockBoard(true);
    };

    // 두 카드가 선택된 후 매치 확인
    useEffect(() => {
        if (firstCard && secondCard) {
            const isMatch = firstCard.name === secondCard.name;

            if (isMatch) {
                // 매치 성공: 다음 렌더링에서 'flipped' 클래스 유지
                resetCards();
            } else {
                // 매치 실패: 1초 후 뒤집기
                setTimeout(() => {
                    resetCards();
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    // 보드 초기화 및 카드 상태 업데이트
    const resetCards = () => {
        if (firstCard && secondCard) {
            const updatedCards = cards.map((card) => {
                if (card.id === firstCard.id || card.id === secondCard.id) {
                    return {
                        ...card,
                        isFlipped: true,
                        isMatched: firstCard.name === secondCard.name,
                    };
                }
                return card;
            });
            setCards(updatedCards);
        }

        setFirstCard(null);
        setSecondCard(null);
        setLockBoard(false);
    };
    return (
        <div id="MatchCardGame">
            <h1>카드 맞추기 게임</h1>
            
            <div className="grid-container">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        handleFlip={handleFlip}
                        isFlipped={
                            card.isMatched ||
                            firstCard?.id === card.id ||
                            secondCard?.id === card.id
                        }
                    />
                ))}
            </div>
            <div className="score">시도: {score}번</div>
            <button onClick={startGame}>재시작</button>
            <HomeBtn/>
        </div>
    );
};

export default MatchCardGame;
