import React from "react";
import { useParams, Link } from "react-router-dom";

function NotEnoughCards({ cardCount }) {
  const deckId = useParams().deckId;

  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardCount} cards in this
        deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        + Add Cards
      </Link>
    </div>
  );
}

export default NotEnoughCards;
