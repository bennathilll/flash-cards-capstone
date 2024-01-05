import React, { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function CardEdit() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const getCard = async () => {
      try {
        const controller = new AbortController();

        setCard(await readCard(cardId, controller.signal));
        setDeck(await readDeck(deckId, controller.signal));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };
    getCard();
  }, [cardId, deckId]);

  const handleChange = ({ target }) => {
    if (target.name === "front") {
      setCard({ ...card, front: target.value });
    } else if (target.name === "back") {
      setCard({ ...card, back: target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(card).then((newCard) => history.push(`/decks/${deck.id}`));
  };

  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/"> Home </Link> |
          </li>
          <li>
            <Link to={`/decks/${deckId}`}> {deck.name} </Link> |
          </li>
          <li> Edit Card: {card.id} </li>
        </ul>
      </nav>
      <h2>Edit Card</h2>
      <CardForm
        deckId={deckId}
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CardEdit;
