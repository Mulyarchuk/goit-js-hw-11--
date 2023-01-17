import './css/styles.css';
import { creatMarkup } from './galleryCard';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.querySelector(`#search-form`);
const gallery = document.querySelector(`.gallery`);
const loadBtn = document.querySelector(`.load-more`);

form.addEventListener(`submit`, onSubmit);
loadBtn.addEventListener(`click`, onLoadBtn);

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
loadBtn.style.display = `none`;

if (!searchQuery){
  Notiflix.Notify.failure(`Please, enter your request`);
  return;
}
try{
    const searchData = await getPicture(searchQuery, page);
    const { hits, totalHits } = searchData;
  if (hits.length > 0 ){
    const markup = hits.map(item => creatMarkup(item)).join('');
    gallery.innerHTML = markup;
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    lightbox.refresh();
  }
  else if(totalHits===0){
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
  }
  if (totalHits > 40){
    loadBtn.style.display = `block`;
  }
}
catch(error){
console.log(error);
}
// fetch(`${BASE_URL}${parameter}&q=${searchQuery}`).then(resp=> resp.json()).then(console.log);
}

async function onLoadBtn(){
  page+=1;
  loadBtn.style.display = "none";
  try{
    const response = await getPicture(searchQuery, page);
    const { hits, totalHits } = response;

    const markup = hits.map(item => creatMarkup(item)).join('');
    gallery.insertAdjacentHTML(`beforeend`, markup);

    lightbox.refresh();
    
    const baseOfPages = totalHits / (40 * page);
    console.log(baseOfPages);
    
    if (baseOfPages <= 1) { 
     console.log(baseOfPages);
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadBtn.style.display = `block`;
    }}
  catch (error){
    console.log(error);
  }
}
