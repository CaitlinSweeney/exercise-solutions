/*

    Color utility

 */


/**
 * Calculate the luminosity of the given color components
 * @param  {number} r R Component
 * @param  {number} g G component
 * @param  {number} b B Component
 * @return {number}   Luminosity
 */
var luminosity = function(r, g, b){
    return 0.2126*r + 0.7152*g + 0.0722*b;
};

/**
 * Darken a single component by 20%
 * @param  {number} color Component value to darken
 * @return {number}       Darkened value
 */
var darkenColorComponent = function(color){
    return color - (color * 0.2);
};

/**
 * Darken the given RGB values
 * @param  {number} r R Component
 * @param  {number} g G component
 * @param  {number} b B Component
 * @return {object}   Darkened RGB values
 */
var darkenRGB = function(r, g, b){
    return {
        r: darkenColorComponent(r),
        g: darkenColorComponent(g),
        b: darkenColorComponent(b)
    };
};

// Expose functionality
module.exports = {
    luminosity: luminosity,
    darken: darkenRGB
};
