import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

function CreateDeck() {
  const initialDeckState = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState({ ...initialDeckState });
  const history = useHistory();

  const handleChange = ({ target }) => {
    if (target.name === "name") {
      setDeck({ ...deck, name: target.value });
    } else if (target.name === "description") {
      setDeck({ ...deck, description: target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newDeck = await createDeck(deck);
      console.log("New Deck:", newDeck);
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/"> Home </Link>|
          </li>
          <li> Create Deck </li>
        </ul>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name:
            <input
              id="name"
              name="name"
              type="text"
              placeholder="New Deck Name"
              className="form-control"
              onChange={handleChange}
              value={deck.name}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description:
            <textarea
              id="description"
              name="description"
              type="textbox"
              rows="6"
              cols="20"
              placeholder="New Deck Description"
              className="form-control"
              onChange={handleChange}
              value={deck.description}
            />
          </label>
        </div>
        <button className="btn btn-secondary" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
