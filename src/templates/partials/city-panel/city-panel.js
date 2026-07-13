import { closeNavDropdowns } from '@/templates/macros/nav-dropdown/nav-dropdown';
import { setScrollLocked } from '@/js/helpers/scroll-lock';
import { defineEscapeClick } from '@/js/helpers/defineEscapeClick';
import { defineComponent } from '@/js/helpers/defineComponent';

defineComponent({
  selector: '.js-city-select-panel',
  setup(panel) {
    const toggle = document.querySelector('.js-city-select-toggle');
    const overlay = panel.querySelector('.js-city-select-overlay');
    const stayButton = panel.querySelector('.js-city-select-stay');

    const openClass = 'city-panel--open';

    const closePanel = () => {
      panel.classList.remove(openClass);
      panel.setAttribute('aria-hidden', 'true');
      toggle?.setAttribute('aria-expanded', 'false');
      overlay?.setAttribute('aria-hidden', 'true');
      setScrollLocked('city-panel', false);
    };

    const openPanel = () => {
      panel.classList.add(openClass);
      panel.setAttribute('aria-hidden', 'false');
      overlay?.setAttribute('aria-hidden', 'false');
      toggle?.setAttribute('aria-expanded', 'true');
      setScrollLocked('city-panel', true);
    };

    toggle?.addEventListener('click', () => {
      closeNavDropdowns();

      if (panel.classList.contains(openClass)) {
        closePanel();
        return;
      }

      openPanel();
    });

    stayButton?.addEventListener('click', closePanel);

    overlay?.addEventListener('click', closePanel);

    defineEscapeClick([panel], openClass, closePanel);
  },
});
