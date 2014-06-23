var currentUser = null;

var login = function(email){
  currentUser = email;
}

var logout = function(){
  currentUser = null;
}

var getLoggedInUser = function(){
  getUserDetails(currentUser, function(result){
    if(result === null){
      console.log('Not logged in');
      return;
    }

    console.log(result);
    //print out friends list
    var output = '';
    for(var id in result.friends){
      output += id + ', ';
    }
    console.log(output);
  });
}

login('john@doe.com');
getLoggedInUser();
logout();
getLoggedInUser();




/*********************************/
/** DO NOT EDIT BELOW THIS LINE **/
/*********************************/

/**
 * MOCK - get user details
 * @param  {string} email
 * @return {void}
 */
function getUserDetails(email, callback){
  if(email){
    callback({
      email: email,
      username: 'John Doe',
      friends: [0,1,2,3]
    });
  } else {
    callback(null);
  }
}
