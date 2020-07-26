import galleryTpl from '../templates/gallerry.hbs';
import refs from '../js/refs';
import success from '../js/success-notify';
import error from './error-notify';

function updateGalleryMarkup(gallery) {
  if (gallery.length >= 1) {
    const galleryList = galleryTpl(gallery);
    refs.gallery.insertAdjacentHTML('beforeend', galleryList);
    success();
  }
  if (gallery.length <= 0) {
    error();
  }
}

export default updateGalleryMarkup;
