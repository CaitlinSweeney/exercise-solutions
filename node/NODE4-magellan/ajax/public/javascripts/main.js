var cityTemplate;
$(function(){
  var source = $('#city-template').html();
  cityTemplate = Handlebars.compile(source);
  updateCity('seville');
  $(document).on('click', '.next', function(){
    updateCity($(this).data('target'));
    return false;
  });
});

function updateCity(city){
  $.get('/api/', {city: city}, function(data){
    $('#cityContainer').html(cityTemplate(data));
  });
}