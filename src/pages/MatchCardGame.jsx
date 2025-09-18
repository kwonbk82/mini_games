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
    const [ishard,setIsHard] = useState(false);

    // 게임 시작 또는 재시작
    const startGame = async () => {
        setScore(0);
        setFirstCard(null);
        setSecondCard(null);
        setLockBoard(false);

        try {
            const res = await fetch('/data/cards.json');
            const data = await res.json();
            // const newCards = [...data, ...data]
            //     .sort(() => Math.random() - 0.5)
            //     .map((card) => ({ ...card, id: Math.random() }));
            // setCards(newCards);

            // Fisher-Yates Shuffle
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    // 0부터 i까지의 무작위 인덱스(j)를 선택
                    const j = Math.floor(Math.random() * (i + 1));
                    // 현재 요소(i)와 무작위로 선택된 요소(j)를 교환
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            const easydata = data.slice(0, 9); // 카드 6개만 사용
            const newCards = ishard ? [...data, ...data] : [...easydata, ...easydata];
            shuffleArray(newCards);
            const finalCards = newCards.map((card) => ({
                ...card,
                id: Math.random(),
            }));
            setCards(finalCards);
        } catch (error) {
            console.error('데이터 불러오기 실패:', error);
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
                    setScore((prevScore) => prevScore + 1);
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
    // 더블 클릭 방지
    const handleDoubleClick = (e) => {
        e.preventDefault();
        console.log('더블클릭이 비활성화되었습니다.');
    };
    return (
        <div id="MatchCardGame">
            <div className="score">
                LP : <span> {4000 - score * 200}</span>
            </div>
            <div className="grid-container" onDoubleClick={handleDoubleClick}>
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
            <div className='common-btn'>
                <button onClick={startGame}>재시작</button>
                <HomeBtn />
            </div>
        </div>
    );
};

export default MatchCardGame;
