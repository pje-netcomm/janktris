# Name
Janktris

# Description
A basic tetris clone.

# Tooling and environment
- Running in a browser only
- Using only HTML, CSS, Javascript or publicly sources libraries.
- Use playwrite to validate the app is working
- Use browser local storage for any data persistence
- for testing:
    - use playwrite to test the app by running the actual application and testing the UI directly.
    - monitor the javascript console for any errors during testing, and fail tests if any are found.
    - each milestone must pass all tests with out any failures or errors on the javascript console.

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
- Escape key ends the current game mmediately after confirming with the user.

UX improvements:
- while paused or ended, game arena should be shaded.
- end screen should show score and time survived.
- end screen should display as a modal with look classy.
- dropping the block with down arrow should make a brief low-impact, but unique sound.

Bugs:
- version doesn't update via build.sh if version was previously updated.
- version display looks weird, make it show only the version number, not the whole string. include the semver and the -n (number of commits since last tag) if it exists, but not the git hash or the '-dirty' suffix.

## v0.3.0
New Feature:
- Add favicon
- Settings stored in localStorage:
  - shown on main UI in a format similar to controls.
  - sound effects on/off
  - reset cores
- dev mode:
    - Started by typing #dangerousdave or #dd during play
    - Shows a dev panel on the side of the arena.
    - use a tabbed layout with tabs for:
        - list of hidden commands (click on any to execute them)
        - play any sound effect by clicking on it
        - localState:
            - as a JSON tree
            - option to erase
        - tuning:
            - expose tunable parameters such as block fall speed and other
              useful values for debugging and testing.
        - statistics:
            - count of each type of block that has appeared (and percentage of total)
            - display each block and the statistics next to it.
## v1.0.0
- Leader Board for high scores

- Option for "ghost" which show a ghost image of where the current block
  would land if it were to drop straight down without any further movement or
  rotation. 
     - when ghost is used, the ghost image should update in real time as the
       block is moved or rotated, to always show where the block would land if
       it were to drop straight down from its current position and orientation.
     - the ghost image should be visually distinct from the actual block, such as by
       using a different colour or opacity, to avoid confusion between the ghost
       and the actual block.
     - award 1/2 points where a ghosted-block is placed, with a lowest limit of 1 point.
     - ghost mode is hidden, and can be enabled by typing #casper during play.


## v2.0.0
- Difficulty levels:
    - For every 10 rows cleared, increase level and speed up the rate of block fall.
    - Level number is used as a score multiplier.
    - Allow user to select a difficulty level at the start of the game, which determines the initial speed of block fall and the rate at which it increases as rows are cleared. For example:
        - "Easy" mode: blocks fall at a slower initial speed, and the speed increases more gradually as rows are cleared.
        - "Medium" mode: blocks fall at a moderate initial speed, and the speed increases at a standard rate as rows are cleared.
        - "Hard" mode: blocks fall at a faster initial speed, and the speed increases more rapidly as rows are cleared.
        - "Nightmare" mode:
            - blocks fall at a very fast initial speed, and the speed increases very rapidly as rows are cleared.
            - arena starts with some randomly filled cells to make it more difficult from the start.

## v3.0.0
- Auto-play mode:
    - the game plays itself using an algorithm to determine the best placement
      for each block.
    - This mode can be used for testing and demonstration purposes, and can
      also be a fun feature for users to watch.
    - enable with hidden command #wowzers during play.
    - show auto-play mode in the UI when enabled, and indicate which mode of
      auto-play is being used, and allow it to be switched during play.
    - Allow for selection of different modes of auto-play, including:
        - "dumb" mode, where blocks are placed in the first available position
          from left to right, without any strategic consideration.
        - "greedy" mode, where blocks are placed in the position that results
          in the most rows cleared immediately after placement.
        - "gpt" use a GPT model to evaluate the best placement for each block
          based on the current state of the arena, and place the block in
          that position. The model can be trained on a dataset of game states
          and optimal placements, or it can be a pre-trained model that is
          fine-tuned for this specific task.

# Bugs
- 
