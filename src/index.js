import h from 'hyperscript';
import { fetchPopular, fetchHighestRated, fetchTrending } from './api.js';
import CarouselItem from './CarouselItem.js';
import '../styles.css';

const SectionTitle = title => h('h3.carousel-title', title);

const Carousel = ({ itemsList = [] }) =>
  h(
    'section.carousel',
    h(
      'div.carousel__container',
      itemsList.map(
        ({
          attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
        }) =>
          CarouselItem({
            imageUrl: posterImage.medium,
            imageUrlSmall: posterImage.small,
            title: titles.en,
            subtitle: titles.ja_jp,
            slug,
            youtubeVideoId,
            startDate,
          }),
      ),
    ),
  );

(async function (document) {
  const mountReference = document.querySelector('.main').lastElementChild;

  if (!mountReference) {
    return 0;
  }

  const trending = await fetchTrending();
  const popular = await fetchPopular();
  const highestRated = await fetchHighestRated();

  mountReference
    .insertAdjacentElement('afterend', SectionTitle('Trending Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: trending,
      }),
    )
    .insertAdjacentElement('afterend', SectionTitle('Highest Rated Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: highestRated,
      }),
    )
    .insertAdjacentElement('afterend', SectionTitle('Most Popular Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: popular,
      }),
    );

  //Agrega eventos al icono de botón de ver trailer en cada carusel-item
  eventHandlerPlayIcon();
})(document, window);

function eventHandlerPlayIcon() {
  //Una vez creados los elemento por hyperscript ahora podemos seleccionarlos
  //Se obtienen los contenedores de los caruseles
  const carouselContainer = document.querySelectorAll('.carousel__container');
  const carouselContainerList = Array.from(carouselContainer);
  //A cada uno le será agregado un manejador de evento
  carouselContainerList.forEach(container => {
    container.addEventListener('click', event => {
      //Aquí están los ids de la etiquetas que se desean. Esto es usado para evitar magic strings
      const ids = {
        tagA: 'carusel-item__youtube-link',
        tagImg: 'carusel-item__play-icon-img',
      };
      //Se verifica si el elemento clickeado tiene el id del icono(<img>) o el link(<a>)
      const id = event.target.id;
      if (id === ids.tagA || id === ids.tagImg) {
        //Si se cumple se evitará la carga de la imagen y se enviará el "event"
        event.preventDefault();
        import(/* webpackChunkName: "modal" */ './trailerModal')
          .then(({ modalListener }) => {
            modalListener(event, id, ids);
          })
          .catch(error => 'An error occurred while loading the component');
      }
    });
  });
}
