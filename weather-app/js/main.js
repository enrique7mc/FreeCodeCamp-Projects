(function () {
  'use strict';

  /*
    SELECTORS AND VARIABLES
  */
  var TEMPERATURE_SELECTOR = '.temperature';
  var DEGREE_SELECTOR = '.degree';
  var LOCATION_SELECTOR = '.location';
  var CONDITIONS_SELECTOR = '.conditions';
  var WIND_SELECTOR = '.wind';
  var IMG_SELECTOR = '.weather-icon';
  var SECTION_SELECTOR = '.weather';
  var LOADING_SELECTOR = '.load-icon';
  var ERROR_SELECTOR = '.error';

  var temperatureElement = document.querySelector(TEMPERATURE_SELECTOR);
  var degreeElement = document.querySelector(DEGREE_SELECTOR);
  var locationElement = document.querySelector(LOCATION_SELECTOR);
  var conditionsElement = document.querySelector(CONDITIONS_SELECTOR);
  var windElement = document.querySelector(WIND_SELECTOR);
  var imageElement = document.querySelector(IMG_SELECTOR);
  var sectionElement = document.querySelector(SECTION_SELECTOR);
  var loadingElement = document.querySelector(LOADING_SELECTOR);
  var errorElement = document.querySelector(ERROR_SELECTOR);

  var WEATHER_KEY = 'weatherResponse';
  var TIMESTAMP_KEY = 'timestamp';
  var CACHE_MAX_AGE = 1000 * 60 * 10; // 10 minutes
  var LOCATION_API_ENDPOINT = 'http://ipinfo.io';
  var WEATHER_API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather';
  var WEATHER_API_KEY = 'c2389f8342748200b6a1cb23ed83fe1f';

  var UNITS = {
    METRICS: 'metric',
    IMPERIAL: 'imperial'
  };
  var currentUnit = UNITS.METRICS;
  var currentTemperature = null;

  /*
    UTILITY FUNCTION
  */
  function toggleUnits() {
    currentUnit = currentUnit === UNITS.METRICS ? UNITS.IMPERIAL : UNITS.METRICS;
    degreeElement.textContent = getUnit();
    temperatureElement.textContent = Math.round(currentTemperature[currentUnit]);
  }

  function getUnit () {
    return currentUnit === UNITS.METRICS ? '°C' : '°F';
  }

  function getTemperatureFormats(celsius) {
    var temperature = {};
    temperature[UNITS.METRICS] = celsius;
    temperature[UNITS.IMPERIAL] = celsius * (9/5) + 32;
    return temperature;
  }

  function storageAvailable(type) {
  	try {
  		var storage = window[type],
  			x = '__storage_test__';
  		storage.setItem(x, x);
  		storage.removeItem(x);
  		return true;
  	}
  	catch(e) {
  		return false;
  	}
  }

  /*
    UI FUNCTIONS
  */
  function showErrorMessage() {
    errorElement.classList.remove('hide');
    loadingElement.classList.add('hide');
  }

  function showWeather(weatherResponse, fromCache) {
    var temperature = weatherResponse.main.temp;
    var conditions = weatherResponse.weather[0].description;
    var windSpeed = weatherResponse.wind.speed;
    var city = weatherResponse.city;
    var icon = weatherResponse.weather[0].icon;
    currentTemperature = getTemperatureFormats(temperature);

    temperatureElement.textContent = Math.round(temperature);
    degreeElement.textContent = getUnit();
    locationElement.textContent = city;
    conditionsElement.textContent = conditions;
    windElement.textContent = 'Wind: ' + windSpeed + ' m/s';
    imageElement.src = 'img/weather-icons/' + icon + '.png';

    sectionElement.classList.remove('hide');
    loadingElement.classList.add('hide');

    if (storageAvailable('localStorage') && !fromCache) {
    	localStorage.setItem(WEATHER_KEY, JSON.stringify(weatherResponse));
      localStorage.setItem(TIMESTAMP_KEY, Date.now());
    }
  }

  /*
    API CALL FUNCTIONS
  */
  function getWeather(latitude, longitude, city) {
    if (storageAvailable('localStorage')) {
    	var timestamp = localStorage.getItem(TIMESTAMP_KEY);
      if (Math.floor((new Date() - timestamp)) < CACHE_MAX_AGE ) {
        showWeather(JSON.parse(localStorage.getItem(WEATHER_KEY)), true);
        return;
      }
    }
    var URL = WEATHER_API_ENDPOINT
      + '?lat=' + latitude
      + '&lon=' + longitude
      + '&APPID=' + WEATHER_API_KEY
      + '&units=' + currentUnit;
    $.ajax({
      type: 'POST',
      url: URL,
      contentType: "application/x-www-form-urlencoded"
    }).done(function(response) {
      response.city = city;
      showWeather(response, false);
    }).fail(function(response) {
      showErrorMessage()
    });
  }

  function getLocation(callback) {
    $.getJSON(LOCATION_API_ENDPOINT)
      .done(function (data) {
        var latlng = data.loc.split(',');
        var latitude = parseFloat(latlng[0]);
        var longitude = parseFloat(latlng[1]);
        var city = data.city + ', ' + data.country;
        callback(latitude, longitude, city);
      })
      .fail(function () {
        showErrorMessage();
      });
  }

  /*
    INITIALIZATION
  */
  getLocation(getWeather);
  degreeElement.addEventListener('click', function (e) {
    toggleUnits();
  });
}());
