$(function() {

	var power = null;

	$('.power').on('click', function() {
		$('.selected-power').removeClass('selected-power');
		$(this).addClass('selected-power');
		power = $(this).attr('data-power');
		return false;
	});

	$('#land .btn').on('click', function() {
		$(this).removeClass('btn-danger').removeClass('.btn-info');
		if(power === 'fire') {
			$(this).addClass('btn-danger');
		}
		else if(power === 'water') {
			$(this).addClass('btn-info');
		}
		return false;
	});

	var run = function() {
		$('#land .btn-danger').each(function() {
			var next = $(this).parent().next().children().eq(0);
			var prev = $(this).parent().prev().children().eq(0);
			burnhot(next);
			burnhot(prev);
		});

		$('#land .btn-warning').each(function() {
			var next = $(this).parent().next().children().eq(0);
			var next2 = $(this).parent().next().next().children().eq(0);
			var prev = $(this).parent().prev().children().eq(0);
			var prev2 = $(this).parent().prev().prev().children().eq(0);
			burnwarm(next);
			burnwarm(prev);

			if(!isWater(next)) {
				burnwarm(next2);
			}

			if(!isWater(prev)) {
				burnwarm(prev2);
			}
		});
	};

	var burnwarm = function(el) {
		if(!isWater(el) && !isHot(el)) {
			el.addClass('btn-warning');
		}
	};

	var burnhot = function(el) {
		if(!isWater(el)) {
			if(isWarm(el)) {
				el.addClass('btn-danger');
			}
			else {
				el.addClass('btn-warning');
			}
		}
	};

	var isWater = function(el) {
		return el.hasClass('btn-info');
	};

	var isHot = function(el) {
		return el.hasClass('btn-danger');
	};

	var isWarm = function(el) {
		return el.hasClass('btn-warning');
	};

	setInterval(run, 1000);

});
