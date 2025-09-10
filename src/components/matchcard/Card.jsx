const Card = ({ card, handleFlip, isFlipped }) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => handleFlip(card)}
    >
      <div className="front">
        <img className="front-image" src={card.image} alt={card.name} />
      </div>
      <div className="back"></div>
    </div>
  );
};
export default Card;