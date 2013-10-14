var myVariable = 'Hello World';

try {
  console.log(myVariable);
} catch(error){
  console.log('myVariable doesn\'t exist!');
} finally {
  console.log('done printing');
}