import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CardForm({ card, deckId, handleChange, handleSubmit }) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">
        Front
        <br />
        <textarea
          type="textbox"
          id="front"
          name="front"
          rows="6"
          cols="20"
          className="form-control"
          onChange={handleChange}
          value={card.front}
        />
      </label>
      <label htmlFor="back">
        Back
        <br />
        <textarea
          type="textbox"
          id="back"
          name="back"
          rows="6"
          cols="20"
          className="form-control"
          onChange={handleChange}
          value={card.back}
        />
      </label>
      <br />
      <button
        type="Done"
        className="btn btn-secondary"
        onClick={() => history.push(`/decks/${deckId}`)}
      >
        Done
      </button>
      <button type="Submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
