$(function() {

	// HTML CREATION
	var renderQuotes = function() {
		var quoteList = createQuotesList(quotes, filteredAuthor);
		var quoteListEl = Creatable.createHtml(quoteList);
		$("#quotes").empty().append(quoteListEl);
	}

	var createQuotesList = function(quotes, filteredAuthor) {
		return ['ul.list-unstyled', map(quotes, function(quote, i) {
			return !filteredAuthor || quote.author === filteredAuthor ?
				['li', [createQuote(quote, i)]] : null;
		})];
	};

	var createQuote = function(quote, i) {
		return ['.quote.clearfix', { 'data-index': i }, [
			['q.quote-text', quote.quote],
			['.quote-author a.quote-author-link', quote.author],
			['.quote-controls', [
				createRating(quote.rating),
				['a.quote-delete.btn.btn-xs.btn-danger', '&times;']
			]]
		]];
	};

	var createRating = function(rating) {
		return ['.quote-rating', [
			['.btn-group.btn-group-xs', { 'data-toggle': 'buttons' }, map(range(1,6), function(i) {
				return ['label.btn.btn-default' + (rating === i ? '.active' : ''), [
					['input', { type: 'radio', name: 'options', value: i }],
					i
				]];
			})]
		]];
	};

	// DOM MANIPULATION
	var showByAuthor = function(author) {
		$('#author-form-group').addClass('animate-left-collapsed')
		$('#author-shown').removeClass('animate-left-collapsed');
		$('#author-shown-author').text(author);
		$('#inputAuthor').val(author);
		$('#inputQuote').focus();
	};

	var hideByAuthor = function(author) {
		$('#author-form-group').removeClass('animate-left-collapsed')
		$('#author-shown').addClass('animate-left-collapsed');
		$('#inputAuthor').val(author);
		$('#inputAuthor').focus();
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
		$('#inputAuthor').focus();
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


	// DATA
	var getQuoteData = function() {
		return JSON.parse(localStorage.quotes || null);
	};

	var saveQuoteData = function() {
		localStorage.quotes = JSON.stringify(quotes);
	};


	// EVENTS
	$('#add-quote-form').submit(function() {
		if(validateForm()) {
			quotes.splice(0,0,getQuote());
			saveQuoteData();
			renderQuotes();
			clearQuoteForm();
		}
		else {
			displayValidationError();
		}
		return false;
	});

	// delete a quote
	$(document).on('click', '.quote-delete', function() {
		$('#random-quote-modal').modal('hide');
		var quote = $(this).parents('.quote:first')
		var index = quote.data('index');
		quotes.splice(index,1);
		saveQuoteData();
		renderQuotes();
	});

	// rate a quote
	$(document).on('click', '.quote-rating .btn', function() {
		var index = $(this).parents('.quote:first').data('index');
		quotes[index].rating = +$(this).text();
		quotes.sort(compareByReverseRating);
		saveQuoteData();
		renderQuotes();
	});

	// filter by author
	$(document).on('click', '.quote-author-link', function() {
		var author = $(this).text().substring(1);
		filteredAuthor = author;
		showByAuthor(author);
		$('#random-quote-modal').modal('hide');
		clearValidation();
		renderQuotes();
		// $('.quote-author-link').remove();
	});

	// remove filter by author
	$('#author-shown-close').on('click', function() {
		hideByAuthor();
		filteredAuthor = ''
		renderQuotes();
	});

	// show a random quote in a modal
	$('#random-quote-button').on('click', function() {
		var index = Math.floor(Math.random() * quotes.length);
		var quote = createQuote(quotes[index], index);
		var quoteEl = Creatable.createHtml(quote);
		$('#random-quote-modal .modal-body').empty().append(quoteEl);
		$('#random-quote-modal').modal('show');
	});


	// MAIN
	var quotes = getQuoteData();
	var filteredAuthor = '';
	quotes.sort(compareByReverseRating);
	renderQuotes();
	$('#inputAuthor').focus();

});
