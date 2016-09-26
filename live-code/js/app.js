import $ from 'jquery';

/*
 * ELEMENTS
 */
const $htmlTextArea = $('[name=html-text-area]');
const $cssTextArea = $('[name=css-text-area]');
const $jsTextArea = $('[name=javascript-text-area]');
const $output = $('.output');
const $textAreas = [$htmlTextArea, $cssTextArea, $jsTextArea, $output];
const $containters = $textAreas.map($t => $t.parent());

const $htmlButton = $('.html-button');
const $cssButton = $('.css-button');
const $jsButton = $('.javascript-button');
const $outputButton = $('.output-button');
const $buttons = [$htmlButton, $cssButton, $jsButton, $outputButton];

const showCode = ($element, filePath) => {
  $.get(filePath)
  .done((data) => {
    $element.val(`${data}`);
    // $output.append(data);
  })
  .fail(() => {
    console.log('error');
  });
};

showCode($htmlTextArea, '../demo-code/demo.html');
showCode($cssTextArea, '../demo-code/demo.css');
showCode($jsTextArea, '../demo-code/demo.js');

/* EVENT HANDLERS */
$buttons.forEach((e, index) => {
  e.on('click', function onClick() {
    if ($(this).hasClass('selected')) {
      $containters[index].append($textAreas[index]);
    } else {
      $textAreas[index].detach();
    }
    $containters[index].toggleClass('code-selected');
    $(this).toggleClass('selected');
  });
});
