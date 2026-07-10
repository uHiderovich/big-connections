import { setScrollLocked } from '../../../js/modules/scroll-lock';

let closeNavDropdowns = () => {};

export { closeNavDropdowns };

const openClass = 'nav-dropdown--open';
const overlayOpenClass = 'header__nav-overlay--open';
const headerNavOpenClass = 'header--nav-open';

const updateHeaderHeight = (header) => {
  header.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
};

const updateListOffset = (dropdown) => {
  const text = dropdown.querySelector('.js-nav-btn-text');
  const panel = dropdown.querySelector('.js-nav-dropdown-panel');

  if (!text || !panel) {
    return;
  }

  panel.style.setProperty(
    '--nav-dropdown-list-offset',
    `${text.getBoundingClientRect().left}px`,
  );
};

export function init() {
  const header = document.querySelector('.js-header');

  if (!header) {
    return;
  }

  const overlay = header.querySelector('.js-nav-overlay');
  const dropdowns = header.querySelectorAll('.js-nav-dropdown');

  if (!dropdowns.length) {
    return;
  }

  const refreshLayout = () => {
    updateHeaderHeight(header);
    dropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains(openClass)) {
        updateListOffset(dropdown);
      }
    });
  };

  refreshLayout();
  window.addEventListener('resize', refreshLayout);

  const closeAll = () => {
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.js-nav-dropdown-toggle');
      const panel = dropdown.querySelector('.js-nav-dropdown-panel');

      dropdown.classList.remove(openClass);
      toggle?.setAttribute('aria-expanded', 'false');
      panel?.setAttribute('aria-hidden', 'true');
    });

    overlay?.classList.remove(overlayOpenClass);
    overlay?.setAttribute('aria-hidden', 'true');
    header.classList.remove(headerNavOpenClass);
    setScrollLocked('nav-dropdown', false);
  };

  const openDropdown = (dropdown) => {
    closeAll();

    const toggle = dropdown.querySelector('.js-nav-dropdown-toggle');
    const panel = dropdown.querySelector('.js-nav-dropdown-panel');

    updateListOffset(dropdown);
    dropdown.classList.add(openClass);
    toggle?.setAttribute('aria-expanded', 'true');
    panel?.setAttribute('aria-hidden', 'false');
    overlay?.classList.add(overlayOpenClass);
    overlay?.setAttribute('aria-hidden', 'false');
    header.classList.add(headerNavOpenClass);
    setScrollLocked('nav-dropdown', true);
  };

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.js-nav-dropdown-toggle');

    toggle?.addEventListener('click', () => {
      if (dropdown.classList.contains(openClass)) {
        closeAll();
        return;
      }

      openDropdown(dropdown);
    });
  });

  overlay?.addEventListener('click', closeAll);

  closeNavDropdowns = closeAll;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAll();
    }
  });
}
