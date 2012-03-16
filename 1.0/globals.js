/* --------------------------------------- */
/* Default Global Variables (not frequently edited) */

/// Canvas
var width = 600;
var height = 600;
var c = document.getElementById('c');

// Background Image
var bgImage = null;

// Context
var ctx = c.getContext('2d');
c.width = width;
c.height = height;

// Main Loop
var mLoop;

// Game State Timeouts
var gsTimeout;

// The avatar
var avatar;

// Sprites
var maxGameSprites = 30;

// Explosions
var explosions;
var maxExplosions = 10;
var numExplodePoints = 50;
var deathTime = 150;

// Messages (onscreen text)
var maxMessages = 10;

/* --------------------------------------- */
/* Defaults that SHOULD be overridden in your game */

/* --------------------------------------- */
/* Colors */

// Game Background Color
var bgcolor = 'white';

// Message Color
var messageColor = 'black';
var messageFont = '15pt Helvetica';

// Scoreboard Text Color
var scoreboardColor = 'black';
var scoreboardFont = '20pt Helvetica';

/* --------------------------------------- */
/* Lives & Levels */

var lives = 2;
var levels = 5;

/* --------------------------------------- */
/* Speeds */

// How Fast Object Follows the Mouse
var mouseFollowSpeed = 0.01;

// How Fast Keys Accelerate object
var keyAccelSpeed = 0.5;

// Delay between modes
var delayBetweenModes = 1500;