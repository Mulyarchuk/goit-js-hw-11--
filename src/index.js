import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

import { creatMarkup } from "./galleryCard";
const axios = require('axios').default;


const form = document.querySelector(`#search-form`);
const gallery = document.querySelector(`.gallery`);
const btnLoad = document.querySelector(`.load-more`);





form.addEventListener(`submit`,onSearch)
// btnLoad.addEventListener(`click`,onLoadMore);

var lightbox = new SimpleLightbox('.gallery a', 
{captionsData: `alt`, 
captionDelay: `250ms` });



// let searchQuery = ``;
// let page = 1;


//  function onSearch(evt){
//  evt.preventDefault();
//  searchQuery = evt.currentTarget.elements.searchQuery.value;
//  console.log(searchQuery);
//  const BASE_URL = `https://pixabay.com/api/`
//  const KEY = `32625337-c016256a0573a5e098b27062e`;
//  async function getImage() {
//     try {
//   const response = await axios.get(`${BASE_URL}?
//   key=${KEY}&
//   q=${searchQuery}&
//   image_type=photo&
//   orientation=horisontal&
//   safesearch=true&
//   page=${page}&
//   per_page=40`);
//         return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

// }try{
//     const markup = hits.map(item => creatMarkup(item)).join('');
//     gallery.innerHTML = markup;
// }catch(error){

// };

//  function onLoadMore(){

// }try{

// }catch(error){

//     }
function onSearch(evt){
    evt.prevent.default();
    const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim();
    console.log(searchQuery);
    const BASE_URL = 'https://pixabay.com/api/';
const KEY =  '32625337-c016256a0573a5e098b27062e';
const parameter = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

async function getPictures(searchQuery, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}${parameter}&q=${searchQuery}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
getPictures()
const markup = hits.map(item => creatMarkup(item)).join('');
      gallery.innerHTML = markup;
}
