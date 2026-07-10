export function initCoverageDropdown() {
  const dropdowns = document.querySelectorAll('.js-region-dropdown');

  if (!dropdowns.length) {
    return;
  }

  const openClass = 'region-dropdown--open';

  const closeDropdown = (dropdown) => {
    const toggle = dropdown.querySelector('.js-region-dropdown-toggle');
    const panel = dropdown.querySelector('.js-region-dropdown-panel');

    dropdown.classList.remove(openClass);
    toggle?.setAttribute('aria-expanded', 'false');
    panel?.setAttribute('aria-hidden', 'true');
  };

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.js-region-dropdown-toggle');

    toggle?.addEventListener('click', () => {
      const isOpen = dropdown.classList.contains(openClass);

      if (isOpen) {
        closeDropdown(dropdown);
        return;
      }

      const panel = dropdown.querySelector('.js-region-dropdown-panel');

      dropdown.classList.add(openClass);
      toggle.setAttribute('aria-expanded', 'true');
      panel?.setAttribute('aria-hidden', 'false');
    });
  });
}
