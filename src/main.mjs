"use strict";

import { URLS } from "./utils/urls.mjs";

import { DOM_ELEMENTS } from "./nodes.mjs"

const { URL_TRENDING_MOVIES, URL_CATEGORY, CATEGORY } = URLS;

const { trendingMoviesPreviewList, categoriesPreviewList } = DOM_ELEMENTS;

import { navigator } from './navigation.mjs'

//!
export const getTrendingMoviesPreview = async () => {
  try {
    let response = await fetch(URL_TRENDING_MOVIES)
    let json = await response.json();
    const data = json.results;
    trendingMoviesPreviewList.innerHTML = ""
    const mapeo = data.map(movie => {
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

    categoriesPreviewList.innerHTML = ""
    const mapeoCategories = data.map(elMap => {


      let id = `id${elMap.id}`
      const categoryContainer = document.createElement('div')
      const categoryTitle = document.createElement('h3')
      categoryTitle.dataset.id = elMap.id;
      categoryTitle.dataset.name = elMap.name;
      categoryContainer.dataset.id = elMap.id;
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


      categoryContainer.addEventListener('click', (e) => {
        navigator(`#category=${elMap.id}-${elMap.name}`)
        getMovieByCategory(String(e.target.dataset.id))
        location.hash = `#category=${elMap.id}-${elMap.name}`
        console.log(String(e.target.dataset.id))
      })


    }
    )
    //*
  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get categories');*/
  }
}


export async function getMovieByCategory(id) {
  try {
    let url = `${CATEGORY}&language=es-US&include_adult=true&with_genres=${id}`

    let response = await fetch(url)
    let json = await response.json();
    console.log(json)

  } catch (error) { console.error(error) }
}


/*`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`*/

//*funciones que se ejecutan a la carga de la website

/*window.addEventListener('DOMContentLoaded', (event) => {
  getTrendingMoviesPreview()
  getCategegoriesPreview()
})
*/
