export function defineComponent({ selector, setup }) {
  document.querySelectorAll(selector).forEach(setup);
}