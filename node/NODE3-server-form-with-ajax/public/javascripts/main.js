$(function() {

  $("#signup-form").submit(function() {
  	// use jQuery's serialize function to pull all the values from the form
  	var requestData = $(this).serialize();

  	// submit a POST request to the root endpoint
    $.post("/", requestData, function(data) {
      console.log('Data from server:', data);
      $('#results').text("Success!");
    });

    // cancel the default browser behavior of submitting the form with a page refresh
    return false;
  });

});