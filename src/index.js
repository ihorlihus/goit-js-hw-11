import 'modern-normalize';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { createImagesElements } from './createGallery';

const input = document.querySelector('.search-form input');
const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallery');
const per_page = 40;
let enterValue = '';
let page = 1;

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&safesearch=true&';

form.addEventListener('submit', event => {
  event.preventDefault();
  enterValue = input.value;
  gallary.innerHTML = '';
  page = 1;
  fetchMaterials().then(data => check(data));
});

function check(data) {
  if (data.totalHits === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (Number(page) * per_page >= data.totalHits) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    observer.disconnect();
    return;
  } else {
    if (Number(page) === 1) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    gallary.insertAdjacentHTML('beforeend', createImagesElements(data.hits));
    page += 1;
    observer.observe(document.querySelector('.gallery').lastElementChild);
    lightbox.refresh();
  }
}

async function fetchMaterials() {
  return await axios
    .get(`&q=${enterValue}&page=${page}&per_page=${per_page}`)
    .then(res => res.data);
}

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchMaterials().then(data => check(data));
      }
    });
  },
  {
    rootMargin: '200px',
    threshold: 1.0,
  }
);
