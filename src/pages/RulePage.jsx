import { Link, useParams } from "react-router-dom";
import './RulePage.css';
const RulePage=({lists})=>{
    const {id} = useParams();
    return(
        <div id="RulePage">
            <h2>{lists[id].name}</h2>
            <p><img src={lists[id].img} alt={lists[id].name}/></p>
            <span>{lists[id].rule}</span>
            <p><Link to={`/game/${id}`}>PLAY</Link></p>
        </div>
    )
}

export default RulePage;