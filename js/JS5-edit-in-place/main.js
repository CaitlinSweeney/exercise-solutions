$(document).on('ready', function() {

  // Listen for clicks on elements with the "editable" class
  $('.editable').on('click', function(){

    // store a reference to the clicked element,
    // which we will need to use in the blur event later
    var originalField = $(this);

    // add a new textarea after the clicked element in the dom
    var input = $('<textarea class="edit-input" />');
    $(this).after(input);

    // fix the height to match, since css is defining a fluid width
    input.height($(this).height());

    // hide the clicked element
    $(this).hide();

    // set the value of the textarea to match the current content
    input.val($(this).text());

    // set focus on the new field
    input.focus();

    // listen for the blur event on the new field
    input.on('blur', function(){

      // when the input is blurred, update the original field to
      // the input's value
      originalField.text(input.val());

      // remove the input
      input.remove();

      // show the original element
      originalField.show();

    });

  });

});