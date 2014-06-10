$(document).on('ready', function() {

  var toggleEdit = function(){
    var edit = $('#edit');
    edit.toggleClass('active');
    if(edit.hasClass('active')){
      $('#toggle-edit').text('Close Edit');
    } else {
      $('#toggle-edit').text('Edit');
    }
  };

  $('#toggle-edit').on('click', function(){
    toggleEdit();
  });

  $('#edit input').on('input', function(){
    var value = $(this).val();
    var targetId = $(this).attr('data-target');
    var targetElement = $('#' + targetId);
    targetElement.text(value);
  });
});