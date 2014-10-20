$(function(){

  // post form to server: PART II.
  $('#application-form').on('submit', function(e){
    e.preventDefault();

    $.post('/applicant', $(this).serialize(), function(data){
    	if(data['success']){
    	  console.log('SUCCESSFUL-SUBMIT');
    	  $('#success-message').removeClass('hidden');
    	}
    });

  });


  // post delete applicant: BONUS I.
  $('.delete').on('click', function(e){

    $row = $(this).parent('li') //handle for removal.

    $.post('/deleteApplicant', {id: e.target.id}, function(data){
    	if(data['success']){
    	  console.log('SUCCESSFUL-DELETE');
    	  $row.remove();
    	}
    });

  });

});