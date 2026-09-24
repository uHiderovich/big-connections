import '@/assets/scss/main.scss';
import 'virtual:svg-icons-register';

import { Modal } from './modal/manager';
import '@/templates/macros/nav-dropdown/nav-dropdown';
import '@/templates/macros/region-dropdown/region-dropdown';
import '@/templates/partials/city-panel/city-panel';

import.meta.glob('../templates/**/*.scss', { eager: true });

Modal.init();

if (document.querySelector('.js-hero-slider')) {
  import('@/templates/partials/hero/hero');
}

let callbackFormsPromise = null;

const loadCallbackForms = () => {
  callbackFormsPromise ??= import('@/templates/partials/callback/modal/callback-modal');

  return callbackFormsPromise;
};

const callbackTriggerSelector = '[data-bc-open="callback-modal"]';

const loadOnTriggerIntent = (event) => {
  if (event.target.closest?.(callbackTriggerSelector)) {
    loadCallbackForms();
  }
};

document.addEventListener('pointerover', loadOnTriggerIntent, { passive: true });
document.addEventListener('focusin', loadOnTriggerIntent);

const callbackBoxes = document.querySelectorAll('.js-callback-box');

if (callbackBoxes.length) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      loadCallbackForms();
    }
  }, { rootMargin: '200px' });

  callbackBoxes.forEach((box) => observer.observe(box));
}

const onIdle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 4000));

window.addEventListener('load', () => onIdle(loadCallbackForms), { once: true });
