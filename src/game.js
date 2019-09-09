import React from 'react';
import _shuffle from 'lodash.shuffle';
import * as deckService from './deck-service';
import generateRows from './util';

import "./game.css";

function Card(props) {
    if (props.isRevealed) {
        return (
            <button className="revealed-card" onClick={props.onClick}>
                {props.value}
            </button>
        );
    } else {
        return (
            <button className="concealed-card" onClick={props.onClick}>
                {null}
            </button>
        )
    }
}

function RemovedCard() {
    return (
        <button className="removed-card"></button>
    );
}

function Deck(props) {
    const cards = props.cards.map((card, i) => {
        if (card.isMatched) {
            return <RemovedCard key={i} />;
        } else {
            return (
                <Card
                    key={i}
                    value={card.value}
                    isRevealed={card.isRevealed}
                    onClick={() => props.onClick(i)}
                />
            );
        }

    });
    return generateRows(4, cards, 'deck-row');
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.pairs = deckService.getDeck(props.match.params.deckName);
        this.state = {
            cards: _shuffle(
                Object.entries(this.pairs).map(entry => {
                    return {
                        value: entry[0],
                        key: entry[1],
                        isRevealed: false,
                        isMatched: false
                    }
                })
            ),
            matchedCards: [],
            nAttempts: 0,
        };
    }

    handleClick(i) {
        let cards = this.state.cards.slice();
        const revealedCard = cards[i];
        revealedCard.isRevealed = true;

        const revealedCards = cards.filter(card => card.isRevealed && !card.isMatched);

        if (revealedCards.length < 3) {
            this.setState({
                cards: cards
            });
        }

        if (revealedCards.length === 2) {

            if (revealedCards[0].key === revealedCards[1].key) {
                setTimeout(() => {
                    this.setState({
                        matchedCards: this.state.matchedCards.slice().concat(revealedCards),
                        cards: cards.map((card) => {
                            if (card.isRevealed && !card.isMatched) {
                                card.isMatched = true;
                                return card;
                            } else {
                                return card;
                            }
                        })
                    });
                }, 2000);

            } else {
                setTimeout(() => {
                    this.setState({
                        cards: cards.map(card => {
                            card.isRevealed = false;
                            return card;
                        })
                    });
                }, 2000);
            }

            this.setState({
                nAttempts: this.state.nAttempts + 1
            });

        }

    }

    renderMatches() {
        const cards = this.state.matchedCards.map((card, i) => {
            return <Card
                key={i}
                value={card.value}
                isRevealed={true}
            />
        });

        return generateRows(2, cards, 'matched-row');
    }

    render() {
        if (this.state.cards.filter((card) => !card.isMatched).length === 0) {
            alert(`Well done! You matched all the words in ${this.state.nAttempts} attempts!`)
        }

        return (
            <div className="game">
                <div class="game-deck">
                    <Deck
                        cards={this.state.cards}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>Matched Cards:</div>
                    {this.renderMatches()}
                    <div>Attempts:  {this.state.nAttempts}</div>
                </div>
            </div>
        );
    }
}
