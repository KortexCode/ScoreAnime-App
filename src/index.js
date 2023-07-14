import h from 'hyperscript';
import '../styles.css';
import { fetchPopular, fetchHighestRated, fetchTrending } from './api.js';
import CarouselItem from './CarouselItem.js';
console.log('gola papees');

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
})(document, window);
