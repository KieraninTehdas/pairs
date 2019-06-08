import React from 'react';
import ReactDOM from 'react-dom';
import _shuffle from 'lodash.shuffle'

function Card(props) {
    return (
        <button className="card" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Deck extends React.Component {
    render() {
        const cards = this.props.cards.map((_card, i) => {
            return (
                <Card
                    key={i}
                    value={this.props.cards[i]}
                    onClick={() => this.props.onClick(i)}
                />
            );
        });
        return generateRows(4, cards, 'deck-row');
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.pairs = {
            'wine': 1,
            'cheese': 1,
            'potato': 2,
            'waffles': 2,
            'toast': 3,
            'cereal': 3,
            'tea': 4,
            'coffee': 4
        };
        this.state = {
            cards: Array(Object.keys(this.pairs).length).fill(null),
            unmatchedWords: _shuffle(Object.keys(this.pairs)),
            matchedWords: []
        };
    }

    handleClick(i) {
        let cards = this.state.cards.slice();
        const unmatchedWords = this.state.unmatchedWords.slice();
        cards[i] = unmatchedWords[i];

        this.setState({
            cards: cards
        });

        const revealedWords = cards.filter((card) => { return card !== null });

        if (revealedWords.length === 2) {

            if (this.pairs[revealedWords[0]] === this.pairs[revealedWords[1]]) {
                this.setState({
                    matchedWords: this.state.matchedWords.slice().concat(revealedWords),
                    unmatchedWords: this.state.unmatchedWords.slice()
                        .filter((word) => { return !revealedWords.includes(word) }),
                    cards: cards.filter((card) => { return card === null })
                })
            } else {
                setTimeout(() => {
                    cards = cards.map(() => { return null });
                    this.setState({
                        cards: cards
                    });
                }, 2000);
            }

        }

    }

    renderMatches() {
        const words = this.state.matchedWords.map((word, i) => {
            return <Card
                key={i}
                value={word}
            />
        });

        return generateRows(2, words, 'matched-row');
    }



    render() {
        if (this.state.unmatchedWords.length === 0) {
            alert('Well done! You matched all the words!')
        }

        return (
            <div className="game">
                <div className="game-deck">
                    <Deck
                        cards={this.state.cards}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{'Matched Cards:'}</div>
                    {this.renderMatches()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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

