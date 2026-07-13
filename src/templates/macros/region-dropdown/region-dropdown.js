import { defineComponent } from '@/js/helpers/defineComponent';
import { defineEscapeClick } from '@/js/helpers/defineEscapeClick';

const SELECTOR = '.js-region-dropdown';

defineComponent({
  selector: SELECTOR,
  setup(dropdown) {
    const toggle = dropdown.querySelector('.js-region-dropdown-toggle');
    const panel = dropdown.querySelector('.js-region-dropdown-panel');

    const openClass = 'region-dropdown--open';

    const closeDropdown = (dropdown) => {
      dropdown.classList.remove(openClass);
      toggle?.setAttribute('aria-expanded', 'false');
      panel?.setAttribute('aria-hidden', 'true');
    };

    const closeAll = () => {
      document.querySelectorAll(SELECTOR).forEach((dropdown) => {
        closeDropdown(dropdown);
      });
    };

    const openDropdown = () => {
      if (dropdown.classList.contains(openClass)) {
        closeDropdown(dropdown);
        return;
      }

      closeAll();

      dropdown.classList.add(openClass);

      toggle.setAttribute('aria-expanded', 'true');
      panel?.setAttribute('aria-hidden', 'false');
    };

    toggle?.addEventListener('click', openDropdown);

    defineEscapeClick([dropdown], openClass, () => closeDropdown(dropdown));
  },
});
