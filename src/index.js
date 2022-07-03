import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const input = document.querySelector('.search-form input');
const form = document.querySelector('.search-form');
const gallary = document.querySelector('.gallery');
let enterValue = '';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

form.addEventListener('submit', event => {
  event.preventDefault();
  enterValue = input.value;
  try {
    fetchMaterials().then(pictures =>
      gallary.insertAdjacentHTML(
        'afterbegin',
        createImagesElements(pictures.hits)
      )
    );
  } catch (error) {
    throw new Error(console.log(error));
  }
});

function fetchMaterials() {
  return axios.get(`&q=${enterValue}`).then(res => res.data);
}

function createImagesElements(list) {
  return list
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
  </div>`;
      }
    )
    .join('');
}
