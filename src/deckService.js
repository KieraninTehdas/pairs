export function getDeck() {
    const pairs = {};

    decks.test.forEach((entry, i) => {
        pairs[entry.firstWord] = i;
        pairs[entry.secondWord] = i;
    });

    return pairs;
}

const decks = require('./decks/decks0.json')