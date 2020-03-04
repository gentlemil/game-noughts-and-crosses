import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// tylko potomek BOARD'A
// komponent klasowo dziedziczacy po po React.Component, stosowane gdy komponent
// przechowuje poza metoda render rowniez stany

// class Square extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = {
//         value: null,
//     };
// }
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

//--------------------------

// komponent funkcyjne, lepiej sie sprawdzi w tym przypadku ze wzgledu na to, ze
// nie przechowuje zadnych stanow, jego jedynym argumentem jest props (properties),
// i jego jedynym zadaniem jest zwrocenie struktury wyrenderowanej tresci znajdujacej
// sie w metodzie return()

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// ==================================================================================
// ==================================================================================
// KOMPONONENT NADRZEDNY
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            oisNext: true,   //za każdym razem, gdy użytkownik wykona ruch,
            // zmienna xIsNext (typu zerojedynkowego; ang. boolean) zmieni wartość
            // na przeciwną, informując, który z graczy jest następny w kolejce,
            // a zaraz po tym stan gry zostanie zapisany ----- (komp.funkcyjny)
        };
    }

    handleClick(i) {
        // stosujemy gdy uzywamy komp. klasowego Square
        // const squares = this.state.squares.slice();     // slice() sluzy do tworzenia
        // squares[i] = 'X';                               //  kopii tablicy 'squares'
        // this.setState({ squares: squares });            // (zamiast modyfikowania bezposredniego)
        // ----
        const squares = this.state.squares.slice();
        // dokladam moja f. calculateWinner() zakanczajac funckje przedwczesnie,
        // gdy wyloniony zostanie zwyciezca rozgrywki.
        if (calculateWinner(squares || squares[i])) {
            return;
        }
        // ----
        squares[i] = this.state.oisNext ? 'O' : 'X';
        this.setState({
            squares: squares,
            oisNext: !this.state.oisNext,
        });
    }

    renderSquare(i) {
        return (<
            Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
            // przekazujemy z komponentu Square to Board dwa atrybuty:
            // value oraz onClick(funckja, ktora Square moze wywolac po kliknieciu)
            // kazdy Square otrzymuje od rodzica swoja wartosc i informuje go o kliknieciu
            // Board ma konkrole nad komponentem Square :)
        );
    }

    render() {
        // ----
        // po stworzeniu metody calculateWinner() stala 'status' w tej postaci nie jest
        // juz nam dluzej potrzebna. Zamieniamy ja z nizej zapisana metoda render().
        // const status = "Who's turn it is? --- " + (this.state.oisNext ? 'O' : 'X');
        // ----
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "The winner is: " + winner + ". Congratulations. You're rock!";
        } else {
            status = "Nex't move belongs to: " + (this.state.oisNext ? 'O' : 'Y');
        }
        // ----
        return (
            <div>
                <div className="status">
                    {status}
                </div>

                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>

                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>

                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
// ==================================================================================
// ==================================================================================

// tylko potomek BOARD'A
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ==========================================================

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ==========================================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
