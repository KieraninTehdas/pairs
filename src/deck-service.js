import React from 'react';

export function getDeck(deckName) {
    const pairs = {};

    decks[deckName].forEach((entry, i) => {
        pairs[entry.firstWord] = i;
        pairs[entry.secondWord] = i;
    });

    return pairs;
}

export default function getDeckNames() {
    return Object.keys(decks).map((deckName) => <li>{deckName}</li>)
}


const decks = require('./decks/decks1.json')