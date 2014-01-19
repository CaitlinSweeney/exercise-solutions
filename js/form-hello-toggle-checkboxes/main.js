
// FORM EXAMPLE 1
$(document).ready(function(){
  initExample1();

  initExample2();

  initExample3();
});

function initExample1(){
  $('#form-example-1').submit(function(){

    // pull in the first and last names from the form
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();

    // output the text into html
    $('#output').text('Hello, ' + firstName + ' ' + lastName);

    // clear the form out again
    $('#first-name').val('');
    $('#last-name').val('');

    // and for good measure, set focus back to the first name
    $('#first-name').focus();

    return false;
  });
}


function initExample2(){

  //*

  $('input[name=grouptype]').change(function(){
    //when the selection value is changed, toggle which form is visible
    var grouptype = $(this).val();
    $('#' + grouptype + '-form').show().siblings().hide();
  });

  /*/

  $('#faculty-radio').click(function(){
    $('#faculty-form').show();
    $('#student-form').hide();
  });
  $('#student-radio').click(function(){
    $('#faculty-form').hide();
    $('#student-form').show();
  });

  //*/

  $('#faculty-form form').submit(function(){
    alert('Welcome to the faculty, ' + $('#faculty-name').val());
  });
  $('#student-form form').submit(function(){
    alert('Welcome student ' + $('#student-name').val());
  })
}

//for the dual form, have a trivial submit case

function initExample3(){
  //when the checkbox group value has changed, let's update our color
  //preferences
  $('#form-example-3 input[name=colors]').change(function(){
    //set up an array to store the checked options
    var vals = [];

    //get all checked colors
    $('#form-example-3 input[name=colors]:checked').each(function(){
      vals.push($(this).val());
    });

    //change display based on number of selected colors
    // - save a variable so that the jquery call happens once
    if(vals.length == 0){
      $('#color-output').text("You don't like any colors!?");
    } else {
      $('#color-output').text('You like: ' + vals.join(', '));
    }
  });
}