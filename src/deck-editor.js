import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DeckList, { getDeckNames } from "./deck-service";
import generateRows from './util';
import * as deckService from './deck-service';

export default function DeckEditorHome({ match }) {
  const newDeckLink = <Link to={`${match.path}/new-deck`}>{'add new deck'}</Link>;
  return (
    <div>
      <h2>Deck Editor</h2>
      <p>Choose a deck to edit or {newDeckLink}:</p>
      <div>
        <DeckList deckNames={getDeckNames()} path={`${match.path}/edit`}>
        </DeckList>
      </div>
    </div>
  );
}

export function DeckEditor(props) {
  const cards = Object.entries(
    deckService.getDeck(props.match.params.deckName)
  ).map((word) => {
    return <button className="revealed-card"> {word} </button>
  });
  return generateRows(2, cards);

}
