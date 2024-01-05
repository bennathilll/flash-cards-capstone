import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();

  const initialDeckState = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState({ ...initialDeckState });

  const initialCardState = {
    front: "",
    back: "",
  };
  const [card, setCard] = useState({ ...initialCardState });

  async function getDeck() {
    try {
      const response = await readDeck(deckId, new AbortController().signal);
      setDeck(response);
    } catch (error) {
      if (error === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  }

  useEffect(() => {
    getDeck();
  }, []);

  const handleChange = ({ target }) => {
    if (target.name === "front") {
      setCard({ ...card, front: target.value });
    } else if (target.name === "back") {
      setCard({ ...card, back: target.value });
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await createCard(deckId, card).then((newCard) =>
        history.push(`/decks/${deck.id}`)
      );
    } catch (error) {
      console.error("Error creating card:", error);
    }
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
          <li> Add Card </li>
        </ul>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm
        deckId={deckId}
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddCard;
