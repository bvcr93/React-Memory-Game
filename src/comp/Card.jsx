import React from "react";
import "./Card.css";
const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div key={card.id} className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="" />
        <img src="cover.png" alt="" className="back" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Card;
