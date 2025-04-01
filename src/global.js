import $ from 'jquery';


window.$ = $;
window.jQuery = $;


async function loadFlyonUI() {
  return import('flyonui/flyonui');
}

export async function initFlyonUI() {
  await loadFlyonUI();
}