$(function() {

	var clock = $('<div class="clock">');

	var outerShell = $('<div class="outer-shell">');

	var innerShell = $('<div class="inner-shell">');

	var pmLabel = $('<div class="pm-label">PM</div></div>');

	var autoLabel = $('<div class="auto-label">AUTO</div>');

	var clockFace = $('<div class="clock-face">')

	var clockScreen = $('<div class="clock-screen">');

	var clockAmPmIndicator= $('<div class="clock-am-pm-indicator">•</div>');

	var clockText = $('<div class="clock-text">3:23</div>');

	var radio = $('<div class="radio">');

	var bottomAm = $('<div class="bottom-am"><div class="bottom-am-label">AM</div><div class="bottom-am-frequencies">53 60 70 90 110 140 170</div></div>');
	var bottomPm = $('<div class="bottom-pm"><span class="bottom-pm-label">PM</span><span class="bottom-pm-frequencies">88 92 96 102 106 108</span></div>');

	clock.append(outerShell);
	outerShell.append(innerShell);
	innerShell
		.append(clockFace)
		.append(radio);
	clockFace
		.append(pmLabel)
		.append(autoLabel)
		.append(clockScreen)
	radio
		.append(bottomAm)
		.append(bottomPm);
	clockScreen
		.append(clockAmPmIndicator)
		.append(clockText);

	$('.container').append(clock);

});
