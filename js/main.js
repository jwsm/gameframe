/* Run the main loop of the game */
var mainLoop = function(){
	// Clear the screen
	clear();
	// Draw the explosions
	explosions.updateAndDraw();
	// Draw the sprites (other than avatar)
	gameSprites.updateAndDraw();
	// Move and draw the avatar
	if (game.isAvatarVisible()) {
		avatar.update();
		avatar.draw();
	}
	// Draw scoreboard and messages
	messages.updateAndDraw();
	scoreboard.updateAndDraw();
	gameLoop();
	mLoop = setTimeout(mainLoop, 1000 / 50);
}

var backgroundMusic = function(music){
	music.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	music.play();
	music.volume = 0.5;
}

// ---------------------------------
// Main

// Make explosions, messages, and scoreboard objects
explosions = new ItemSet(maxExplosions);
messages = new Messages(maxMessages);
gameSprites = new ItemSet(maxGameSprites);
game = new Game();
scoreboard = new Scoreboard();
game.readyMode();