import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";
import { StudyButton } from "./buttons/StudyButton";
import { AddCardsButton } from "./buttons/AddCardsButton";
import { EditButton } from "./buttons/EditButton";
import { DeleteButton } from "./buttons/DeleteButton";

function DeckScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  async function reloadDeck() {
    try {
      const response = await readDeck(deckId, new AbortController().signal);
      setDeck(response);
      setCards(response.cards);
    } catch (error) {
      if (error === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  }

  useEffect(() => {
    const getDeck = async () => {
      try {
        const response = await readDeck(deckId, new AbortController().signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        if (error === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    };

    getDeck();
  }, [deckId]);

  const handleDeleteDeck = (deckId) => {
    deleteDeck(deckId);
    setDeck({});
    history.push("/");
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
    reloadDeck();
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/"> Home </Link>|
          </li>
          <li> {deck.name} </li>
        </ul>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`}>
          <button type="button" className="btn btn-secondary">
            Edit
          </button>
        </Link>
        <StudyButton deckId={deckId} />
        <AddCardsButton deckId={deckId} />
        <DeleteButton
          onClickHandler={() =>
            window.confirm("Would you like to delete this deck?") &&
            handleDeleteDeck(deck.id)
          }
        />
      </div>
      <br />
      <h2>Cards</h2>
      <ul className="list-unstyled">
        {cards.map((card, index) => (
          <li key={index} className="card border-light">
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col">{card.front}</div>
                  <div className="col">
                    {card.back}
                    <br />
                    <EditButton deckId={deckId} card={card} />
                    <DeleteButton
                      onClickHandler={() =>
                        window.confirm("Would you like to delete this card?") &&
                        handleDeleteCard(card.id)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckScreen;
