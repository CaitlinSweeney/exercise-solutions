
/*
 * GET users listing.
 */

exports.page = function(req, res){
  res.render('example_jade_page', { title: 'Jade Example Page', topics: ["tags","id and class literals","attributes","piped text","conditionals","mixins"] });
};