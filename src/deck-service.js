import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function DeckList(props) {
    const deckNames = props.deckNames.map((deckName, index) =>
        <li key={index}>
            <Link to={`${props.path}/${deckName}`}>{deckName}</Link>
        </li>
    );
    return <ul>{deckNames}</ul>;
}

export function getDeck(deckName) {
    const pairs = {};

    decks[deckName].forEach((entry, i) => {
        pairs[entry.firstWord] = i;
        pairs[entry.secondWord] = i;
    });

    return pairs;
}

export function getDeckNames() {
    return Object.keys(decks);
}


const decks = require('./decks/decks1.json')