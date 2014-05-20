/* main.js */

// This is the central script that starts and coordinates gameplay.

// Start the game, create each new level, and process the player's keyboard or
// mouse inputs.


/* --------------------------------------- */
/* Functions */

// Create a new level
var newLevel = function() {
	// Clear out all the existing sprites
	gameSprites.clear();
	// Add more baddies each level (based on level number and numBaddies global)
	gameSprites.addMultiple((game.level * numBaddies), "Baddie");
	// Add the same number of goodies each level (from numGoodies global)
	gameSprites.addMultiple(numGoodies, "Goodie");
	// Add one extra life
	gameSprites.addMultiple(1, "GG");
	// Create a variable to count goodies collected and tell us when to end level
	goodiesLeft = 5;
};

// Perform tasks each time the game loop runs
var gameLoop = function() {};

/* --------------------------------------- */
/* Mouse/Keyboard input */

// Process Mouse Movement
document.onmousemove = function(e){
	avatar.followMouse(e);
};

// Process Key Commands
document.onkeydown = function(e) {
	switch (e.keyCode) {
		// Left
		case 37:
			avatar.dx -= 0.1;
			break;
		// Up
		case 38:
			avatar.dy -= 0.1;
			break;
		// Right
		case 39:
			avatar.dx += 0.1;
			break;
		// Down
		case 40:
			avatar.dy += 0.1;
			break;
	}
};


/* --------------------------------------- */
/* Start the Game */

// Create First Level
newLevel();

// Start game loop
mainLoop();

// Start background music
// backgroundMusic(musicSound);