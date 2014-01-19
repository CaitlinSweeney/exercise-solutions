$(function(){
	var source = $('#search-results-template').html()
	var template = Handlebars.compile(source)
	$results = $('#results')
	$('#search').on('keyup', function(e){
		if(e.which == 13){
			var val = $(this).val()
			// make a request to the server
			$.get('/search', {search : val}, function(result){
				console.log('RESULT FROM SERVER : ', result)
				$results.html(template({results : result}))
			})
		}
	})
})