import { setScrollLocked, defineEscapeClick } from '@/js/helpers';
import { defineComponent } from '@/js/helpers';

let closeNavDropdowns = () => {};

export { closeNavDropdowns };

const openClass = 'nav-dropdown--open';
const containerOpenClass = 'nav-dropdown-container--open';

const updateContainerHeight = (container) => {
  const { bottom } = container.getBoundingClientRect();
  container.style.setProperty('--nav-dropdown-container-height', `${Math.max(0, bottom)}px`);
};

const updateListOffset = (dropdown) => {
  const text = dropdown.querySelector('.js-nav-btn-text');
  const panel = dropdown.querySelector('.js-nav-dropdown-panel');

  if (!text || !panel) {
    return;
  }

  const { left } = text.getBoundingClientRect();
  panel.style.setProperty('--nav-dropdown-list-offset', `${left}px`);
};

const SELECTOR = '.js-nav-dropdown';

defineComponent({
  selector: SELECTOR,
  setup(dropdown) {
    const toggle = dropdown.querySelector('.js-nav-dropdown-toggle');
    const panel = dropdown.querySelector('.js-nav-dropdown-panel');
    const navDropdownContainer = document.querySelector('.js-nav-dropdown-container');
    const overlay = dropdown.querySelector('.js-nav-dropdown-overlay');

    const refreshLayout = () => {
      updateContainerHeight(navDropdownContainer);
      if (dropdown.classList.contains(openClass)) {
        updateListOffset(dropdown);
      }
    };

    refreshLayout();
    window.addEventListener('resize', refreshLayout);

    const closeDropdown = (dropdown) => {
      dropdown.classList.remove(openClass);
      toggle?.setAttribute('aria-expanded', 'false');
      panel?.setAttribute('aria-hidden', 'true');
      overlay?.setAttribute('aria-hidden', 'true');
      navDropdownContainer.classList.remove(containerOpenClass);
      setScrollLocked('nav-dropdown', false);
    };

    const closeAll = () => {
      document.querySelectorAll(SELECTOR).forEach((dropdown) => {
        closeDropdown(dropdown);
      });
    };

    const openDropdown = () => {
      closeAll();

      dropdown.classList.add(openClass);

      refreshLayout();

      toggle?.setAttribute('aria-expanded', 'true');
      panel?.setAttribute('aria-hidden', 'false');
      overlay?.setAttribute('aria-hidden', 'false');
      navDropdownContainer.classList.add(containerOpenClass);
      setScrollLocked('nav-dropdown', true);
    };

    toggle?.addEventListener('click', () => {
      if (dropdown.classList.contains(openClass)) {
        closeDropdown(dropdown);
        return;
      }

      openDropdown(dropdown);
    });

    overlay?.addEventListener('click', () => closeDropdown(dropdown));

    closeNavDropdowns = closeAll;

    defineEscapeClick([dropdown], openClass, () => closeDropdown(dropdown));
  },
});