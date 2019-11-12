# About

Stuart Seguin's submission for Ambyint's full stack coding challenge.

I implemented the Simple Battleships Challenge, including the bonus features. Each player choses a name and then places two ships on the board. The players then take turns trying to guess where their opponents ships are and sink them. First player to sink both of the opponents ships wins.

Game Board tiles:
- `-` : empty cell
- `S` : occupied by a ship
- `H` : marks a hit ship
- `X` : marks a missed shot

## How to Play

1. Install Node (tested with 12.13.0), or use NVM and `nvm use'
2. `npm start` or `node start.js` to start the game
3. `npm test` to run unit tests

## Challenges

I found the most challenging part of this programming challenge to be the refactoring and unit testing. For example, changing the `instantiateBoard` function to populate with `-1` instead of undefined introduced a bug that was causing all unit test involving the ships being placed on the board to fail. It took me a little while to figure out I was using Array.fill() incorrectly which was causing the board to be instantiated differently then I was expecting. I found the unit tests to be a bit more time consuming than I was expecting, however they ended up being very useful for catching some bugs like the one mentioned above. I also appreciated that I could run all the the tests after making changes while refactoring and see if any of the changes were breaking. Over I found this programming challenge to be pretty fun.
