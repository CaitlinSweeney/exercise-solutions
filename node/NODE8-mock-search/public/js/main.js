$(function () {
  
  // Precompile the template for re-use
  var resultTemplateSrc = $('#result-template').html();
  var resultTemplate = Handlebars.compile(resultTemplateSrc);

  // Handle search form on submit
  $('#search-form').on('submit', function(e) {

    // Prevent form from actually submitting
    e.preventDefault();

    // Generate form data to send with post ajax request
    var searchData = {
      term: $('#search-text').val()
    };

    // Perform ajax request
    $.post('/search', searchData, function(results) {

      // Clear any previous results
      $('#result').empty();

      // Loop over result-set...
      for (var i = 0; i < results.length; i++) {

        // Compile the template function and append the resulting
        // html to the result div.
        $('#result').append( resultTemplate(results[i]) );
      };

    });
  });

});