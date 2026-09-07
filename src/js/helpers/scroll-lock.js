const lockSources = new Set();
const lockedClass = 'scroll-locked';
const fixedClass = 'scroll-locked--fixed';

let scrollY = 0;

const isTouchDevice = () => 'ontouchstart' in window;

const applyScrollLock = () => {
  const shouldLock = lockSources.size > 0;
  const isLocked = document.documentElement.classList.contains(lockedClass);

  if (shouldLock && !isLocked) {
    document.documentElement.classList.add(lockedClass);

    if (isTouchDevice()) {
      scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = `${document.documentElement.clientWidth}px`;
      document.body.classList.add(fixedClass);
    }

    return;
  }

  if (!shouldLock && isLocked) {
    document.documentElement.classList.remove(lockedClass);

    if (document.body.classList.contains(fixedClass)) {
      document.body.classList.remove(fixedClass);
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }
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
