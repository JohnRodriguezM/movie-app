"use strict";

import { URLS } from "./utils/urls.mjs";

import {DOM_ELEMENTS} from "./nodes.mjs"

const { URL_TRENDING_MOVIES, URL_CATEGORY } = URLS;

const {  trendingMoviesPreviewList, categoriesPreviewList } = DOM_ELEMENTS;


//!
export const getTrendingMoviesPreview = async () => {
  try {
    let response = await fetch(URL_TRENDING_MOVIES)
    let json = await response.json();
    const data = json.results;
    /*console.log(data)*/ //! me trae la data completa

    const mapeo = data.map(movie => {
      //! en esta funcion me permito recortar la data a ciertas propiedades para no hacer muy grande el json
      return {
        adult: movie.adult,
        id: movie.id,
        title: movie.title,
        backPath: movie.backdrop_path,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        overview: movie.overview,
        releaseDate: movie.release_date
      }
    })
    const mapOverMap = mapeo.map(elMap => {
      let imageMovie = `https://image.tmdb.org/t/p/w400${elMap.backPath}`
      const movieContainer = document.createElement('div')
      movieContainer.classList.add('movie-container')

      const img = document.createElement('img')
      img.classList.add('movie-img')

      movieContainer.appendChild(img)

      img.src = imageMovie;

      trendingMoviesPreviewList.appendChild(movieContainer)

    })

    //*


  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get tendencies');*/
  }
}


export const getCategegoriesPreview = async () => {
  try {
    let response = await fetch(URL_CATEGORY)
    let json = await response.json();
    const data = json.genres;
    /*console.log(data)*/ //! me trae la data completa

    const mapeoCategories = data.map(elMap => {
      let id = `id${elMap.id}`
      const categoryContainer = document.createElement('div')
      const categoryTitle = document.createElement('h3')

      //*div
      categoryContainer.classList.add('category-container')
      //*h3
      categoryTitle.classList.add('category-title')
      categoryTitle.id = id
      //*div
      categoryContainer.appendChild(categoryTitle)
      //*h3
      categoryTitle.innerHTML = elMap.name;
      //!father container
      categoriesPreviewList.appendChild(categoryContainer)

    }
    )
    //*
  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get categories');*/
  }
}






//*funciones que se ejecutan a la carga de la website

/*window.addEventListener('DOMContentLoaded', (event) => {
  getTrendingMoviesPreview()
  getCategegoriesPreview()
})
*/


//*funciones que se ejecutan a la carga de la website

//sumas
export const getSum = (a, b) => a + b;
export const getSubtraction = (a, b) => a - b;
export const getMultiplication = (a, b) => a * b;
export const getDivision = (a, b) => a / b;
export const getModulo = (a, b) => a % b;
//restas
export const getRest = (a, b) => a - b;
export const getRest2 = (a, b) => a % b;
//multiplicaciones
export const getMult = (a, b) => a * b;
export const getMult2 = (a, b) => a / b;
//divisiones
export const getDiv = (a, b) => a / b;
export const getDiv2 = (a, b) => a % b;
//modulos
export const getMod = (a, b) => a % b;
export const getMod2 = (a, b) => a - b;
//potencias
export const getPow = (a, b) => a ** b;
export const getPow2 = (a, b) => a * b;
//raiz
export const getRoot = (a, b) => a ** (1 / b);
export const getRoot2 = (a, b) => a * b;
//logaritmos
export const getLog = (a, b) => Math.log(a) / Math.log(b);
export const getLog2 = (a, b) => a * b;
//exponenciales
export const getExp = (a, b) => Math.pow(a, b);
export const getExp2 = (a, b) => a / b;
//senos
export const getSin = (a, b) => Math.sin(a);
export const getSin2 = (a, b) => a * b;
//cosenos
export const getCos = (a, b) => Math.cos(a);
export const getCos2 = (a, b) => a / b;
//tangentes
export const getTan = (a, b) => Math.tan(a);
export const getTan2 = (a, b) => a % b;
//raices
export const getRoot3 = (a, b) => Math.sqrt(a);
export const getRoot4 = (a, b) => a / b;
//logaritmos
export const getLog3 = (a, b) => Math.log(a) / Math.log(b);
export const getLog4 = (a, b) => a * b;
//exponenciales
export const getExp3 = (a, b) => Math.pow(a, b);
export const getExp4 = (a, b) => a / b;
//senos
export const getSin3 = (a, b) => Math.sin(a);
export const getSin4 = (a, b) => a * b;
//cosenos
export const getCos3 = (a, b) => Math.cos(a);
export const getCos4 = (a, b) => a / b;
//tangentes
export const getTan3 = (a, b) => Math.tan(a);
export const getTan4 = (a, b) => a % b;
//raices
export const getRoot5 = (a, b) => Math.sqrt(a);
export const getRoot6 = (a, b) => a / b;
//logaritmos
export const getLog5 = (a, b) => Math.log(a) / Math.log(b);
export const getLog6 = (a, b) => a * b;
//exponenciales
export const getExp5 = (a, b) => Math.pow(a, b);
export const getExp6 = (a, b) => a / b;

// do a calculator
export const doCalculator = (a, b, operator) => {
      
}