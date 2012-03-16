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