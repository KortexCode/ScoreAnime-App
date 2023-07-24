import observer from './ImgObserver';
import '../../assets/play-icon.png';
import '../../assets/plus-icon.png';
import '../../styles.css';
/* Este es el JS el cual será usado por el Browser para funciones adicionales
e interactividad */

//Lógica para Observador de las imágenes de cada carousel
const carouselImg = document.querySelectorAll('.carousel-item__img');
carouselImg.forEach(img => {
  observer.observe(img);
});

//Lógica del Trailer-Modal: obtienen los contenedores de los caruseles.
const carouselContainer = document.querySelectorAll('.carousel__container');
const carouselContainerList = Array.from(carouselContainer);
//A cada uno le será agregado un manejador de evento
carouselContainerList.forEach(container => {
  console.log('leidos');
  container.addEventListener('click', event => {
    //Aquí están los ids de la etiquetas que se desean. Esto es usadoparaevitar magic strings
    console.log('leidos');
    const ids = {
      tagA: 'carusel-item__youtube-link',
      tagImg: 'carusel-item__play-icon-img',
    };
    //Se verifica si el elemento clickeado tiene el id del icono(<img>) oellink(<a>)
    const id = event.target.id;
    if (id === ids.tagA || id === ids.tagImg) {
      //Si se cumple se evitará la carga de la imagen y se enviará el"event"
      console.log('prevenido');
      event.preventDefault();
      import(/* webpackChunkName: "modal" */ './trailerModal')
        .then(({ modalListener }) => {
          modalListener(event, id, ids);
        })
        .catch(error => 'An error occurred while loading the component');
    }
  });
});
