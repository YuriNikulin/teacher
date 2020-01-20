export const inViewport = config => {
  const defaultOptions = {
    rootMargin: '20px',
  };

  const options = { ...defaultOptions, ...config.options };

  const handler = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        config.onEnter && config.onEnter(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handler, options);
  observer.observe(config.element);
};
