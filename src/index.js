import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const q = 'cat';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=28400374-5eacf081d2efacca1adf31c1f&image_type=photo&orientation=horizontal&safesearch=true';

function fetchMaterials() {
  return axios.get(`&q=${q}`).then(response => response.data);
}

fetchMaterials()
  .then(data => console.log(data))
  .catch(error => console.log(error));
