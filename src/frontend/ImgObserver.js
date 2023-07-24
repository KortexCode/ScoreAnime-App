const callback = entries => {
  entries
    .filter(entry => entry.isIntersecting)
    .forEach(entryImg => {
      const img = entryImg.target;
      const { src } = img.dataset; // Se extrae la url del data-set

      //Se verifica si es una etiqueta <source> o <img>
      if (img.getAttribute('srcset')) {
        img.setAttribute('srcset', src);
      } else {
        img.setAttribute('src', src);
      }
      observer.unobserve(img);
    });
};

//Se crea un observador sin parámetro de "options"
const observer = new IntersectionObserver(callback);

export default observer;
