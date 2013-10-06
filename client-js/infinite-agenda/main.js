var days = {};

$(function domReady() {

	var autoincrement = 0;
	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	function getDayDate(dayEl) {
		var time = dayEl.attr('data-timestamp') + ' 00:00';
		return new Date(time);
	}

	function getDayTimestamp(date) {
		return'{0}-{1}-{2}'.supplant([date.getFullYear(), date.getMonth()+1, date.getDate()]);
	}

	function addAppointment(date, name) {
		var key = getDayTimestamp(date);
		var newId = autoincrement++;
		if(!(key in days)) {
			days[key] = {
				appointments: {}
			}
		}
		days[key].appointments[newId] = {
			name: name
		};

		return newId;
	}

	function editAppointment(date, id, name) {
		var key = getDayTimestamp(date);
		days[key].appointments[id].name = name;
		console.log(days);
	}

	function renderFirstWeek() {
		for(var i=0; i<7; i++) {
			var date = new Date();
			date.setDate(date.getDate() + i);
			appendDay(date);
		}
	}

	function appendDay(date) {
		var item = $('<li>');
		item.append(createDay(date));
		$('#agenda-list').append(item);
	}

	function createDay(date) {
		var dayName = dayNames[date.getDay()];
		var month = monthNames[date.getMonth()].substring(0,3);
		var day = pad((date.getDate() + 1).toString(), 2, '0', 1);
		var percent = date.getDay() * 45/7 + 50;
		var timestamp = getDayTimestamp(date);

		var dayEl = $('<div class="day" data-timestamp="{0}">'.supplant([timestamp]));
		var headingEl = $('<h3 class="day-heading"><time>{0} {1} {2}</time></h3>'.supplant([dayName, month, day]));
		headingEl.css('color', 'hsl(255,{0}%,{0}%)'.supplant([percent]));
		var appointmentsEl = $('<ul class="appointments list-unstyled"></ul>');
		dayEl.append(headingEl);
		dayEl.append(appointmentsEl);
		return dayEl;
	}

	function createAppointmentForm(className, val) {
		var formEl = $('<form class="{0} form-inline">'.supplant([className]));
		var nameInput = $('<div class="form-group"><input name="name" class="form-control" placeholder="Appointment Name" value="{0}"></div>'
			.supplant([val || '']));
		formEl.append(nameInput);
		return formEl;
	}

	function createAppointment(id, text) {
		var appointmentEl = $('<li class="appointment" data-id="{0}"><div class="appointment-text">{1}</div></li>'
			.supplant([id, text]));
		return appointmentEl;
	}

	function addAppointmentForm(dayEl) {
		var date = getDayDate(dayEl);
			var appointment = createAppointmentForm('new-appointment');
			$(dayEl).append(appointment);
			appointment.find('input:first').focus();
	}

	$(document).on('click', '.day-heading', function dayClickHandler() {
		var dayEl = $(this).closest('.day');
		if($('form', dayEl).length === 0) {
			addAppointmentForm(dayEl);
		}
	});

	$(document).on('click', '.appointment-text', function appointmentClickHandler() {
		var dayEl = $(this).closest('.day');
		$(this).hide();
		var formEl = createAppointmentForm('edit-appointment', $(this).text());
		$(this).after(formEl);
		formEl.find('input:first').focus();
	});

	$(document).on('submit', '.new-appointment', function newAppointmentSubmitHandler() {
		var dayEl = $(this).closest('.day');
		var date = getDayDate(dayEl);

		// get the appointment name from form
		var name = $('[name=name]', this).val();

		// save the new appointment to the database
		var newId = addAppointment(date, name);

		// create and render a new appointment
		var appointmentEl = createAppointment(newId, name);
		$('.appointments', dayEl).append(appointmentEl);
		$(this).remove();

		addAppointmentForm(dayEl);

		return false;
	});

	$(document).on('keydown', '.new-appointment', function newAppointmentKeydownHandler(e) {
		if(e.keyCode === 27) // ESC
		{
			$(this).remove();
		}
	});

	$(document).on('submit', '.edit-appointment', function editAppointmentSubmitHandler() {
		var dayEl = $(this).closest('.day');
		var appointmentEl = $(this).closest('.appointment');

		// get values
		var id = appointmentEl.attr('data-id');
		var name = $('[name=name]', this).val();
		var date = getDayDate(dayEl);

		// save to database
		editAppointment(date, id, name);

		$('.appointment-text', appointmentEl).text(name).show();
		$(this).remove();
		return false;
	});

	$(document).on('keydown', '.edit-appointment', function editAppointmentKeydownHandler(e) {
		if(e.keyCode === 27) // ESC
		{
			var dayEl = $(this).closest('.day');
			$('.appointment-text', dayEl).show();
			$(this).remove();
		}
	});

	$(window).on('scroll', function scrollHandler() {
		var distanceFromBottom = $(document).height() - $(window).scrollTop() - $(window).height()
		if(distanceFromBottom < $(window).height()) {
			var lastDayEl = $('.day:last');
			var date = getDayDate(lastDayEl);
			date.setDate(date.getDate() + 1);
			appendDay(date);
		}
	});

	renderFirstWeek();

});
