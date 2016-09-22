import $ from 'jquery';

/*
 * ELEMENTS
 */

const $htmlTextArea = $('[name=html-text-area]');
const $cssTextArea = $('[name=css-text-area]');
const $jsTextArea = $('[name=javascript-text-area]');

const showCode = ($element, filePath) => {
  $.get(filePath)
  .done((data) => {
    // console.log(data);
    $element.text(`${data}`);
  })
  .fail(() => {
    console.log('error');
  });
};

showCode($htmlTextArea, '../demo-code/demo.html');
showCode($cssTextArea, '../demo-code/demo.css');
showCode($jsTextArea, '../demo-code/demo.js');
