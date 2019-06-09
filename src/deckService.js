export function getDeck() {
    const pairs = {};

    decks.common1.forEach((entry, i) => {
        pairs[entry.firstWord] = i;
        pairs[entry.secondWord] = i;
    });

    return pairs;
}

const decks = require('./decks/decks1.json')