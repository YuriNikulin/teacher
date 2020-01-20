import { inViewport } from './viewport';

const images = document.querySelectorAll('[data-src]');

const setSrc = element => {
  if (!element || !element.getAttribute('data-src')) return;
  element.setAttribute('src', element.getAttribute('data-src'));
  element.setAttribute('data-src', '');
  element.addEventListener('load', () => {
    element.classList.add('lazy-img--in');
  });
};

[].forEach.call(images, image => {
  image.classList.add('lazy-img');
  inViewport({ element: image, onEnter: setSrc });
});
