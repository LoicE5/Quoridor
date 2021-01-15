# Quoridor game

## Update

* Added the 3 and 4 players mode (using LocalStorage)
* Implemented a prize draw algorithm to select the player whose starting the round
* Added the ability to switch between 10 walls per player and 5 walls per player (using LocalStorage)
* Implemented an Artificial Intelligence and a single player mode (vs AI)
* Added credits
* Added some indicators about the current player's turn and the selected mode (1, 2, 3 or 4 players)
* Implemented an alert and an auto-rematch once one of the players wins the game (reach the opposite side from its spawn)
* Added a blurried background image
* Made the app more adaptative on different viewport sizes (not perfectly responsive yet)
* Separated functions, app and ai JavaScript files

## About

The Quoridor is a game with a 9x9 grid and two to four players, each represented by a dot inside a square. Every player starts the game at the middle of a side of the grid, and have the goal to reach the other side before his opponent(s). Every round, he can move forward one square, or place some two-squares-length walls in order to disturb the opponent’s journey. The first player to reach the opposite side (from his starting side) wins the game.

I built the Quoridor using HTML, CSS and, mostly, JavaScript. I used JS to automatize as much as I can repetitive tasks such as generating the grid and placing the spawns. There are thousands ways to build this project, which make every single one of them pretty unique, even if the gameplay is similar. In my case, I used CSS background images to place the players into the squares, and absolute-positioned elements for the walls.

![](https://media1.giphy.com/media/29Z9vnNthPsHvzmqd3/giphy.gif)

## Technologies

* HTML
* CSS
* JavaScript

## Language

🇬🇧 &nbsp;English 

### Links

**[Get to the project here !](https://loice5.github.io/Quoridor/)**