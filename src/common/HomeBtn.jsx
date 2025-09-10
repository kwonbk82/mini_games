import { useNavigate } from 'react-router-dom';
const HomeBtn = () => {
    const nav = useNavigate();
    const goHome = () => {
        nav('/');
    };
    return (
        <>
            <button onClick={goHome}>홈으로</button>
        </>
    );
};

export default HomeBtn;
