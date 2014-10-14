var fs = require('fs');

var csvFileName = process.argv[2];
var jsonFileName = process.argv[3];

var csvFileContents = fs.readFileSync(csvFileName, 'utf-8');

// break the CSV into rows
var rows = csvFileContents.split('\n');

// take out the first row, get that row, and split by comma
var labels = rows.splice(0, 1)[0].split(',');

// convert the remaining rows into objects
var results = rows
    // remove rows that are empty
    .filter(function(row){
        return row !== '';
    })
    // replace string rows with an object representation
    .map(function(row){
        // Break the row up by commas
        var columns = row.split(',');
        // Create a temporary object
        var obj = {};
        // For each of the columns, map them to a preset label
        for (var i = 0; i < columns.length; i++) {
            var thisKey = labels[i];
            var thisValue = columns[i];
            obj[thisKey] = thisValue;
        }
        return obj;
    });

// Convert JS objects into JSON
var resultsJson = JSON.stringify(results);

// Print results to console
console.log(resultsJson);

// Store results in the file
fs.writeFileSync(jsonFileName, resultsJson);
