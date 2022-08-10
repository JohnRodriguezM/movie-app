//* uso de axios, por ahora voy a implementar un fecth directo, sin embargo el manejar la libreria de axios termina siendo extremadamente útil


//configuration object to use axios


//! importar axios se hace innecesario y problematico
/*import axios from 'axios';*/
import { BASE_URL, API_KEY } from '../utils/urls.mjs'


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
})



//* axios nos devuelve el objeto de una vez seteado en json

const getTrendingMoviesPreviewAxios = async () => {
  try {
    //! en vez de fetch llamamos al objeto api de axios.create
    let { data: { results } } = await api('trending/movie/day')
    //* estoy sacando de una vez data, de lo que me traiga el objeto response, que de por si ya viene seteado a json.parse
    //? se trae de una vez el array de results del objeto data (results)
    console.log(results);

    //* el manejo del DOM se realizará luego cuando el proyecto entero se refactorice a axios, por ahora solo se maneja como prueba

  } catch (error) { console.error(error) }
}

const getCategegoriesPreviewAxios = async () => {
  try {
    const { data: { genres } } = await api('genre/movie/list')
    console.log(genres);
  } catch (error) { console.error(error) }
}



/*
window.addEventListener('DOMContentLoaded', (e) => {
  getTrendingMoviesPreviewAxios()
  getCategegoriesPreviewAxios()
  console.log(api);
})


*/