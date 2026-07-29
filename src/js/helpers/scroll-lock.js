const lockSources = new Set();
const lockedClass = 'scroll-locked';

let scrollY = 0;

const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

const applyScrollLock = () => {
  const shouldLock = lockSources.size > 0;
  const isLocked = document.body.classList.contains(lockedClass);

  if (shouldLock && !isLocked) {
    scrollY = window.scrollY;

    const scrollbarWidth = getScrollbarWidth();

    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add(lockedClass);
    return;
  }

  if (!shouldLock && isLocked) {
    document.body.classList.remove(lockedClass);
    document.body.style.top = '';
    document.documentElement.style.removeProperty('--scrollbar-width');
    window.scrollTo(0, scrollY);
  }
};

export function setScrollLocked(source, isLocked) {
  if (isLocked) {
    lockSources.add(source);
  } else {
    lockSources.delete(source);
  }

  applyScrollLock();
}
