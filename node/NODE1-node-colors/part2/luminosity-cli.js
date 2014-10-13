// load in the color utility js filter
var colorutil = require('./colorutil.js');

// Get the r, g, b components from command line arguments
var r = process.argv[2];
var g = process.argv[3];
var b = process.argv[4];

// Calculate the luminosity value from the given rgb
var luminosity = colorutil.luminosity(r, g, b);

// Print the result to the console
console.log(luminosity);
