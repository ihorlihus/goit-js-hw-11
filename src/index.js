import 'modern-normalize';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { createImagesElements } from './createGallery';

const input = document.querySelector('.search-form input');
const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallery');
let elementFofObserver = gallary.lastElementChild;
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
  if (data === undefined) {
    console.log('no data');
    return;
  } else {
    gallary.insertAdjacentHTML('beforeend', createImagesElements(data.hits));
    page += 1;
    observer.observe(document.querySelector('.gallery').lastElementChild);
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

const options = {
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    console.log('observ start');
    if (entry.isIntersecting) {
      console.log('down');
      fetchMaterials().then(data => check(data)); // URL
    }
  });
}, options);

// function observerCheckCont() {
//   // console.log(gallary.contains(document.querySelector('.photo-card')));
//   if (gallary.contains(document.querySelector('.photo-card')) === false) {
//     console.log('no content');
//     return;
//   } else {
//     ;
//   }
// }
// observerCheckCont();

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
