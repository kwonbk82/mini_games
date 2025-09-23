import { Link } from 'react-router-dom';
import './HomeList.css';
const HomeList = ({ lists }) => {
    
    return (
        <div id="HomeList">
            <h1 className="list-name">{lists.name}</h1>
            <Link to={`/${lists.id}`}>
                <img src={lists.img} alt={lists.name} />
            </Link>
        </div>
    );
};

export default HomeList;
