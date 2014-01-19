$(function() {

	var tortilla = new FoodItem('Tortilla', 300, true, false, true);
	var avocado = new FoodItem('Avocado', 90, true, true, true);
	var carne = new FoodItem('Carne', 250, false, true, true);

	var onion = new FoodItem('Onion', 50, true, true, true);
	var cilantro = new FoodItem('Cilantro', 30, true, true, true);

	var tequila = new FoodItem('Tequila', 200, true, true, true);
	var triplesec = new FoodItem('Triple Sec', 100, true, true, true);
	var lime = new FoodItem('Lime', 40, true, true, false);

	var burrito = new Plate('Burrito', 'A hearty meal.', 10, [tortilla, avocado, carne]);
	var guacamole = new Plate('Guácamole', 'What chips were invented for.', 4, [avocado, onion, cilantro, lime]);
	var margarita = new Drink('Margarita', 'Delicious and make you feel good.', 6, [tequila, triplesec, lime]);

	var menu = new Menu([burrito, guacamole, margarita]);
	var restaurant = new Restaurant('Banditos Fritos', 'A fine Mexican dining experience.', menu);
	window.menu = menu;

	// render the page title and description
	$('#page-title').text(restaurant.name);
	$('#page-description').text(restaurant.description);

	// render the menu
	$('#menu').html(menu.create());
});
