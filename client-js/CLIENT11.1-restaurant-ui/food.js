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

FoodItem.prototype.create = function() {
	return '<div class="food-item">{name}</div>'.supplant(this);
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
		'Ingredients: \n  {5}'
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
	for(var i=0, len=this.ingredients.length; i<len; i++) {
		if(!this.ingredients[i].vegan) {
			return false;
		}
	}
	return true;
}

Plate.prototype.isGlutenFree = function() {
	for(var i=0, len=this.ingredients.length; i<len; i++) {
		if(!this.ingredients[i].glutenFree) {
			return false;
		}
	}
	return true;
}

Plate.prototype.isCitrusFree = function() {
	for(var i=0, len=this.ingredients.length; i<len; i++) {
		if(!this.ingredients[i].citrusFree) {
			return false;
		}
	}
	return true;
}

Plate.prototype.create = function() { 
	return '<div class="plate"><h3>{name}</h3><h4>{description}</h4><ul>{0}</ul></div>'
		.supplant(this)
		.supplant([
			RJS.map(
				RJS.map(RJS.pluck(this.ingredients, 'create')), 
				RJS.rcurry(RJS.bookend, ['<li>', '</li>'])
			).join('')
		]);
}

/*
// ADVANCED: Here is how you can abstract the above logic to eliminate the looping redundancy
Plate.prototype.isTrueOfAllIngredients = function(prop) {
	for(var i=0, len=this.ingredients.length; i<len; i++) {
		if(!this.ingredients[i][prop]) {
			return false;
		}
	}
	return true;
}

Plate.prototype.isVegan = function() {
	return this.isTrueOfAllIngredients('vegan');
}

Plate.prototype.isGlutenFree = function() {
	return this.isTrueOfAllIngredients('glutenFree');
}

Plate.prototype.isCitrusFree = function() {
	return this.isTrueOfAllIngredients('citrusFree');
}
*/

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
		'Ingredients: \n  {2}'
	].join('\n').supplant([
		this.name,
		this.description,
		pluck(this.ingredients, 'name').join('\n  ')
	])
}

Drink.prototype.create = Plate.prototype.create;

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

Menu.prototype.create = function() {
	return '<ul class="list-unstyled">{0}</ul>'.supplant([
		RJS.map(RJS.pluck(this.plates, 'create')).join('')
	])
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
