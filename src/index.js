import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { createImagesElements } from './createGallery';

const input = document.querySelector('.search-form input');
const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallery');
let enterValue = '';
let page = 1;

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

form.addEventListener('submit', event => {
  event.preventDefault();
  enterValue = input.value;
  fetchMaterials().then(data => check(data));
});

function check(data) {
  if (data === { total: 0, totalHits: 0, hits: Array(0) }) {
    console.log('no data');
    return;
  } else {
    gallary.insertAdjacentHTML('beforeend', createImagesElements(data.hits));
    page += 1;
    lightbox.refresh();
  }
}

async function fetchMaterials() {
  return await axios.get(`&q=${enterValue}&page=${page}`).then(res => res.data);
}

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// try {
//   fetchMaterials().then(pictures =>
// gallary.insertAdjacentHTML(
//   'afterbegin',
//   createImagesElements(pictures.hits)
// )
//   );
// } catch (error) {
//   throw new Error(console.log(error));
// }
