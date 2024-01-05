import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks as deckList } from "../utils/api";
import { ViewButton } from "./buttons/ViewButton.js";
import { StudyButton } from "./buttons/StudyButton";
import { DeleteButton } from "./buttons/DeleteButton";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      try {
        const decks = await deckList(new AbortController().signal);
        setDecks(decks);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getDecks();
  }, []);

  const handleDelete = (deckId) => {
    deleteDeck(deckId);
    const currentDecks = decks.filter((deck) => deck.id !== deckId);
    setDecks(currentDecks);
  };

  if (!decks) {
    <Link to="/decks/new">
      <button className="btn btn-secondary">+ Create Deck</button>
    </Link>;
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/decks/new">
        <button className="btn btn-secondary">+ Create Deck</button>
      </Link>
      <ul className="list-unstyled">
        {decks.map((deck, index) => (
          <li key={index}>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{deck.name}</h2>
                <span className="text-right">{deck.cards.length} cards</span>
                <p className="card-text">{deck.description}</p>
                <ViewButton deckId={deck.id} />
                <StudyButton deckId={deck.id} />
                <DeleteButton
                  onClickHandler={() =>
                    window.confirm("Delete this deck?") && handleDelete(deck.id)
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
