const throttle = (fn, delay) => {
  let timer = null;
  let nextFn = null;

  function innerFunction(...args) {
    const handleTimerEnds = () => {
      clearInterval(timer);
      timer = null;
      if (nextFn) {
        nextFn(...args);
        nextFn = null;
      }
    };

    if (!timer) {
      timer = setInterval(handleTimerEnds, delay);
      fn(...args);
      nextFn = fn;
    }
  }

  return innerFunction;
};

function initStickyHeader() {
  const header = document.querySelector('.header');
  const stuckClass = 'header--stuck';
  const holder = document.createElement('div');
  const initialHeight = header.clientHeight;
  holder.classList.add('header-holder');
  holder.style.height = initialHeight + 'px';
  header.parentElement.insertBefore(holder, header);
  let isStuck = false;
  let prevPosition = window.pageYOffset;

  if (!header) {
    return false;
  }

  function doStuck() {
    if (isStuck) return;
    header.classList.add(stuckClass);
    isStuck = true;
  }

  function doUnstuck() {
    if (!isStuck) return;
    header.classList.remove(stuckClass);
    isStuck = false;
  }

  function handleScroll(e) {
    const currentScroll = window.pageYOffset;
    if (isStuck && currentScroll < initialHeight && currentScroll < prevPosition) {
      doUnstuck();
    } else if (!isStuck && currentScroll > 0 && currentScroll > prevPosition) {
      doStuck();
    }

    prevPosition = currentScroll;
  }

  const debouncedHandleScroll = throttle(handleScroll, 500);

  window.addEventListener('scroll', debouncedHandleScroll);
}

initStickyHeader();
