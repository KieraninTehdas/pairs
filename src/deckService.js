export function getDeck() {
    const pairs = {};

    decks.food.forEach((entry, i) => {
        pairs[entry.firstWord] = i;
        pairs[entry.secondWord] = i;
    });

    return pairs;
}

const decks = {
    'food': [
        { firstWord: 'wine', secondWord: 'cheese' },
        { firstWord: 'potato', secondWord: 'waffles' },
        { firstWord: 'toast', secondWord: 'cereal' },
        { firstWord: 'tea', secondWord: 'coffee' }
    ]
}
