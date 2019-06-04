import React from 'react';
import ReactDOM from 'react-dom';

function Card(props) {
    return (
        <button className="card" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Deck extends React.Component {
    renderCard(i) {
        return (
            <Card
                key={i}
                value={this.props.cards[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const cardsPerRow = 4;

        const cards = this.props.cards.map((_card, index) => {
            return this.renderCard(index)
        });

        const nFullRows = Math.floor(cards.length / cardsPerRow);
        const rows = [];

        let i = 0;

        while (i <= nFullRows) {
            let cardsInRow;

            if (i < nFullRows) {
                cardsInRow = cards.slice((i * cardsPerRow), (i + 1) * cardsPerRow);
            } else {
                cardsInRow = cards.slice((i * cardsPerRow));
            }

            rows.push(<div className="deck-row" key={i}>
                {cardsInRow}
            </div>);

            i += 1;
        }

        return (
            <div>
                {rows}
            </div>
        );
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
            unmatchedWords: Object.keys(this.pairs),
            matchedWords: []
        };
    }

    handleClick(i) {
        let cards = this.state.cards.slice();
        const unmatchedWords = this.state.unmatchedWords.slice();
        cards[i] = unmatchedWords[i];

        const revealedWords = cards.filter((card) => { return card !== null });

        if (revealedWords.length === 2) {
            if (this.pairs[revealedWords[0]] === this.pairs[revealedWords[1]]) {

                this.setState({
                    matchedWords: this.state.matchedWords.slice().concat(revealedWords),
                    unmatchedWords: this.state.unmatchedWords.slice()
                        .filter((word) => { return !revealedWords.includes(word) })
                })
                cards = cards.filter((card) => { return card === null });

            } else {
                // setTimeout(() => {
                //     console.log('Called set null')
                //     cards = cards.map(() => null)
                // }, 2000)
                // console.log(cards)
                // console.log('Done')
                cards = cards.map(() => { return null });
            }
        }

        this.setState({
            cards: cards
        });
    }

    renderMatches() {
        const wordsPerRow = 2;

        const words = this.state.matchedWords.map((word) => {
            return (<button>{word}</button>)
        });

        const nFullRows = Math.floor(words.length / wordsPerRow);
        const rows = [];

        let i = 0;

        while (i <= nFullRows) {
            let wordsInRow;

            if (i < nFullRows) {
                wordsInRow = words.slice((i * wordsPerRow), (i + 1) * wordsPerRow);
            } else {
                wordsInRow = words.slice((i * wordsPerRow));
            }

            rows.push(<div className="matched-row" key={i}>
                {wordsInRow}
            </div>);

            i += 1;
        }

        return (
            <div>
                {rows}
            </div>
        );
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

