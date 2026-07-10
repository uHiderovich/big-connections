import { closeNavDropdowns } from '../../macros/nav-dropdown/nav-dropdown';
import { setScrollLocked } from '../../../js/modules/scroll-lock';

export function init() {
  const panel = document.querySelector('.js-city-select-panel');

  if (!panel) {
    return;
  }

  const toggle = document.querySelector('.js-city-select-toggle');
  const overlay = panel.querySelector('.js-city-select-overlay');
  const stayButton = panel.querySelector('.js-city-select-stay');
  const openClass = 'city-panel--open';
  const closingClass = 'city-panel--closing';

  const setOpen = (isOpen) => {
    if (panel.classList.contains(closingClass)) {
      return;
    }

    if (isOpen) {
      panel.classList.remove(closingClass);
      panel.classList.add(openClass);
      panel.setAttribute('aria-hidden', 'false');
      overlay?.setAttribute('aria-hidden', 'false');
      toggle?.setAttribute('aria-expanded', 'true');
      setScrollLocked('city-panel', true);
      return;
    }

    if (!panel.classList.contains(openClass)) {
      return;
    }

    panel.classList.remove(openClass);
    panel.classList.add(closingClass);
    toggle?.setAttribute('aria-expanded', 'false');
    overlay?.setAttribute('aria-hidden', 'true');
  };

  panel.addEventListener('animationend', (event) => {
    if (event.target !== panel || event.animationName !== 'city-panel-close') {
      return;
    }

    panel.classList.remove(closingClass);
    panel.setAttribute('aria-hidden', 'true');
    setScrollLocked('city-panel', false);
  });

  toggle?.addEventListener('click', () => {
    closeNavDropdowns();
    setOpen(!panel.classList.contains(openClass));
  });

  stayButton?.addEventListener('click', () => {
    setOpen(false);
  });

  overlay?.addEventListener('click', () => {
    setOpen(false);
  });
}
