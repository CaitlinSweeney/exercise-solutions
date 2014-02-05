// FoodItem
function FoodItem(name, calories, vegan, glutenFree, citrusFree) {
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
}

FoodItem.prototype.toString = function() {
	return [
		'{0}',
		'Calories: {1}',
		'Vegan: {2}',
		'Gluten Free: {3}',
		'Citrus Free: {4}'
	].join('\n').supplant([
		this.name,
		this.calories,
		this.vegan ? '✔' : '✘',
		this.glutenFree ? '✔' : '✘',
		this.citrusFree ? '✔' : '✘'
	])
}

// Plate
function Plate(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
}

Plate.prototype.toString = function() {
	return [
		'{0} - {1}',
		'Vegan: {2}',
		'Gluten Free: {3}',
		'Citrus Free: {4}',
		'Ingredients: \n{5}'
	].join('\n').supplant([
		this.name,
		this.description,
		this.isVegan() ? '✔' : '✘',
		this.isGlutenFree() ? '✔' : '✘',
		this.isCitrusFree() ? '✔' : '✘',
		pluck(this.ingredients, 'name').join('\n  ')
	])
}

Plate.prototype.isVegan = function() {
	return and(pluck(this.ingredients, 'vegan'));
}

Plate.prototype.isGlutenFree = function() {
	return and(pluck(this.ingredients, 'glutenFree'));
}

Plate.prototype.isCitrusFree = function() {
	return and(pluck(this.ingredients, 'citrusFree'));
}

// Drink
function Drink(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
}

Drink.prototype.toString = function() {
	return [
		'{0} - {1}',
		'Ingredients: \n{2}'
	].join('\n').supplant([
		this.name,
		this.description,
		pluck(this.ingredients, 'name').join('\n  ')
	])
}

// Order
function Order(plates) {
	this.plates = plates;
}

Order.prototype.toString = function() {
	return this.plates.join('\n\n');
}

// Menu
function Menu(plates) {
	this.plates = plates;
}

Menu.prototype.toString = function() {
	return this.plates.join('\n\n');
}

// Restaurant
function Restaurant(name, description, menu) {
	this.name = name;
	this.description = description;
	this.menu = menu;
}

Restaurant.prototype.toString = function() {
	return [
		'Welcome to {0}!',
		'---------------------------',
		'{1}',
		'',
		'== Menu ==',
		'{2}'
	].join('\n').supplant([
		this.name,
		this.description,
		this.menu.toString()
	]);
}


// Customer
function Customer(dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
}

Customer.prototype.toString = function() {
	return 'Hi, I\'m ' + this.dietaryPreference;
}


// Part II TEST
var tortilla = new FoodItem('Tortilla', 300, true, false, true);
var avocado = new FoodItem('Avocado', 90, true, true, true);
var carne = new FoodItem('Carne', 250, false, true, true);

var onion = new FoodItem('Onion', 50, true, true, true);
var cilantro = new FoodItem('Cilantro', 30, true, true, true);

var tequila = new FoodItem('Tequila', 200, true, true, true);
var triplesec = new FoodItem('Triple Sec', 100, true, true, true);
var lime = new FoodItem('Lime', 40, true, true, false);

var burrito = new Plate('Burrito', 'A hearty meal.', 10, [tortilla, avocado, carne]);
var guacamole = new Plate('Guácomole', 'What chips were invented for.', 4, [avocado, onion, cilantro, lime]);
var margarita = new Drink('Margarita', 'Delicious and make you feel good.', 6, [tequila, triplesec, lime]);

var menu = new Menu([burrito, guacamole, margarita]);
var restaurant = new Restaurant('Banditos Fritos', 'A fine Mexican dining experience.', menu);

var out = restaurant.toString();
console.log(out);
