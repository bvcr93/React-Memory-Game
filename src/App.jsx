import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Card from "./comp/Card";

const cardImages = [
  { src: "/helmet-1.png", matched: false },
  { src: "/potion-1.png", matched: false },
  { src: "/ring-1.png", matched: false },
  { src: "/scroll-1.png", matched: false },
  { src: "/shield-1.png", matched: false },
  { src: "/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleDeck = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  // clicking on card on browser
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    setDisabled(false);
  };

  //start game automatically

  useEffect(() => {
    shuffleDeck();
  }, []);

  return (
    <div className="App">
      <h1>React Memory Game</h1>
      <button onClick={shuffleDeck}>New Game</button>
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
