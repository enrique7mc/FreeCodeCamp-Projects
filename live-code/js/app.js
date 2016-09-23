import $ from 'jquery';

/*
 * ELEMENTS
 */

const $htmlTextArea = $('[name=html-text-area]');
const $cssTextArea = $('[name=css-text-area]');
const $jsTextArea = $('[name=javascript-text-area]');
const $output = $('.output');

const showCode = ($element, filePath) => {
  $.get(filePath)
  .done((data) => {
    $element.val(`${data}`);
    // add to preview
    $output.append(data);
  })
  .fail(() => {
    console.log('error');
  });
};

showCode($htmlTextArea, '../demo-code/demo.html');
// showCode($cssTextArea, '../demo-code/demo.css');
// showCode($jsTextArea, '../demo-code/demo.js');
