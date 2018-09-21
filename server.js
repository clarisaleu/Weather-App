const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// TO DO FIX API KEY

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', { weather: null, error: null });
});

app.post('/', function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${'3810563fa33964675dd1a10f3b6f7c15'}`;
  request(url, function(err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {
          weather: null,
          error: 'Error, please try again'
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${
          weather.name
        }!`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, ip, function() {
  console.log('Server running on http://%s:%s', ip, port);
});
module.exports = app;
