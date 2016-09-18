(function () {
  'use strict';
  /* SELECTORS */
  var QUOTE_SELECTOR = '.quote';
  var AUTHOR_SELECTOR = '.author span';
  var NEW_BUTTON_SELECTOR = '.new-button';
  var QUOTE_FRAME_SELECTOR = '.quote-frame';
  var LINK_SELECTOR = '.twitter-link';
  var ICON_SELECTOR = '.twitter-icon';
  var BODY_SELECTOR = 'body';
  var API_ENDPOINT = 'https://andruxnet-random-famous-quotes.p.mashape.com/';

  /* ELEMENTS */
  var newButton = document.querySelector(NEW_BUTTON_SELECTOR);
  var link = document.querySelector(LINK_SELECTOR);
  var quoteParagraph = document.querySelector(QUOTE_SELECTOR);
  var authorParagraph = document.querySelector(AUTHOR_SELECTOR);
  var quoteFrame = document.querySelector(QUOTE_FRAME_SELECTOR);
  var bodyElement = document.querySelector(BODY_SELECTOR);
  var iconElement = document.querySelector(ICON_SELECTOR);

  var currentQuote = null;
  var ERROR_QUOTE = {
    quote: 'Houston, we\'ve had a problem here',
    author: 'Apollo 13'
  };
  var LINK_BASE_URL = 'https://twitter.com/intent/tweet?hashtags=quotes'

  function init () {
    newButton.addEventListener('click', function () {
      quoteFrame.classList.remove('load');
      getRandomQuote();
    });
    link.addEventListener('click', function (e) {
      var url = LINK_BASE_URL + "&text=" + encodeURIComponent(quoteToString(currentQuote));
      link.href = url;
      link.target = '_blank';
    })
    getRandomQuote();
  }

  function showQuote (quoteObject) {
    quoteParagraph.textContent = quoteText(quoteObject.quote);
    quoteFrame.classList.add('load');
    authorParagraph.textContent = quoteObject.author;
    setNewUIColor();
  }

  function setNewUIColor () {
    var color = getRandomColor();
    bodyElement.style.backgroundColor = color;
    bodyElement.style.color = color;
    iconElement.style.color = color;
    newButton.style.backgroundColor = color;
  }

  function getRandomColor () {
    return "#" + Math.random().toString(16).slice(2, 8);
  }

  function quoteText(text) {
    return '"' + text +'"';
  }

  function quoteToString(quoteObject) {
    return quoteText(quoteObject.quote) + ' - ' + quoteObject.author;
  }

  function getRandomQuote () {
    newButton.disabled = true;
    $.ajax({
      type: 'POST',
      url: API_ENDPOINT,
      headers: {
        'X-Mashape-Key': 'OTZErxzwiLmshHOzHVkhJ25OOO59p1B7ANwjsnZFximEZWTFgo'
      },
      contentType: "application/x-www-form-urlencoded"
    }).done(function(response) {
      currentQuote = JSON.parse(response);
      showQuote(currentQuote);
    }).fail(function(response) {
      currentQuote = ERROR_QUOTE;
      showQuote(currentQuote);
    }).always(function () {
      newButton.disabled = false;
    });
  }

  // Start the application
  init();
}());
