const h = require('hyperscript');
const formatDistance = require('date-fns/formatDistance');
const parseIso = require('date-fns/parseISO');

//Se obtiene la fecha relativa según la fecha de lanzamiento del anime
const relativeDate = dateStr => formatDistance(parseIso(dateStr), new Date());

const EMPTYIMG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';

//Función crea la etique <source>
const sourceCreator = imageUrlSmall => {
  const img = h('source', {
    srcset: EMPTYIMG,
    media: '(max-width: 600px)',
    'data-src': imageUrlSmall,
  });
  /* observer.observe(img); */ //Observador de la etiqueda
  return img;
};

//Función creadora de etiqueta <img>
const imgCreator = imageUrl => {
  const img = h('img.carousel-item__img', {
    src: EMPTYIMG,
    alt: 'anime image',
    'data-src': imageUrl,
  });
  /* observer.observe(img); */
  return img;
};

//Función que construye un elementos html y sus hijos para establecer
//datos entregados por el objeto que contiene las propiedades del anime
const Controls = ({ slug, youtubeVideoId }) =>
  h(
    'div.controls',
    h(
      'a.carusel-item__link',
      {
        href: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
        'data-video_id': youtubeVideoId,
        title: 'Watch trailer',
        target: '_blank',
        rel: 'noreferrer',
        id: 'carusel-item__youtube-link',
      },
      h('img.carusel-item__icon', {
        id: 'carusel-item__play-icon-img',
        src: /* playIco */ 'assets/play-icon.png',
        alt: 'Play',
      }),
    ),
    h(
      'a.carusel-item__link',
      {
        href: `https://kitsu.io/explore/anime/${slug}`,
        title: 'See more',
        target: '_blank',
        rel: 'noreferrer',
      },
      h('img.carusel-item__icon', {
        src: /* plusIco */ 'assets/plus-icon.png',
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

module.exports = CarouselItem;
