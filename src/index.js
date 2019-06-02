import React from 'react';
import ReactDOM from 'react-dom';

function Card(props) {
    return (
        <button className="card" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// class Card extends React.Component {
//     constructor(props) {
//         super(props);
//         this.onClick = props.onClick;
//         this.state = {
//             word: props.value
//         };
//     }


//     // getDisplayValue() {
//     //     if (this.state.isRevealed === true) {
//     //         return this.state.word;
//     //     } else {
//     //         return null;
//     //     }
//     // }

//     render() {
//         return (
//             <button className="card" onClick={this.onClick}>
//                 {this.state.word}
//             </button>
//         );
//     }

// }

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.words = ['wine', 'cheese', 'potato', 'waffles', 'toast', 'cereal', 'soup', 'tea', 'juice']
        this.state = {
            cards: Array(this.words.length).fill(null)
        };
    }


    handleClick(i) {
        const cards = this.state.cards.slice();
        cards[i] = this.words[i];


        this.setState({
            cards: cards
        });
    }

    renderCard(i) {
        return (
            <Card
                key={i}
                value={this.state.cards[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    renderAllCards() {
        const cardsPerRow = 4;

        const cards = this.state.cards.map((_card, index) => {
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

    render() {
        return this.renderAllCards();
        // return (
        //     <div>
        //         <div className="deck-row">
        //             {this.renderCard(0)}
        //             {this.renderCard(1)}
        //             {this.renderCard(2)}
        //         </div>
        //         <div className="deck-row">
        //             {this.renderCard(3)}
        //             {this.renderCard(4)}
        //             {this.renderCard(5)}
        //         </div>
        //     </div>
        // );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-deck">
                    <Deck />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );

    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

