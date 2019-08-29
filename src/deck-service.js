import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class DeckList extends Component {
    render() {
        let deckNames = this.props.deckNames.map((deckName) =>
            <Link to={`play/${deckName}`}>{deckName}</Link>
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
    return Object.keys(decks).map((deckName) => <li>{deckName}</li>)
}


const decks = require('./decks/decks1.json')