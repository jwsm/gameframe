/* Sprite */
/* An object that has an on-screen representation (i.e., all of the game pieces) */
function Sprite(){
	// Define object variables
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.size = 0;
	this.color = 'black';
	this.isAlive = true;
	this.image = null;
	this.isAvatar = false;
	this.angle = 0;
	this.followSpeed = 0;

	// Update the sprite each time tick(typically move and wrap/bounce)
	this.update = function() {
	}
	// Move the sprite
	this.move = function(){
		if (this.isAlive) {
			this.x += this.dx;
			this.y += this.dy;
		}
	};
	this.faster = function(amount) {
		this.dy -= Math.cos(this.angle) * amount;
      	this.dx += Math.sin(this.angle) * amount;
	}
	this.slower = function(amount) {
		this.dy += Math.cos(this.angle) * amount;
      	this.dx -= Math.sin(this.angle) * amount;
	}
	this.forward = function(amount) {
		this.y -= Math.cos(this.angle) * amount;
      	this.x += Math.sin(this.angle) * amount;
	}
	this.backward = function(amount) {
		this.y += Math.cos(this.angle) * amount;
      	this.x -= Math.sin(this.angle) * amount;
	}
	// Wrap sprite around if has gone off the edge of the screen
	this.toroidWrap = function() {
		if (this.x - this.size > width) {
			this.x = 0 - this.size;
		}
		if (this.x + this.size < 0) {
			this.x = width + this.size;
		}
		if (this.y - this.size > height) {
			this.y = 0 - this.size;
		}
		if (this.y + this.size < 0) {
			this.y = height + this.size;
		}
	}
	// Bounce the sprite off the walls
	this.bounce = function() {
		if (this.x + this.size > width) {
			this.dx = -this.dx;
			this.didBounce();
		}
		if (this.x - this.size < 0) {
			this.dx = -this.dx;
			this.didBounce();
		}
		if (this.y + this.size > height) {
			this.dy = -this.dy;
			this.didBounce();
		}
		if (this.y - this.size < 0) {
			this.dy = -this.dy;
			this.didBounce();
		}
	}
	// Did bounce
	this.didBounce = function() {
	}
	// Draw shape
	this.draw = function(){
		if (this.isAlive) {
			ctx.save();
			ctx.fillStyle = this.color;
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			this.drawIcon();
			ctx.restore();
		}
	};
	// Draw the visual representation of this shape
	this.drawIcon = function() {
		if (this.image != null) {
			cImg(this.image, this.size);
		} else {
			cEllipse(this.size);
		}
	}
	// Check to see if I have hit another shape
	this.hit = function(other) {
		return (	this.isAlive && other.isAlive &&
					(this.distanceTo(other) < (this.size + other.size))
				);
	}
	// Check to see if we have hit the avatar, if so, call hitAvatar()
	this.checkHitAvatar = function() {
		if (!this.isAvatar && game.isActivePlay() && this.hit(avatar)) {
			this.hitAvatar();
		}
	}
	// Function called when this sprite hits the avatar (if we are not avatar)
	this.hitAvatar = function () {
	}
	// Return the distance from my center point to another circle's center
	this.distanceTo = function(other) {
		return Math.abs(
			Math.sqrt((
			Math.pow((this.x - other.x), 2) +
			Math.pow((this.y - other.y), 2))));
	}
	this.speed = function() {
		return Math.abs(
			Math.sqrt(
			Math.pow(this.dx, 2) +
			Math.pow(this.dy, 2)));
	}
	// Explode this sprite
	this.explode = function() {
		explosions.addItem(new Explosion(this));
		this.isAlive = false;
	}
	// Point object towards an x, y position
	this.pointAt = function(x, y) {
		this.angle = Math.atan2(y, x) + (Math.PI / 2);
	}
	// Make the object fillow the mouse cursor
	this.followMouse = function(e) {
		this.dx = mouseFollowSpeed * (e.pageX - (this.x + c.offsetLeft));
		this.dy = mouseFollowSpeed * (e.pageY - (this.y + c.offsetTop));
		this.pointAt(
			(e.pageX - (this.x + c.offsetLeft)),
			(e.pageY - (this.y + c.offsetTop))
		);
	}
	this.follow = function(object) {
		this.dx = this.followSpeed * (object.x - this.x);
		this.dy = this.followSpeed * (object.y - this.y);
		this.pointAt((object.x - this.x), (object.y - this.y));
	}
	this.randomWalk = function(amount) {
		this.dx += (Math.random() * amount) - (amount/2);
		this.dy += (Math.random() * amount) - (amount/2);
	}
	// Randomize all variables of this sprite
	this.randomize = function() {
		this.x = Math.random() * (width - (2 * randMaxSize)) + randMaxSize;
		this.y = Math.random() * (height - (2 * randMaxSize)) + randMaxSize;
		this.size = (Math.random() * (randMaxSize - 8)) + 8;
		this.dx = Math.random() * randMaxDx;
		this.dy = Math.random() * randMaxDy;
		this.color = randColor();
	}
}

/*	ItemSet
	Stores a set of items in an array, writes over them if null or !isAlive */
function ItemSet(max) {
	this.maxItems = max;
	this.clear = function() {
		this.items = [];
		this.itemsCounter = 0;
	}
	// Add a single object to set
	this.addItem = function(item) {
		var ni = this.nextItemIndex();
		if (ni != null) {
			this.items[ni] = item;
		}
	}
	// Add multiple items of a certain class to set
	this.addMultiple = function(number, classname) {
		for (var j = 0; j < number; j++) {
			this.addItem(eval("new " + classname + "();"));
		}
	}
	// Get next available index for storing items
	this.nextItemIndex = function() {
		for (var j = 0; j < this.maxItems; j++) {
			if (	(this.items[j] == null) ||
					(!this.items[j].isAlive)) {
						return j;
					}
		}
		return null;
	}
	// Send update() and draw() messages to all living non-null items
	this.updateAndDraw = function() {
		for (var j = 0; j < this.maxItems; j++) {
			if (	(this.items[j] != null) &&
					this.items[j].isAlive) {
				this.items[j].update();
				this.items[j].draw();
			}
		}
	}
	// Clear the set when it is first created
	this.clear();
}

/*	Explosion
	Animate an explosion by storing, updating, drawing a set of points */
function Explosion(shape) {
	this.explodePoints = [];
	this.isAlive = true;
	this.age = 0;
	for (var k = 0; k < numExplodePoints; k++) {
		this.explodePoints[k] = new ExplodePoint(shape);
	}
	this.update = function() {
	}
	this.draw = function() {
		if (this.isAlive) {
			for (var k = 0; k < numExplodePoints; k++) {
				this.explodePoints[k].move();
				this.explodePoints[k].draw();
			}
			this.age++;
			if (this.age > deathTime) {
				this.isAlive = false;
			}
		}
	}
}

/*	ExplosionPoint
	Store, update, draw an individual point involved with one explosion */
function ExplodePoint(shape) {
	this.x = shape.x;
	this.y = shape.y;
	this.r = shape.size / ((Math.random() * 3) + 4);
	this.color = shape.color;
	this.dx = shape.dx + (Math.random() * 30) - 15;
	this.dy = shape.dy + (Math.random() * 30) - 15;
	this.state = 1;

	this.move = function() {
		if (this.state > 0) {
			this.shrink();
			this.dx = this.dx * 0.99;
			this.dy = this.dy * 0.99;
			this.x += this.dx;
			this.y += this.dy;
		}
	}
	this.shrink = function() {
		this.r -= 0.05;
		if (this.r <= 0) {
			this.state = 0;
		}
	}
	this.draw = function(){
		if (this.state > 0) {
			ctx.fillStyle = this.color;
			ellipse(this.x, this.y, this.r);
		}
	};
}

/* 	Messages
	A child class of ItemSet, adding the addMessage() function
	to create a new message and attach it to an object */
Messages.prototype = new ItemSet;
function Messages(max) {
	this.maxItems = max;
	this.addMessage = function(message, shape) {
		var m = new Message(message);
		m.atShape(shape);
		this.addItem(m);
	}
}

/* 	Message
	Message text, at a specific location or inheriting speed/location
	from an existing sprite */
Message.prototype=new Sprite;
function Message(text) {
	this.dx = 0;
	this.dy = -0.5;
	this.text = text;
	this.age = 0;

	this.update = function() {
		this.move();
	}
	this.atShape = function(shape) {
		this.x = shape.x;
		this.y = shape.y;
		this.dx = shape.dx;
		this.dy = shape.dy;
	}
	this.atLocation = function(x,y) {
		this.x = x;
		this.y = y;
	}
	this.drawIcon = function() {
		ctx.font = messageFont;
	    ctx.fillStyle = messageColor;
		ctx.textAlign = 'center';
	    ctx.fillText(this.text, 0, 0);
		this.age++;
		if (this.age > 40) {
			this.isAlive = false;
		}
	}
}

/* 	Game
	Keeps track of the state of your current game */
function Game() {
	this.score = 0;
	this.lives = lives;
	this.level = 1;
	/*	0 = wait
		1 = ready
		2 = playing
		3 = game over
		4 = win level
		5 = win game */
	this.gameState = 1;

	// Player's ship gets killed
	this.die = function(message) {
		this.waitMode();
		this.lives--;
		if (this.lives < 0) {
			this.gameOver()
		}
	}
	// Game is over
	this.gameOver = function() {
		this.changeState(3);
		clearTimeout(gsTimeout);
	}
	// Start wait mode
	this.waitMode = function() {
		this.changeState(0);
		gsTimeout = setTimeout('game.readyMode()', delayBetweenModes);
	}
	// Start ready mode
	this.readyMode = function() {
		this.changeState(1);
		if (avatar == null || !avatar.isAlive){
			avatar = new Avatar();
		}
		gsTimeout = setTimeout('game.beginPlay()', delayBetweenModes);
	}
	// Start play mode
	this.beginPlay = function() {
		this.changeState(2);
		if (window.beginPlay && typeof(window.beginPlay) === "function") {
			window.beginPlay();
		}
	}
	// Start win level mode
	this.winLevel = function() {
		this.changeState(4);
		if (this.level == levels) {
			this.winGame();
		} else {
			this.level++;
			gsTimeout = setTimeout('game.nextLevel()', delayBetweenModes);
		}
	}
	// Begin a new level
	this.nextLevel = function() {
		newLevel();
		this.readyMode();
	}
	// Start win game mode
	this.winGame = function() {
		this.changeState(5);
	}
	// Change the state and reset counter
	this.changeState = function(state) {
		this.gameState = state;
	}
	// Are we in the middle of active play (i.e., game state)
	this.isActivePlay = function() {
		return (this.gameState == 2);
	}
	// Should the avatar ship be visible given the current state?
	this.isAvatarVisible = function() {
		return (	this.gameState == 1
					|| this.gameState == 2
					|| this.gameState == 4);
	}
	this.addScore = function(value) {
		this.score += value;
	}
	this.addLives = function(value) {
		this.lives += value;
	}
}

/*	Scoreboard
	draws the scoreboard and interface text */
function Scoreboard() {
	this.drawScoreboard = function() {
		ctx.save();
		this.setScoreboardStyle();
		ctx.textAlign = 'left';
		ctx.translate(0, height);
		ctx.fillText(game.score, 20, -20);
		ctx.fillText("L " + game.lives, 120, -20);
		ctx.restore();
	}
	this.drawGetReady = function() {
		this.startScoreboardText();
		ctx.fillText('LEVEL ' + game.level, 0, -60);
	    ctx.fillText('GET READY!', 0, 70);
		this.endScoreboardText();
	}
	this.drawGameOver = function() {
		this.startScoreboardText();
	    ctx.fillText('GAME OVER', 0, 0);
	    ctx.fillText('Reload to play again', 0, 40);
		this.endScoreboardText();
	}
	this.drawLevelComplete = function() {
		this.startScoreboardText();
	    ctx.fillText('LEVEL COMPLETE', 0, 0);
	    ctx.fillText('Score: ' + game.score, 0, 40);
		this.endScoreboardText();
	}
	this.drawWinGame = function() {
		this.startScoreboardText();
	    ctx.fillText('YOU WIN!!!', 0, 0);
	    ctx.fillText('Score: ' + game.score, 0, 40);
	    ctx.fillText('Reload to play again', 0, 80);
		this.endScoreboardText();
	}
	this.startScoreboardText = function() {
		ctx.save();
		ctx.translate(width/2, height/2);
		this.setScoreboardStyle();
	}
	this.endScoreboardText = function() {
		ctx.restore();
	}
	this.setScoreboardStyle = function() {
		ctx.font = scoreboardFont;
	    ctx.fillStyle = scoreboardColor;
		ctx.textAlign = 'center';
	}
	this.updateAndDraw = function() {
		switch (game.gameState) {
			case 1:
				// "Get Ready" State
				this.drawGetReady();
				this.drawScoreboard();
				break;
			case 2:
				// Game Play State
				this.drawScoreboard();
				break;
			case 3:
				// Game Over State
				this.drawGameOver();
				break;
			case 4:
				// Level Complete
				this.drawLevelComplete();
				break;
			case 5:
				// YOU WIN State
				this.drawWinGame();
				break;
			default:
				break;
		}
	}
}

// ---------------------------------
// Global Functions

var clear = function(){
	ctx.fillStyle = bgcolor;
	rect(0, 0, width, height);
	if (bgImage != null) {
		ctx.drawImage(bgImage, 0, 0, width, height);
	}
}
var randColor = function(){
	return Math.round(0xffffff * Math.random()).toString(16);
}
var ellipse = function(x, y, r){
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}
var rect = function(x, y, w, h){
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
}
var cEllipse = function(size) {
	ellipse(0, 0, size);
}
var cRect = function(w, h) {
	rect(-w/2, -h/2, w, h);
}
var cImg = function(img, size) {
	ctx.drawImage(img, (-1 * size), (-1 * size), size*2, size*2);
}
var randElement = function(arr) {
	var index = Math.round(Math.random() * (arr.length-1));
	console.log(index);
	return arr[index];
}
var getMouseX = function(e) {
	return e.pageX - c.offsetLeft;
}
var getMouseY = function(e) {
	return e.pageY - c.offsetTop;
}