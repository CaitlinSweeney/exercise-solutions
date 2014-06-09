// Allow the user to enter a word
var word = prompt('Enter a word');

// Get the length of the word
var wordLength = word.length;

// Get the third character
// (found at index 2 because arrays and strings are 0-indexed,
// meaning that the first character is at index 0)
var thirdCharacter = word.charAt(2);

// Lower and upper case versions of the word
var wordLower = word.toLowerCase();
var wordUpper = word.toUpperCase();

// Generate a sentence including the word
var sentence = 'I have wanted a ' + word + ' since I was little.';

// Get a part of the word from character 2 to character 4, inclusively
var subWord = word.substr(1,3);

// Compile information into a string, using \n to represent a new line
var info = 'You entered: ' + word + '\n' +
           'There are ' + wordLength + ' characters in the word\n' +
           'The third character is "' + thirdCharacter + '"\n' +
           'Lowercase: ' + wordLower + '\n' +
           'Uppercase: ' + wordUpper + '\n' +
           'Example: ' + sentence + '\n' +
           'Subword: ' + subWord;

// Print the info string to an alert
alert(info);