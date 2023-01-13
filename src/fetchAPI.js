import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`
const KEY = `32776418-aa374a2a10c573564f087ae5a`;
const parameter = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

// export async function getPicture(searchQuery, page) {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}${params}&q=${searchQuery}&page=${page}`
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// fetch(`${BASE_URL}${parameter}&q=${searchQuery}`).then(resp=>resp(json)).then(console.log(object));
  