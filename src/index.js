import './css/styles.css';
import { creatMarkup } from './galleryCard';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.querySelector(`#search-form`);
const gallery = document.querySelector(`.gallery`);
const loadBtn = document.querySelector(`.load-more`)

form.addEventListener(`submit`, onSubmit);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

 let searchQuery = ``;
 const BASE_URL = `https://pixabay.com/api/`
 const KEY = `32776418-aa374a2a10c573564f087ae5a`;
 const parameter = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
let page = 1;

async function getPicture() {
        try {
          const response = await axios.get(
            `${BASE_URL}${parameter}&q=${searchQuery}&page=${page}`
          );
          return response.data;
        } catch (error) {
          throw new Error(error);
        }
      }
console.log(getPicture());


async function onSubmit(e){
e.preventDefault();
searchQuery = e.currentTarget.elements.searchQuery.value;
console.log(searchQuery);
gallery.innerHTML = ``;
page = 1;
try{
    const searchData = await getPicture(searchQuery, page);
    const { hits } = searchData;
    const markup = hits.map(item => creatMarkup(item)).join('');
    gallery.innerHTML = markup;
    console.log(hits);
    
}
catch(error){
console.log(error);
}
// fetch(`${BASE_URL}${parameter}&q=${searchQuery}`).then(resp=> resp.json()).then(console.log);
}
