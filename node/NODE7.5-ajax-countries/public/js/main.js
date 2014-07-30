/**
 * Helper for rendering a list of countries
 * @param  {array} countries List of countries to render
 */
var renderCountries = function(countries) {
  // First, clear out the list in case it already has content
  $('#countries-list').empty();

  // Loop through all the countries and render a list item for them
  for (var i = 0; i < countries.length; i++) {
    $('#countries-list').append('<li>' + countries[i].name + '</li>');
  }
}

// jQuery onReady
$(function () {
  
  // Handler for the "all countries" button
  $('#get-countries').on('click', function(e) {

    // Make an ajax get request to pull down the list of countries
    $.get('/countries', function(countries) {
      // render the result
      renderCountries(countries);
    });
  });

  // Handler for the "search" button
  $('#search').on('click', function(e) {

    // Set up a postData object to send to the server
    // and fill it with the content of our search input field
    var postData = {
      country: $('#country').val()
    };

    // Ajax post request to search, passing the search term data
    $.post('/search', postData, function(countries) {
      // render the result
      renderCountries(countries);
    });
  });

});