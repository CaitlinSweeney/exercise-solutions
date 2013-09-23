var victimNames = [];
var victimPhones = [];
var victimStreets = [];
var volunteerNames = [];
var volunteerPhones = [];
var volunteerStreets = [];

var victimCount = parseInt(prompt('How many victims do you wish to enter?'));
for(var i=0; i<victimCount; i++) {
	victimNames.push(prompt("Please enter the victim's name:"));
	victimPhones.push(prompt("Please enter the victim's phone number:"));
	victimStreets.push(prompt("Please enter the victim's street:"));
}

var volunteerCount = parseInt(prompt('How many volunteers do you wish to enter?'));
for(var i=0; i<volunteerCount; i++) {
	volunteerNames.push(prompt("Please enter the volunteer's name:"));
	volunteerPhones.push(prompt("Please enter the volunteer's phone number:"));
	volunteerStreets.push(prompt("Please enter the volunteer's street:"));
}

var message = "# Victims: " + victimCount + "\n" +
	"# Volunteers: " + volunteerCount + "\n";

message += "Victims:\n";
for(var i=0; i<victimCount; i++) {
	message += "  Name: " + victimNames[i] + ", " +
		"Phone: " + victimPhones[i] + ", " + 
		"Street: " + victimStreets[i] + "\n";
}

message += "Volunteers:\n";
for(var i=0; i<volunteerCount; i++) {
	message += "  Name: " + volunteerNames[i] + ", " +
		"Phone: " + volunteerPhones[i] + ", " + 
		"Street: " + volunteerStreets[i] + "\n";
}

alert(message);