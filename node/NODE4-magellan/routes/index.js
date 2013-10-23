var fs = require('fs');

var getCity = function (id, cityCallback){
  fs.readFile('data.json', function (err, data){
    var cities = JSON.parse(data);
    cityCallback(cities[id]);
  });
}

/*
exports.index = function(req, res){
  getCity(req.params.city || 'seville', function(city){
    res.render('index', city);
  });
};
/*/
exports.index = function(req, res){
  res.render('spaIndex', {title: 'Magellan'});
}
exports.api = function(req, res){
  getCity(req.query.city, function(city){
    res.send(city);
  });
}
//*/