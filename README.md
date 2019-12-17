# 15 puzzle game

The 15-puzzle game is a classical slide puzzle game that consists in a board game with 15 tiles randomly positioned and a missing tile. The goal of the game is to place the tiles in the right order, making slide moves that involve the empty space in the board game.

<img src="/public/game_board.png" width=300 align=center>

You can play the game [here](https://m-onofri.github.io/15_puzzle/).

## How to clone the app locally

Clone the git repository in the folder of your choice:
```
git clone https://github.com/m-onofri/15_puzzle.git
```

Install the packages:
```
cd 15_puzzle
npm install
```

Run the server:
```
npm start
```

In your browser, go to http://localhost:3000/, and play the game.


## Main features

* To move tiles you can simply click on the tiles you want to move.
* You can also move two or three tiles at the same time, simply click on the farthest tile from the empty space on the game board.
* There is a counter that counts how many moves you perform to complete the game
* There is a timer that measures how many seconds you need to complete the game


## Compontents organization

- App
    - TopPanel
        - Timer
        - Counter
        - Button
    - Board
        - Tile


## Cross-browser consistency 

The project was checked on MacOS in Chrome, Firefox, Opera and Safari, and on these browsers it works properly.