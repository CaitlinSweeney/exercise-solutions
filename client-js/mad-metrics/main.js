$(function() {

	var startTime = $.now();
	var sectionInterval = 100;
	var lastScrollTop = 0;
	var maxScrollTop = 0;
	var totalScrollAmount = 0;
	var startTime = (new Date()).getTime()
	var docHeight = $(document).height();
	var winHeight = $(window).height();
	var signupTime = null;
	var sections = {};

	/** Instantiates. */
	var initializeSections = function() {
		$(".metric-section").each(function() {
			sections[$(this).attr('id')] = 0;
		});
	};

	/** Formats and displays collected metrics. */
	var showMetrics = function() {

		if(signupTime) {
			formattedSignupClick = formatTimeSpan(signupTime);
		}
		else {
			formattedSignupClick = "not clicked";
		}

		var metricsMessage = ("Percentage Scrolled: {0}%\n" +
			"Total Distance Scrolled: {1}px\n" + 
			"Time Before Clicking Signup: {2}\n" +
			"Time Spent on Page {3}\n" +
			"Time Spent On Sections: \n{4}").supplant([
				roundToPlace(maxScrollTop / (docHeight - winHeight) * 100, 2),
				totalScrollAmount,
				formattedSignupClick,
				formatTimeSpan($.now() - startTime),
				formatObj(sections, formatTimeSpan)
			]);

		console.log(metricsMessage);
		return false;
	};

	/* Save the time elapsed when the user clicks the Call To Action */
	var registerCallToAction = function() {
		if(!signupTime) {
			signupTime = $.now() - startTime;
		}
		return false;
	};

	/** Updates the total amount scrolled and the maximum scroll distance */
	var updateScrollMetrics = function() {

		var scrollTop = $(window).scrollTop();

		// update max scroll top
		if(scrollTop > maxScrollTop) {
			maxScrollTop = scrollTop;
		}

		totalScrollAmount += Math.abs(scrollTop - lastScrollTop);
		lastScrollTop = scrollTop;
	};

	var gatherSectionMetrics = function() {
		var closest = getClosestTo($(".metric-section"), $(window).scrollTop());
		var id = closest.attr('id');
		sections[id] += sectionInterval;

		//$('.highlight').removeClass('highlight');
		//closest.addClass('highlight');
	};

	$("#metrics-button").click(showMetrics);
	$(".call-to-action").click(registerCallToAction);
	$(window).scroll(updateScrollMetrics);
	setInterval(gatherSectionMetrics, sectionInterval);
	initializeSections();

});