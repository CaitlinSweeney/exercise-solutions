
$(document).ready(function(){

	// variables
	var person1 = {firstName: 'Marvin', age: 42, color: 'green'};
	var person2 = {firstName: 'Zaphod', age: 42000000000, color: 'peachpuff'};
	var person3 = {firstName: 'Gollum', age: 589, color: 'green'};
	var personList = [person1, person3];

	// functions
	var printGreeting = function() {
	 	$('#greeting').html('Hello, ' + this.firstName + ". ");
	};

	var greetOneAnother = function(a, b) {
	 	$('#greeting').append("{0}, meet {1} and {2}".supplant([this.firstName, a.firstName, b.firstName]));
	};

	var clickButton = function() {
		var buttonClicked = $(this).text();
		$('#context').text(buttonClicked);
	};
	$('button').on('click', clickButton);

	// call solution
	printGreeting.call(person1);

    // apply solution
	greetOneAnother.apply(person2, personList);

    // click solution
	clickButton.call($('#button1'));



});