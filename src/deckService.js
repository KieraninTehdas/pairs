export function getDeck(deckName) {
    const pairs = {};

    decks[deckName].forEach((entry, i) => {
        pairs[entry.firstWord] = i;
        pairs[entry.secondWord] = i;
    });

    return pairs;
}

const decks = require('./decks/decks1.json')