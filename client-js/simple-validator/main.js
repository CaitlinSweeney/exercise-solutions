var phone = prompt('Please enter your phone number with dashes:');
alert(phone.charAt(3) === '-' && phone.charAt(7) === "-");

var birthdate = prompt('Please enter your birth date in the format mm/dd/yy:');
alert(birthdate.charAt(2) === '/' && birthdate.charAt(5) === "/");

var postal = prompt('Please enter your postal code:');
alert(postal.length === 5 || postal.length === 10 && postal.charAt(5) === '-');

var state = prompt('Please enter your state code:');
alert(state.length === 2 && state === state.toUpperCase());

var married = prompt('Are you married?');
alert(married.toLowerCase() === 'yes' || married.toLowerCase() === 'no');
