export function defineEscapeClick(elements, openClass, callback) {
  document.addEventListener('keydown', (event) => {
    const someIsOpen = [...elements].some((dropdown) => dropdown.classList.contains(openClass));

    if (event.key === 'Escape' && someIsOpen) {
      callback();
    }
  });
}