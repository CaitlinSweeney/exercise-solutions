$(function() {

	// HTML RENDERING
	var renderQuotes = function(quotes) {
		$("#quotes").empty().append(createQuotesList(quotes));
	}

	var createQuotesList = function(quotes) {
		var list = $('<ul class="list-unstyled">');
		for(var i=0; i<quotes.length; i++) {
			var quoteEl = createQuote(quotes[i]);
			var item = $('<li>');
			item.append(quoteEl);
			list.append(item);
		}
		return list;
	};

	var createQuote = function(quote) {
		var quoteEl = $('<div class="quote"></div>');
		var quoteControls = $('<div class="quote-controls"></div>')
		var ratingEl = createRating(quote.rating);
		var deleteEl = $('<a class="quote-delete btn btn-xs btn-danger">x</a>');
		var quoteTextEl = $('<q class="quote-text">{quote}</q>'.supplant(quote));
		var authorEl = $('<div class="quote-author">-{author}</div>'.supplant(quote));

		quoteEl.append(quoteTextEl);
		quoteEl.append(authorEl);

		quoteControls.append(ratingEl);
		quoteControls.append(deleteEl);
		quoteEl.append(quoteControls);

		return quoteEl;
	};

	var createRating = function(rating) {
		return $(('<div class="quote-rating"><div class="btn-group" data-toggle="buttons">' + 
  		'<label class="btn btn-default btn-xs{0}">' + 
	    	'<input type="radio" name="options" id="rating1"> 1' + 
	  	'</label>' + 
	  	'<label class="btn btn-default btn-xs{1}">' + 
	    	'<input type="radio" name="options" id="rating2"> 2' + 
	  	'</label>' + 
	  	'<label class="btn btn-default btn-xs{2}">' + 
	    	'<input type="radio" name="options" id="rating3"> 3' + 
	  	'</label>' + 
	  	'<label class="btn btn-default btn-xs{3}">' + 
	    	'<input type="radio" name="options" id="rating4"> 4' + 
	  	'</label>' + 
	  	'<label class="btn btn-default btn-xs{4}">' + 
	    	'<input type="radio" name="options" id="rating5"> 5' + 
	  	'</label>' + 
		'</div></div>').supplant([
			rating === 1 ? ' active' : '',
			rating === 2 ? ' active' : '',
			rating === 3 ? ' active' : '',
			rating === 4 ? ' active' : '',
			rating === 5 ? ' active' : ''
		]));
	};

	// FORM PROCESSING
	var getQuote = function() {
		return {
			author: $('#inputAuthor').val(),
			quote: $('#inputQuote').val()
		};
	};

	var clearQuoteForm = function() {
		$('#add-quote-form input').val('');
		clearValidation();
	};

	var clearValidation = function() {
		$('#validation-message').addClass('hidden')
		$('#add-quote-form .has-error').removeClass('has-error');
	};

	var validateForm = function() {

		clearValidation();

		var valid = true;

		if($('#inputAuthor').val().length === 0) {
			$('#inputAuthor').parents('.form-group:first').addClass('has-error');
			valid = false;
		}

		if($('#inputQuote').val().length === 0) {
			$('#inputQuote').parents('.form-group:first').addClass('has-error');
			valid = false;

		}
		return valid;
	};

	var displayValidationError = function() {

		$('#validation-message')
			.removeClass('hidden')
			.text('Please fill out all fields.');
	};

	// INITIALIZATION
	var getQuoteData = function() {
		var quotes = [
			{
				author: 'Helen Keller',
				quote: "College isn't the place to go for ideas.",
				rating: 3
			},
			{
				author: 'Helen Keller',
				quote: "Life is either a daring adventure or nothing. Security does not exist in nature, nor do the children of men as a whole experience it. Avoiding danger is no safer in the long run than exposure.",
				rating: 5
			},
			{
				author: 'George Sewell',
				quote: 'Fear is the tax that conscience pays to guilt.'
			}
		];

		return quotes;
	};

	// MAIN
	$('#add-quote-form').submit(function() {
		if(validateForm()) {
			quotes.push(getQuote());
			renderQuotes(quotes);
			clearQuoteForm();
		}
		else {
			displayValidationError();
		}
		return false;
	});

	var quotes = getQuoteData();
	renderQuotes(quotes);

});
