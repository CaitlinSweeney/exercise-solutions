/*

    In order to get started with this example,
    you need to install all the dependencies by
    running "npm install" from the command line
    when inside this directory. This will install
    all necessary components/packages to make it work.

 */

// Load in the request module from NPM
var request = require('request');

// Set the url for the web-colors content
var webcolorsUrl = 'https://cdn.rawgit.com/metaraine/swatch/74580660c9229541622bbf1fd4198618d9f677e5/webcolors.json';

// Pull the color name to search for from the command line arguments
var requestedColorName = process.argv[2];

// Execute a request to the web colors url
request(webcolorsUrl, function(err, response, body) {
    // Parse the response body json into JS
    var colors = JSON.parse(body);

    // Search through the array for any matches
    var matches = colors.filter(function(color){
        // If this returns true, as in the name matches the request,
        // this item will be included in the results
        return color.name.toLowerCase() === requestedColorName.toLowerCase();
    });

    // If no matches found, tell the user
    if(matches.length === 0){
        console.log('No match found!');
    } else {
        // A match (or matches) were found, so let's
        // just use the first one found
        var match = matches[0];

        // Console.log the resulting RGB values.
        console.log(match.rgb.r, match.rgb.g, match.rgb.b);
    }
});
