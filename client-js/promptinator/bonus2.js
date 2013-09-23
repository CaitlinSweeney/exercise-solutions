var victimNames = [];
var victimPhones = [];
var victimStreets = [];
var volunteerNames = [];
var volunteerPhones = [];
var volunteerStreets = [];

var more = true;
while(more) {
	victimNames.push(prompt("Please enter the victim's name:"));
	victimPhones.push(prompt("Please enter the victim's phone number:"));
	victimStreets.push(prompt("Please enter the victim's street:"));
	more = confirm('Would you like to enter another victim?');
}

more = true;
while(more) {
	volunteerNames.push(prompt("Please enter the volunteer's name:"));
	volunteerPhones.push(prompt("Please enter the volunteer's phone number:"));
	volunteerStreets.push(prompt("Please enter the volunteer's street:"));
	more = confirm('Would you like to enter another volunteer?');
}

var message = "# Victims: " + victimNames.length + "\n" +
	"# Volunteers: " + volunteerNames.length + "\n";

message += "Victims:\n";
for(var i=0; i<victimNames.length; i++) {
	message += "  Name: " + victimNames[i] + ", " +
		"Phone: " + victimPhones[i] + ", " + 
		"Street: " + victimStreets[i] + "\n";
}

message += "Volunteers:\n";
for(var i=0; i<volunteerNames.length; i++) {
	message += "  Name: " + volunteerNames[i] + ", " +
		"Phone: " + volunteerPhones[i] + ", " + 
		"Street: " + volunteerStreets[i] + "\n";
}

alert(message);

var victimIndex = null;
var nearbyVolunteers = [];

var need = prompt('Please enter the name of a person in need:');
for(var i=0; i<victimNames.length; i++) {
	if(victimNames[i] === need) {
		victimIndex = i;
	}
}

for(var i=0; i<volunteerStreets.length; i++) {
	if(volunteerStreets[i] === victimStreets[victimIndex]) {
		nearbyVolunteers.push(volunteerNames[i]);
	}
}

if(nearbyVolunteers.length > 0) {
	alert("Volunteers on the same street: \n" + nearbyVolunteers.join(', '));
}
else {
	alert("No volunteers are close enough to help!");
}
