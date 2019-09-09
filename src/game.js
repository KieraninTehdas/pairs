import React from 'react';
import _shuffle from 'lodash.shuffle';
import * as deckService from './deck-service';

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

        const revealedWords = cards.filter(card => card.isRevealed);

        if (revealedWords.length < 3) {
            this.setState({
                cards: cards
            });
        }

        if (revealedWords.length === 2) {

            if (revealedWords[0].key === revealedWords[1].key) {
                setTimeout(() => {
                    this.setState({
                        matchedCards: this.state.matchedCards.slice().concat(revealedWords),
                        cards: cards.filter((card) => {
                            if (card.isRevealed) {
                                card.isRevealed = false;
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

function generateRows(nColumns, contents, divClassName) {
    const nFullRows = Math.floor(contents.length / nColumns);
    const rows = [];

    let i = 0;

    while (i <= nFullRows) {
        let rowContent;

        if (i < nFullRows) {
            rowContent = contents.slice((i * nColumns), (i + 1) * nColumns);
        } else {
            rowContent = contents.slice((i * nColumns));
        }

        rows.push(<div className={divClassName} key={i}>
            {rowContent}
        </div>);

        i += 1;
    }

    return (
        <div>
            {rows}
        </div>
    );
}
