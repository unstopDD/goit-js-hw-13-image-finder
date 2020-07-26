import refs from './js/refs';
import apiService from './js/apiService';
import './styles.scss';
import updateGalleryMarkup from './js/update-gallery-markup';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.LoadMoreBtn.addEventListener('click', fetchArticles);
refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', event => {
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}">`);
  instance.show();
});

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  refs.gallery.innerHTML = '';

  apiService.resetPage();

  fetchArticles();
  form.reset();
}

function fetchArticles() {
  refs.LoadMoreBtn.classList.add('is-hidden');
  refs.spinner.classList.remove('is-hidden');

  apiService
    .fetchGallery()
    .then(pictures => {
      updateGalleryMarkup(pictures);
      refs.LoadMoreBtn.classList.remove('is-hidden');
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
      if (pictures.length < 12) {
        refs.LoadMoreBtn.classList.add('is-hidden');
      }
    })
    .finally(() => {
      refs.spinner.classList.add('is-hidden');
    });
}
