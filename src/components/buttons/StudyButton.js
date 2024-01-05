import React from "react";
import { Link } from "react-router-dom";

export function StudyButton({ deckId }) {
  return (
    <Link to={`/decks/${deckId}/study`}>
      <button className="btn btn-primary">Study</button>
    </Link>
  );
}
