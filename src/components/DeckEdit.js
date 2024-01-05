import React, { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";

function DeckEdit() {
  const initialDeckState = {
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState({ ...initialDeckState });
  const { deckId } = useParams();
  const history = useHistory();

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
    if (target.name === "name") {
      setDeck({ ...deck, name: target.value });
    } else if (target.name === "description") {
      setDeck({ ...deck, description: target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDeck(deck).then((newDeck) => history.push(`/decks/${newDeck.id}`));
  };

  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/"> Home </Link> |
          </li>
          <li> {deck.name} </li> | <li>Edit Deck</li>
        </ul>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name:
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Edit Deck Name"
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

export default DeckEdit;
