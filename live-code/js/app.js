import $ from 'jquery';

/*
 * ELEMENTS
 */
const $htmlTextArea = $('[name=html-text-area]');
const $cssTextArea = $('[name=css-text-area]');
const $jsTextArea = $('[name=javascript-text-area]');
const $output = $('.output');
const $textAreas = [$htmlTextArea, $cssTextArea, $jsTextArea, $output];
const $containers = $textAreas.map($t => $t.parent());

const $htmlButton = $('.html-button');
const $cssButton = $('.css-button');
const $jsButton = $('.javascript-button');
const $outputButton = $('.output-button');
const $buttons = [$htmlButton, $cssButton, $jsButton, $outputButton];

let containersSelected = 0;

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
      $containers[index].append($textAreas[index]);
      containersSelected -= 1;
      $containers[index].toggleClass('code-selected');
      $(this).toggleClass('selected');
    } else if (containersSelected < 3) {
      $textAreas[index].detach();
      containersSelected += 1;
      $containers[index].toggleClass('code-selected');
      $(this).toggleClass('selected');
    }
  });
});
