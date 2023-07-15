const callback = entries => {
  entries
    .filter(entry => entry.isIntersecting)
    .forEach(entryImg => {
      const img = entryImg.target;
      const { src } = img.dataset;
      if (img.getAttribute('srcset')) {
        img.setAttribute('srcset', src);
      } else {
        img.setAttribute('src', src);
      }

      observer.unobserve(img);
    });
};

export const observer = new IntersectionObserver(callback);
