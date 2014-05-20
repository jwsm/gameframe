# "Dodge City"

## Overview
I created this game as an example for teaching the Game Programming Workshop at the Cheyenne River Youth Project in August 2013. I walked students through how to create this game, and they based their games off this model.

## Structure
- `index.html` creates an HTML canvas and loads in the gameframe framework, which provides a default set of globals, methods, and objects.
- `global.js` overrides globals set in the framework globals file, and also adds variables to store game assets (images and sound).
- `objects.js` extends the base `Sprite` object defined in gameframe to create the sprite classes for this game (`MySprite`, `Avatar`, `Goodie`, `Baddie`, and `GG`).
- `main.js` starts the game loop running, and defines methods to handle creating levels and processing keyboard/mouse input.

## Writing Games
- To write a new game with students, download and modify the "empty template" game.
- Use this game as an example for how to use the framework.
