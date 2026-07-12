import { setScrollLocked } from '../../../js/modules/scroll-lock';
import { setBoxState } from '../callback/form/form.js';

const openClass = 'callback-modal--open';
const overlayOpenClass = 'overlay--open';

export function init() {
  const modal = document.querySelector('.js-callback-modal');

  if (!modal) {
    return;
  }

  const overlay = modal.querySelector('.js-overlay');
  const box = modal.querySelector('.js-callback-box');
  const form = modal.querySelector('.js-callback-form');
  const openTriggers = document.querySelectorAll('.js-callback-modal-open');

  if (!box || !form) {
    return;
  }

  const closeModal = () => {
    modal.classList.remove(openClass);
    modal.setAttribute('aria-hidden', 'true');
    overlay?.classList.remove(overlayOpenClass);
    overlay?.setAttribute('aria-hidden', 'true');
    setScrollLocked('callback-modal', false);
    setBoxState(box);
    form.reset();
    form.querySelectorAll('.callback-form__field').forEach((field) => {
      field.classList.remove('callback-form__field--valid', 'callback-form__field--invalid');
    });
  };

  const openModal = () => {
    modal.classList.add(openClass);
    modal.setAttribute('aria-hidden', 'false');
    overlay?.classList.add(overlayOpenClass);
    overlay?.setAttribute('aria-hidden', 'false');
    setScrollLocked('callback-modal', true);
  };

  openTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    });
  });

  modal.querySelectorAll('.js-modal-close').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains(openClass)) {
      closeModal();
    }
  });
}
