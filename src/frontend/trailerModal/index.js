import ModalVideo from 'modal-video';
import 'modal-video/css/modal-video.min.css';

export const modalListener = (event, id, ids) => {
  //Se usa este condicional para evitar un target intercalado entre el <img> o el <a>
  if (id === ids.tagImg) {
    const link = event.target.parentNode;
    const { video_id } = link.dataset;
    openModal(video_id);
  } else {
    const link = event.target;
    const { video_id } = link.dataset;
    openModal(video_id);
  }
};

function openModal(video_id) {
  //Se crea un elemento html tipo button, este elemento no se inserta en el DOM
  const button = document.createElement('button');
  //Se le dan algunos atributos
  button.classList.add('js-modal-btn');
  button.setAttribute('data-video-id', video_id);
  new ModalVideo([button]);
  //Se fuerza el click para general la apertura
  button.click();
}
