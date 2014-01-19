var getItemAt = function (array, index) {
  if(index >= array.length || index < 0){
    throw 'Index ' + index + ' is out of bounds!';
  } else {
    return array[index];
  }
}

var printItemAt = function (array, index){
  try {
    console.log(getItemAt(array, index));
  } catch(error){
    console.log('Couldn\'t print item at ' + index + ': ' + error);
  }
}

var myArray = ['hello', 'there', 'friend'];
printItemAt(myArray, 0);
printItemAt(myArray, 50);