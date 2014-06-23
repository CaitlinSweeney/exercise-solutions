var getUserDetails = function(uid){
  getFriends(uid, function(friends){
    for(var friend in friends.friends){
      getUpdates(friend,
        function(updates){
          if(updates.length > 0){
            getUser(friend, function(details){
              printUser(details, updates);
            });
          }
        }
      );
    }
  });
}

//test with user 0
getUserDetails(0);


/*********************************/
/** DO NOT EDIT BELOW THIS LINE **/
/*********************************/

/**
 * MOCK - get friends list
 * @param  {number} uid user id
 * @return {void}
 */
function getFriends(uid, callback){
  callback({
    uid: uid,
    friends: [0, 1, 2, 3]
  });
}

/**
 * MOCK - get user updates
 * @param  {number} uid user id
 * @return {void}
 */
function getUpdates(uid, callback){
  callback([
    "Finally home!",
    "Just had an entire chocolate cake. Regrets = 0.",
    "My dog is trying to eat the cat. Brb."
  ]);
}

/**
 * MOCK - get user details
 * @param  {number} uid user id
 * @return {void}
 */
function getUser(uid, callback){
  callback({
    uid: uid,
    name: "John Doe"
  });
}

/**
 * MOCK - print user details
 * @param  {object} details user details
 * @param  {array} updates all user updates
 * @return {void}
 */
function printUser(details, updates){
  var userOb = {details: details, updates: updates};
  console.log(userOb);
}
