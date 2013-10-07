/** Given a day number from 0 to 6, return the full day of the week for that number. */
var getDayName = function(dayNumber) {
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return dayNames[dayNumber];
};