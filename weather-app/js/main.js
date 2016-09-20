(function () {
  'use strict';

  var TEMPERATURE_SELECTOR = '.temperature';
  var LOCATION_SELECTOR = '.location';
  var CONDITIONS_SELECTOR = '.conditions';
  var WIND_SELECTOR = '.wind';
  var IMG_SELECTOR = '.weather-icon';

  var temperatureElement = document.querySelector(TEMPERATURE_SELECTOR);
  var locationElement = document.querySelector(LOCATION_SELECTOR);
  var conditionsElement = document.querySelector(CONDITIONS_SELECTOR);
  var windElement = document.querySelector(WIND_SELECTOR);
  var imageElement = document.querySelector(IMG_SELECTOR);

  var API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather';
  var API_KEY = 'c2389f8342748200b6a1cb23ed83fe1f';

  var UNITS = {
    METRICS: 'metric',
    IMPERIAL: 'imperial'
  };
  var currentUnit = UNITS.METRICS;

  function toggleUnits() {
    currentUnit = currentUnit === UNITS.METRICS ? UNITS.IMPERIAL : UNITS.METRICS;
  }

  function getUnit () {
    return currentUnit === UNITS.METRICS ? '°C' : '°K';
  }

  function showWeather(weatherResponse) {
    var temperature = weatherResponse.main.temp;
    var conditions = weatherResponse.weather[0].description;
    var windSpeed = weatherResponse.wind.speed;
    var city = weatherResponse.city;
    var icon = weatherResponse.weather[0].icon;

    temperatureElement.textContent = temperature + ' ' + getUnit();
    locationElement.textContent = city;
    conditionsElement.textContent = conditions;
    windElement.textContent = 'Wind: ' + windSpeed + ' m/s';
    imageElement.src = 'img/weather-icons/' + icon + '.png';
  }

  function getWeather(latitude, longitude, city) {
    console.log(latitude, longitude, city);
    var URL = API_ENDPOINT
      + '?lat=' + latitude
      + '&lon=' + longitude
      + '&APPID=' + API_KEY
      + '&units=' + currentUnit;
    $.ajax({
      type: 'POST',
      url: URL,
      contentType: "application/x-www-form-urlencoded"
    }).done(function(response) {
      console.log(response);
      response.city = city;
      showWeather(response);
    }).fail(function(response) {
      console.log('weather fetch failed');
    });
    // var response = {
    //   "coord":{"lon":-99.1,"lat":19.43},
    //   "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
    //   "base":"stations",
    //   "main":{"temp":293.443,"pressure":762.48,"humidity":59,"temp_min":293.443,"temp_max":293.443,"sea_level":1021.5,"grnd_level":762.48},
    //   "wind":{"speed":0.76,"deg":26.0017},
    //   "rain":{"3h":0.255},
    //   "clouds":{"all":32},
    //
    //   "dt":1474321837,
    //   "sys":{"message":0.1699,"country":"MX","sunrise":1474287899,"sunset":1474331638},
    //   "id":3827407,
    //   "name":"Venustiano Carranza",
    //   "cod":200
    // };
    // response.city = city;
    // showWeather(response);
  }

  function getLocation(callback) {
    $.getJSON('http://ipinfo.io')
      .done(function (data) {
        var latlng = data.loc.split(',');
        var latitude = parseFloat(latlng[0]);
        var longitude = parseFloat(latlng[1]);
        var city = data.city + ', ' + data.country;
        callback(latitude, longitude, city);
      })
      .fail(function () {
        console.log('location fetch failed');
      });
  }

  getLocation(getWeather);
}());
