const lockSources = new Set();
const lockedClass = 'scroll-locked';

const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

const applyScrollLock = () => {
  const shouldLock = lockSources.size > 0;

  if (shouldLock) {
    const scrollbarWidth = getScrollbarWidth();

    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.body.classList.add(lockedClass);
    return;
  }

  document.body.classList.remove(lockedClass);
  document.documentElement.style.removeProperty('--scrollbar-width');
};

export function setScrollLocked(source, isLocked) {
  if (isLocked) {
    lockSources.add(source);
  } else {
    lockSources.delete(source);
  }

  applyScrollLock();
}
