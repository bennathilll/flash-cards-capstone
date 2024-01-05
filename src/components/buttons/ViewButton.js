import React from "react";
import { Link } from "react-router-dom";

export function ViewButton({ deckId }) {
  return (
    <Link to={`/decks/${deckId}`}>
      <button className="btn btn-secondary">View</button>
    </Link>
  );
}
