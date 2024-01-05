import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home";
import Study from "../components/Study";
import CreateDeck from "../components/CreateDeck";
import DeckScreen from "../components/DeckScreen";
import DeckEdit from "../components/DeckEdit";
import AddCard from "../components/AddCard";
import CardEdit from "../components/CardEdit";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
