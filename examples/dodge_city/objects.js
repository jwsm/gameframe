/* objects.js */

// Define all the different objects used in game play.

// In this game, there is an avatar (the player), baddies (things to avoid),
// goodies (things to pick up), and extra lives.
// We also define MySprite, which is a "parent" of all the other objects, so
// all the other objects inherit its methods.

/* --------------------------------------- */
/* 	MySprite */

// This is a parent class to all other object classes. All child classes
// inherit the update method (i.e., they all move, wrap around the screen
// edges, and check for collisions with the avatar).
MySprite.prototype = new Sprite();
function MySprite() {
	this.update = function() {
		this.move();
		this.toroidWrap();
		this.checkHitAvatar();
	};
}

/* --------------------------------------- */
/* 	Avatar */

// The sprite controlled by the user
Avatar.prototype=new MySprite();
function Avatar() {
	this.x = width/2;
	this.y = height/2;
	this.size = 20;
	this.color = 'orange';
	this.isAvatar = true;
	this.image = avatarImage;
}


/* --------------------------------------- */
/* 	Other Sprites  */

// Baddie (avoid them or they will kill you)
Baddie.prototype=new MySprite();
function Baddie() {
	this.randomize();
	this.color = 'red';
	this.image = baddieImage;

	// When a baddie hits the avatar, explode the avatar and tell the game that
	// you died.
	this.hitAvatar = function() {
		explodeSound.pause();
		explodeSound.currentTime = 0;
		explodeSound.play();
		avatar.explode();
		game.die();
		messages.addMessage(randElement(baddieMessages), avatar);
	};
}

// Goodie (pick them up to give you points and to complete the level)
Goodie.prototype=new MySprite();
function Goodie() {
	this.randomize();
	this.color = 'green';

	// When a goodie hits the avatar, explode the goodie, add to our score, add
	// a message to the screen, and decrement the number of goodies left.
	// If we are down to 0 goodies left, tell the game we've finished the level.
	this.hitAvatar = function() {
		goodieSound.pause();
		goodieSound.currentTime = 0;
		goodieSound.play();
		this.explode();
		game.addScore(200);
		messages.addMessage(randElement(goodieMessages), avatar);
		goodiesLeft -= 1;
		if (goodiesLeft === 0) {
			winLevelSound.play();
			game.winLevel();
		}
	};
}

// Extra Life (pick them up to add 1 to your extra lives)
GG.prototype=new MySprite();
function GG() {
	this.randomize();
	this.color = 'yellow';

	// When an extra life hits the avatar, explode the extra life, add one life
	// to our lives count, and add a message on the screen.
	this.hitAvatar = function() {
		goodieSound.pause();
		goodieSound.currentTime = 0;
		goodieSound.play();
		this.explode();
		game.addLives(1);
		messages.addMessage("1UP!!!", avatar);
	};
}