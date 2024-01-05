import React from "react";
import { Link } from "react-router-dom";

export function EditButton({ deckId, card }) {
  return (
    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
      <button className="btn btn-secondary">Edit</button>
    </Link>
  );
}
