/* globals.js */

// Define all of the game's global variables and settings. Load all image and
// audio assets into variables that will be used by other scripts.

/* --------------------------------------- */
/* Images */

var avatarImage = new Image();
avatarImage.src = "./assets/car.png";

var baddieImage = new Image();
baddieImage.src = "./assets/wall.png";

var bgImage = new Image();
bgImage.src = "./assets/city.jpg";

/* --------------------------------------- */
/* Sounds */

var goodieSound = new Audio("./assets/goodie.wav");
var explodeSound = new Audio("./assets/explode.wav");
var winLevelSound = new Audio("./assets/levelup.wav");


/* --------------------------------------- */
/* Colors */

// Game Background Color
var bgcolor = 'white';

// Message Color
var messageColor = 'white';
var messageFont = '15pt Helvetica';

// Scoreboard Text Color
var scoreboardColor = 'white';
var scoreboardFont = '20pt Helvetica';

/* --------------------------------------- */
/* Items In Play */

var numBaddies = 5;		// The number of baddies to create in level 1
var numGoodies = 5;		// The number of goodies to create in every level
var goodiesLeft = 0;	// A variable to count down the number of goodies left

// Messages to play when you collect goodies
var goodieMessages = ['nice!', 'awesome!', 'sweet!'];
// Messages to play when you hit baddies
var baddieMessages = ['you died', 'you stink', 'oops'];

/* --------------------------------------- */
/* Lives & Levels */

// The number of extra lives you start with
var lives = 2;
// The total number of levels to complete to win the game
var levels = 5;

/* --------------------------------------- */
/* Speeds */

// How Fast Object Follows the Mouse
var mouseFollowSpeed = 0.05;

// How Fast Keys Accelerate object
var keyAccelSpeed = 0.5;

// Delay between modes
var delayBetweenModes = 1500;

/* --------------------------------------- */
/* Random Sprite Size & Speed */

// Maximum size of randomized sprites
var randMaxSize = 30;
// Maximum x-speed of randomized sprites
var randMaxDx = 3;
// Maximum y-speed of randomized sprites
var randMaxDy = 3;
