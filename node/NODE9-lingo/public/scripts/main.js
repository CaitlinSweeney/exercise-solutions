/**
 * Helper for rendering questions
 * @param  {object} questionData Data about the question
 */
var showQuestion = function(questionData) {
  $('#question-word').text(questionData.word);
  $('#question-language').text(questionData.language);
  $('#quiz-question').removeClass('hidden');
  $('#question-translation').val('').focus();
}

/**
 * Render a class-ified version of the result. This
 * will call out any errors by character, so make sure
 * classes match.
 * @param  {Array} results List of result characters and their errors
 * @return {string}         HTML string
 */
var buildHtmlFromResults = function(results) {
  return results.result.breakdown.map(function(letter, index) {
    var val = letter.letter;
    if(index != 0) val = val.toLowerCase();
    if(letter.error)
      return '<span class="error '+letter.error+'">' + val + '</span>';
    return val;

  }).join('');
}

$(function () {
  
  // Handle the submission of the translate form
  $('#translate').on('submit', function(e) {
    e.preventDefault();
    var postData = {
      from: $('#from').val(),
      to:   $('#to').val(),
      word: $('#word').val()
    };
    $.post('/translate', postData, function(data) {
      // On data received from server, render result
      $('#translation-result').text(
        '"' + data.original + '" in ' + data.toLang.name + ' is ' + data.translation
      );
    });
  });


  // Handle submission of the start quiz form
  $('#start-quiz').on('submit', function(e) {
    e.preventDefault();

    // Hide the start quiz section
    $(this).addClass('hidden');

    var language = $('#quiz-language').val();
    // Tell the server which language was chosen. The server
    // will update the data and then tell us the first question,
    // so render that result
    $.get('/start-quiz', {language: language}, showQuestion);

  });
  
  // Handle submission of an answer to a quiz question
  $('#quiz-question').on('submit', function(e) {
    e.preventDefault();
    $(this).addClass('hidden');

    var answer = $('#question-translation').val();
    $.post('/answer-question', {answer: answer}, function(results) {
      // Render details about the user's answer
      $('#question-results').removeClass('hidden');
      $('#result-message').text(results.result.correct?'Correct!':'Incorrect!');
      $('#result-original').text(results.question.original);
      $('#result-language').text(results.language);
      $('#result-answer').html(buildHtmlFromResults(results));

      if(results.endOfQuiz){
        // If the quiz is over, go to the results section
        $('#next-question').addClass('hidden');
        $('.results').removeClass('hidden');
      }
    });

  });

  // Handle clicking of the next question button
  $('#next-question').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.quiz-section').addClass('hidden');
    $.get('/next-question', showQuestion);
  });

  // Handle clicking the button to show quiz results
  $('.results').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.quiz-section').addClass('hidden');
    // Ask the server for quiz results
    $.get('/results', function(results) {
      $('#quiz-results').removeClass('hidden');

      $('#quiz-result-message').text(
        'You have ' + (results.quizResults.passed ? 'passed' : 'failed') + ' the quiz!'
      );
      $('#quiz-result-passed').text(
        'You got ' + (results.quizResults.questionResults.pass || 0) +
        ' out of ' + results.quiz.questions.length + ' correct.'
      );

      if(results.quizResults.allowQuizType){
        // If the server says we are allowed to select our own
        // quiz type, show the custom quiz selection bit.
        $('#regular-quiz').addClass('hidden');
        $('#custom-quiz').removeClass('hidden');
      }
    });
  });

  // Handle clicking a new quiz link (of any type)
  $('.new-quiz').on('click', function(e) {
    e.preventDefault();
    $('#quiz-results, #question-results, #quiz-question, #start-quiz').addClass('hidden');
    $('.results').addClass('hidden');
    $('#next-question').removeClass('hidden');

    var quizType = $(this).attr('data-type');
    // Ask server to start a new quiz for us
    $.get('/start-quiz', {type: quizType}, showQuestion);
  });

  // Allow user to see their own statistics
  $('#view-stats').on('click', function(e) {
    e.preventDefault();
    $('#quiz-results, #question-results, #quiz-question, #start-quiz').addClass('hidden');
    $('#quiz-stats').removeClass('hidden');
    $('.results').removeClass('hidden');

    $.get('/stats', function(stats) {
      $('#quizzes-passed').text(stats.quizzesPassed);
      $('#quizzes-failed').text(stats.quizzesFailed);
      $('#total-quizzes').text(stats.totalQuizzes);
      $('#quiz-passed-percent').text((stats.quizPassedPercent * 100).toFixed(1) + '%');
      $('#words-passed').text(stats.wordsPassed);
      $('#words-failed').text(stats.wordsFailed);
      $('#total-words').text(stats.totalWords);
      $('#words-passed-percent').text((stats.wordsPassedPercent * 100).toFixed(1) + '%');
      $('#words-best').text(stats.wordsBest.map(function(word) {
        return word.original;
      }).join(', '));
      $('#words-worst').text(stats.wordsWorst.map(function(word) {
        return word.original;
      }).join(', '));
    })
  });
});