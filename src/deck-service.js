import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class DeckList extends Component {
    render() {
        let deckNames = this.props.deckNames.map((deckName, index) =>
            <li key={index}>
                <Link to={`/play/${deckName}`}>{deckName}</Link>
            </li>
        );

        return <ul>{deckNames}</ul>;
    }
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