(function () {
  'use strict';

  var TEMPERATURE_SELECTOR = '.temperature';
  var LOCATION_SELECTOR = '.location';
  var CONDITIONS_SELECTOR = '.conditions';
  var WIND_SELECTOR = '.wind';

  var temperature = document.querySelector(TEMPERATURE_SELECTOR);
  var location = document.querySelector(LOCATION_SELECTOR);
  var conditions = document.querySelector(CONDITIONS_SELECTOR);
  var wind = document.querySelector(WIND_SELECTOR);

  var API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather';
  var API_KEY = 'c2389f8342748200b6a1cb23ed83fe1f';

  function showWeather(weatherResponse) {
    var weather = weatherResponse.weather;
    var wind = weatherResponse.wind;
  }

  function getWeather(latitude, longitude, city) {
    console.log(latitude, longitude, city);
    var URL = API_ENDPOINT + '?lat=' + latitude + '&lon=' + longitude + '&APPID=' + API_KEY;
    console.log(URL);
    // $.ajax({
    //   type: 'POST',
    //   url: URL,
    //   contentType: "application/x-www-form-urlencoded"
    // }).done(function(response) {
    //   console.log(response);
    // }).fail(function(response) {
    //   console.log('weather fetch failed');
    // });
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
