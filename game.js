/**
 * Player Object
 */
class Player {
    constructor(name, init) {
        this.name = name;
        this.isTurn = (init !== undefined || true) ;
    }
}

/**
 * Game Object
 */
class Game {
    constructor(name1, name2) {
        this.playerOne = new Player(name1, true);
        this.playerTwo = new Player(name2);
        this.board = document.querySelector(".board"); // html element
        this.status = true; // game status

        // build spots
        this.board.innerHTML = ''; // clear spots
        document.querySelector("h1").innerText = 'Tic Tac Toe'; // clear header
        for (let i = 0; i < 9; i++) {
            this.board.innerHTML += `<button id="${i}">`
        }

        // board spot moves
        this.board.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", (evt) => {
                // only make move if spot is empty and game is still running
                if (evt.target.innerText === "" && this.status === true)
                    this.status = this.#updateStatus(this.#move(evt.target.id).name) // make move and update game status
            });
        })
    }

    /**
     * Make next move
     * @returns {Player} next player up
     */
    #move(spot) {
        // get next player and update spot
        let nextPlayer = this.playerOne.isTurn ? this.playerOne : this.playerTwo;
        this.board.querySelector(`#${CSS.escape(spot)}`).innerText = nextPlayer.name;

        // negate current players
        this.playerOne.isTurn = !this.playerOne.isTurn;
        this.playerTwo.isTurn = !this.playerTwo;

        // return next player up
        return this.playerOne.isTurn ? this.playerOne : this.playerTwo;
    }

    /**
     * Updates the game status to tie, game won, or next player
     * @param nextPlayer player up next
     * @returns {boolean} current game status
     */
    #updateStatus(nextPlayer) {
        let header = document.querySelector("h1");

        // check for a winner
        let winner = this.#checkWin();
        if (winner !== undefined) {
            header.innerText = `Winner: ${winner[0].innerText}`; // update header

            // set color for winning spots to yellow
            winner.forEach(spot => {
                document.getElementById(spot.id).style.backgroundColor = "yellow";
            })

            return false; // return (game over) status update
        }

        // else, check for a tie
        else {
            let tie = true;
            this.board.querySelectorAll("button").forEach(button => {
                if (button.innerText === "")
                    tie = false;
            })

            // display tie
            if (tie) {
                header.innerText = "Game tied";
                return false; // return (game over) status update
            }
        }

        // else, display next turn and continue game
        header.innerText = "Next turn: " + nextPlayer;
        return true;
    }

    /**
     * Checks all spots inefficiently for a win
     * @returns {undefined|*[]} array of winning spots, else undefined
     */
    #checkWin() {
        let boardSpots = this.board.querySelectorAll("button"); // get all board spots
        // horizontal
        if (boardSpots[0].innerText === boardSpots[1].innerText && boardSpots[0].innerText === boardSpots[3].innerText && boardSpots[0].innerText !== '')
            return [boardSpots[0], boardSpots[1], boardSpots[3]];
        else if (boardSpots[3].innerText === boardSpots[4].innerText && boardSpots[3].innerText === boardSpots[5].innerText && boardSpots[3].innerText !== '')
            return [boardSpots[3], boardSpots[4], boardSpots[5]];
        else if (boardSpots[6].innerText === boardSpots[7].innerText && boardSpots[6].innerText === boardSpots[8].innerText && boardSpots[6].innerText !== '')
            return [boardSpots[6], boardSpots[7], boardSpots[8]];
        // vertical
        else if (boardSpots[0].innerText === boardSpots[3].innerText && boardSpots[0].innerText === boardSpots[6].innerText && boardSpots[0].innerText !== '')
            return [boardSpots[0], boardSpots[3], boardSpots[6]];
        else if (boardSpots[1].innerText === boardSpots[4].innerText && boardSpots[1].innerText === boardSpots[7].innerText && boardSpots[1].innerText !== '')
            return [boardSpots[1], boardSpots[4], boardSpots[7]];
        else if (boardSpots[2].innerText === boardSpots[5].innerText && boardSpots[2].innerText === boardSpots[8].innerText && boardSpots[2].innerText !== '')
            return [boardSpots[2], boardSpots[5], boardSpots[8]];
        // diagonals
        else if (boardSpots[0].innerText === boardSpots[4].innerText && boardSpots[0].innerText === boardSpots[8].innerText && boardSpots[0].innerText !== '')
            return [boardSpots[0], boardSpots[4], boardSpots[8]];
        else if (boardSpots[2].innerText === boardSpots[4].innerText && boardSpots[2].innerText === boardSpots[6].innerText && boardSpots[2].innerText !== '')
            return [boardSpots[2], boardSpots[4], boardSpots[6]];
        else
            return undefined;
    }
}

// instantiate game
let game = new Game("X", "O");

// restart game functionality
document.getElementById('restart').addEventListener('click', () => {
    game = new Game("X", "O");
});


