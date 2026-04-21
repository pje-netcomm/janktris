# Name
Janktris

# Description
A basic tetris clone.

# Tooling and environment
- Running in a browser only
- Using only HTML, CSS, Javascript or publicly sources libraries.
- Use playwrite to validate the app is working
- Use browser local storage for any data persistence

# Features
- Game Mechanics:
    - A game based on falling variously-shaped blocks that must fit together to make
      complete horizontal lines which disappear to avoid the play arena filling up.
    - The play arena consists of a local space with 20 columns and 40 rows
    - Blocks consist of the following shapes, where each X is the size of an arena cell space:
       - XX  XXXXX   XXX     XX    XX   xxx
         XX           X       XX          x
                                          x
    - A random block appears at the middle/top of the play arena, and proceeds to drop down at rate of 1 row every second.
    - The block is initially rotated by a random multiple of 90 degrees when it appears
    - The block can be rotated left or right by 90 degrees using the keyboard (as long as it doesn't collide with the side of the arena or another block)
    - When the block would collide with another block or the bottom of the arena it is fixed in place, and a new block is chosen to drop.
    - If any row in the arena consists of cells filled by block segments, it disappears and all filled cells above it drop down 1 row.
    - The game ends if any block reaches a fixed location and the top row has any
      filled cells, or if a newly chosen block can't be placed because it would
      collide with a filled cell on the arena.
    - Score by counting completed rows (10 points), and the number of blocks
      placed (1 point). Give bonus points where multiple rows are cleared by
      placement of a single block
    - Down-arrow key causes the current block fall to be accelerated to one row every 0.1 seconds while the button is held down, and returns to normal speed when the button is released.
    - Left and right arrow keys shift the block left or right by one cell
    - a key rotates the block left
    - d key rotates the block right
    - When the game ends, display a message indicating the end of the game and the final score, and a button to start a new game.
- Aesthetics:
    - Use a fun and interesting colour scheme 
    - Use exciting sounds to represent significant game events, highlighting completed rows,  end of game and start of game
    - Use appropriately muted sounds to represent other minor in-game progress, such as new blocks appearing blocks moving, blocks rotating.
- UX Matters:
    - Display a running total of the current score
    - Space key pauses the game, making the arena dim, and a message shown indicating the pause
    - Show a key legend on the side of the arena to indicate the controls

# Release Roadmap

## v0.0.0
- Initial development and testing of core features.

## v0.1.0
UX improvements:
- up arrow rotates block right
- enter drops the block to its lowest position
- improve control legend for readability using separate columns for key description. Make it look classy.

bugs:
- version display isn't working, always displays "3695472"
- all keys should auto repeat
- the game doesn't end properly, no end of game message is shown.
- sound effects aren't working

## v0.2.0
New Feature:
- Add sound effects.

UX improvements:
- while paused or ended, game arena should be shaded.
- end screen should show score and time survived.
- end screen should display as a modal with look classy.

Bugs:
- space to start new game doesn't clear the arena
- version doesn't update via build.sh if version was previously updated.
- version display looks weird, make it show only the version number, not the whole string. include the semver and the -n (number of commits since last tag) if it exists, but not the git hash or the '-dirty' suffix.


## v1.0.0
- Leader Board for high scores

## v2.0.0
- Difficuty levels:
    - For every 10 rows cleared, increase level and speed up the rate of block fall.
    - Level number is used as a score multiplier.

# Bugs
- 
