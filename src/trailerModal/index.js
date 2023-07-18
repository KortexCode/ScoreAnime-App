export const modalListener = (event, id, ids) => {
  if (id === ids.tagImg) {
    const link = event.target.parentNode;
    console.log('recibido', link);
    const { video_id } = link.dataset;

    console.log('link', video_id);
  } else {
    const link = event.target;
    console.log('otro');
  }
};
