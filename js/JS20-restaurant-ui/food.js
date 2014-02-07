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
