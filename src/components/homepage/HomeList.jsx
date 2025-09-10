import { Link, useParams } from 'react-router-dom';

const HomeList = ({ lists }) => {
    
    return (
        <div id="HomeList">
            <Link to={`/game/${lists.id}`}>
                <img src={lists.img} alt={lists.name} />
            </Link>
            <p className="list-name">{lists.name}</p>
        </div>
    );
};

export default HomeList;
