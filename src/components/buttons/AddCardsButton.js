import React from "react";
import { Link } from "react-router-dom";

export function AddCardsButton({ deckId }) {
  return (
    <Link to={`/decks/${deckId}/cards/new`}>
      <button type="button" className="btn btn-primary">
        + Add Card
      </button>
    </Link>
  );
}
