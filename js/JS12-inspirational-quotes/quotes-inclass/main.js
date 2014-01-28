$(function() {

	// DATA
	var getQuoteData = function() {
		var quotes = [
			{
				author: 'Helen Keller',
				text: "College isn't the place to go for ideas.",
				rating: 4
			},
			{
				author: 'George Sewell',
				text: 'Fear is the tax that conscience pays to guilt.',
				rating: 2
			},
			{
				author: 'Helen Keller',
				text: "Life is either a daring adventure or nothing. Security does not exist in nature, nor do the children of men as a whole experience it. Avoiding danger is no safer in the long run than exposure.",
				rating: 3
			}
		];

		return quotes;
	};


	// HTML RENDERING
	var renderQuotes = function(quotes) {

		var filteredQuotes = quotes;
		if(authorFilter.length > 0) {
			filteredQuotes = filter(quotes, function(quote) {
				return quote.author === authorFilter;
			});
		}

		$('#quotes').empty();
		var listEl = $('<ul class="list-unstyled"></ul>');

		for(var i=0; i<filteredQuotes.length; i++) {
			var quote = createQuote(filteredQuotes[i], i);
			var item = $('<li></li>');
			item.append(quote);
			listEl.append(item);
		}

		$('#quotes').append(listEl);
	};

	var createQuote = function(quote, i) {
		var quoteEl = $('<div class="quote" data-index="{0}"></div>'.supplant([i]));
		var textEl = $('<q class="quote-text">{text}</q>'.supplant(quote));
		var authorEl = $('<cite><a href="#" class="quote-author">{author}</a></cite>'.supplant(quote));

		var ratingEl = createRating(quote.rating);
		var deleteEl = $('<a class="quote-delete btn btn-xs btn-danger">&times;</a>');

		quoteEl.append(textEl);
		quoteEl.append(authorEl);
		quoteEl.append(ratingEl);
		quoteEl.append(deleteEl);

		return quoteEl;
	};

	var createRating = function(rating) {
		return $(('<div class="quote-rating"><div class="btn-group btn-group-xs" data-toggle="buttons">' + 
  		'<label class="btn btn-default{0}">' + 
	    	'<input type="radio" name="options" id="rating1" value="1">1' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{1}">' + 
	    	'<input type="radio" name="options" id="rating2" value="2">2' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{2}">' + 
	    	'<input type="radio" name="options" id="rating3" value="3">3' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{3}">' + 
	    	'<input type="radio" name="options" id="rating4" value="4">4' + 
	  	'</label>' + 
	  	'<label class="btn btn-default{4}">' + 
	    	'<input type="radio" name="options" id="rating5" value="5">5' + 
	  	'</label>' + 
		'</div></div>').supplant([
			rating === 1 ? ' active' : '',
			rating === 2 ? ' active' : '',
			rating === 3 ? ' active' : '',
			rating === 4 ? ' active' : '',
			rating === 5 ? ' active' : ''
		]));
	};


	var getFormQuote = function() {
		return {
			author: 	$('#inputAuthor').val(),
			text: 		$('#inputQuote').val(),
			rating: 	null
		};
	};


	// EVENTS
	$('#add-quote-form').on('submit', function() {
		var newQuote = getFormQuote();
		quotes.push(newQuote);
		renderQuotes(quotes);
		$('#add-quote-form input').val('');
		$('#inputAuthor').focus();
		return false;
	});

	$(document).on('click', '.quote-rating', function() {
		var parent = $(this).parents('[data-index]:first');
		//var index = parent.attr('data-index');
		var index = parent.data('index');
		var rating = $('.active input', this).val();
		quotes[index].rating = +rating;

		sortByKeyReverse(quotes, 'rating');
		renderQuotes(quotes);
	});

	$(document).on('click', '.quote-delete', function() {
		var parent = $(this).parents('[data-index]:first');
		//var index = parent.attr('data-index');
		var index = parent.data('index');
		quotes.splice(index, 1);
		renderQuotes(quotes);
	});

	$(document).on('click', '.quote-author', function() {
		var author = $(this).text();
		$('#author-shown-name').text(author);
		$('#author-form-group').addClass('animate-left-collapsed');
		$('#author-shown').removeClass('animate-left-collapsed');
		$('#inputAuthor').val(author);

		authorFilter = author;
		renderQuotes(quotes);
	});

	$(document).on('click', '#author-shown-close', function() {
		$('#author-form-group').removeClass('animate-left-collapsed');
		$('#author-shown').addClass('animate-left-collapsed');
		$('#inputAuthor').val('');
		authorFilter = '';
		renderQuotes(quotes);
	});

	// MAIN
	var quotes = getQuoteData();
	var authorFilter = '';
	sortByKeyReverse(quotes, 'rating');
	renderQuotes(quotes);

});
