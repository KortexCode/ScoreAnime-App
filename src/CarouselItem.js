import h from 'hyperscript';
import moment from 'moment';

//Esta función da formato a la fecha a la propiedad startDate del objeto
//que trae todas las propiedades de cada anime
const relativeDate = dateStr => moment(dateStr, 'YYYY-MM-DD').fromNow();

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
      h('img', {
        src: 'assets/play-icon.png',
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
      h('img', {
        src: 'assets/plus-icon.png',
        alt: 'More info',
      }),
    ),
  );

//Función constructora de cada item de anime con las propiedades.
const CarouselItem = ({
  imageUrl,
  title,
  subtitle,
  slug,
  youtubeVideoId,
  startDate,
}) =>
  h(
    'div.carousel-item',
    h('img', { src: imageUrl, alt: '' }),
    h(
      'div',
      Controls({ slug, youtubeVideoId }),
      h('p', title),
      h('p', subtitle),
      h('p', `Released: ${relativeDate(startDate)}`),
    ),
  );

export default CarouselItem;
