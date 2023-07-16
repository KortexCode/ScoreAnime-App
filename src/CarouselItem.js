import h from 'hyperscript';
import moment from 'moment';
import playIco from '../assets/play-icon.png';
import plusIco from '../assets/plus-icon.png';
import { observer } from './ImgObserver';
//Esta función da formato a la fecha a la propiedad startDate del objeto
//que trae todas las propiedades de cada anime
const relativeDate = dateStr => moment(dateStr, 'YYYY-MM-DD').fromNow();

//Función crea la etique <source>
const sourceCreator = imageUrlSmall => {
  const img = h('source', {
    srcset:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
    media: '(max-width: 600px)',
    'data-src': imageUrlSmall,
  });
  observer.observe(img); //Observador de la etiqueda
  return img;
};

//Función creadora de etiqueta <img>
const imgCreator = imageUrl => {
  const img = h('img.carousel-item__img', {
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
    alt: 'anime image',
    'data-src': imageUrl,
  });
  observer.observe(img);
  return img;
};

//Función que construye un elementos html y sus hijos para establecer
//datos entregados por el objeto que contiene las propiedades del anime
const Controls = ({ slug, youtubeVideoId }) =>
  h(
    'div',
    h(
      'a',
      {
        href: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
        title: 'Watch trailer',
        target: '_blank',
        rel: 'noreferrer',
      },
      h('img.carusel-item__icon', {
        src: playIco,
        alt: 'Play',
      }),
    ),
    h(
      'a',
      {
        href: `https://kitsu.io/explore/anime/${slug}`,
        title: 'See more',
        target: '_blank',
        rel: 'noreferrer',
      },
      h('img.carusel-item__icon', {
        src: plusIco,
        alt: 'More info',
      }),
    ),
  );

//Función constructora de cada item de anime con las propiedades.
const CarouselItem = ({
  imageUrl,
  imageUrlSmall,
  title,
  subtitle,
  slug,
  youtubeVideoId,
  startDate,
}) =>
  h(
    'div.carousel-item',
    h('picture', sourceCreator(imageUrlSmall), imgCreator(imageUrl)),
    h(
      'div.carousel-item__info',
      Controls({ slug, youtubeVideoId }),
      h('p.carousel-item__title', title),
      h('p.carousel-item__subtitle', subtitle),
      h('p.carousel-item__date', `Released: ${relativeDate(startDate)}`),
    ),
  );

export default CarouselItem;
