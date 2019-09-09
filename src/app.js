import React, { Component } from "react";
import DeckList, { getDeckNames } from "./deck-service";

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <p>Choose a deck to play:</p>
        <div>
          <DeckList deckNames={getDeckNames()} path={'play'}>
          </DeckList>
        </div>
      </div>
    );
  }
}
