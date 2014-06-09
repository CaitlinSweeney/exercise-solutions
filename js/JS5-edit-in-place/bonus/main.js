$(document).on('ready', function() {

  // Set default to inline
  $.fn.editable.defaults.mode = 'inline';

  // Apply x-editable plugin to all items with editable class
  $('.editable').editable();

});