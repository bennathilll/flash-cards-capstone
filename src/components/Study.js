import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function getDecks() {
      try {
        const deck = await readDeck(deckId, new AbortController().signal);
        setDeck(deck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getDecks();
  }, [deckId]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (!deck.cards) {
    return <p>Loading...</p>;
  }

  const handleNextClick = () => {
    if (cardIndex + 1 === deck.cards.length) {
      const restart = window.confirm("Would you like to restart the deck?");
      if (restart) {
        setFlipped(false);
        setCardIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
    }
  };

  return (
    <div>
      <nav>
        <ul className="breadcrumbs">
          <li>
            <Link to="/"> Home </Link>|
          </li>
          <li>
            <Link to={`/decks/${deckId}`}> {deck.name} </Link> |
          </li>
          <li> Study </li>
        </ul>
      </nav>
      <section>
        <h2>Study: {deck.name}</h2>
        {deck.cards.length < 3 ? (
          <div className="card">
            <div className="card-body">
              <NotEnoughCards />
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <h2>
                Card {cardIndex + 1} of {deck.cards.length}
              </h2>
              {!flipped ? (
                <div>
                  <p>{deck.cards[cardIndex].front}</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleFlip()}
                  >
                    Flip
                  </button>
                </div>
              ) : (
                <div>
                  <p>{deck.cards[cardIndex].back}</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleFlip()}
                  >
                    Flip
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleNextClick()}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Study;
