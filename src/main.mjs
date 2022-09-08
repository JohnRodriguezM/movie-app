"use strict";

//@ts-check

import { URLS, APIKEY, BASE_URL } from "./utils/urls.mjs";

import { DOM_ELEMENTS } from "./nodes.mjs"

import { prueba1 } from "./mobile.mjs";

console.log(prueba1);

const { URL_TRENDING_MOVIES, URL_CATEGORY, CATEGORY, BASE_IMG } = URLS;

const {
  trendingMoviesPreviewList,
  categoriesPreviewList,
  genericSection,
  Title,
  searchFormInput,
  headerSection,
  movieDetailTitle,
  movieDetailDescription,
  spanValue,
  categoriesPreviewSection,
  categoriesList,
  relatedMovies,
} = DOM_ELEMENTS;

import { navigator } from './navigation.mjs'

import { toggleOpacity } from './utils/helpers.mjs'


export const getTrendingMoviesPreview = async () => {
  try {
    const response = await fetch(URL_TRENDING_MOVIES)
    const { results } = await response.json();



    const mapeo = results.map(movie => {
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


    trendingMoviesPreviewList.innerHTML = ""


    const mapOverMap = mapeo.map(elMap => {

      /*let imageMovie = `${BASE_IMG}${elMap.backPath}`*/

      const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container">
          <img class="movie-img" src="${BASE_IMG}${elMap.backPath}">
        </div>
      `)

      const containerHoverDetails = document.createRange().createContextualFragment(/*html*/`
      <div class="card-hover">
        <p>${elMap.title}</p>
        <div class = "close-card">❌</div>
        <p class= "calificacion-card" > ⭐ ${elMap.voteAverage.toFixed(1)}</p>
      </div>
      `)

      const card = containerHoverDetails.querySelector('.card-hover')
      const closeTag = containerHoverDetails.querySelector('.close-card')
      const containerMovie = movieContainer.querySelector('.movie-container')
      const img = movieContainer.querySelector('.movie-img')

      img.addEventListener('click', e => {
        // console.log(e.target)
        console.log(e)
        card.style.opacity = 1
        card.style.top = '50%'
        toggleOpacity(.7, headerSection, categoriesPreviewSection)
        // toggleOpacity(.7, headerSection, categoriesPreviewSection, containerMovie)
        toggleOpacity(.97, trendingMoviesPreviewList)
      })

      closeTag.addEventListener('click', e => {
        card.style.opacity = 0
        card.style.top = '-40%'
        toggleOpacity(1, headerSection, categoriesPreviewSection, trendingMoviesPreviewList, containerMovie)
      })

      trendingMoviesPreviewList.append(movieContainer, containerHoverDetails)

    })
  } catch (error) { console.error(error) }
}


export const getCategegoriesPreview = async () => {
  try {
    const response = await fetch(URL_CATEGORY)
    const { genres } = await response.json();

    categoriesPreviewList.innerHTML = ""

    const mapeoCategories = genres.map(elMap => {

      let id = `id${elMap.id}`

      const categoryContainer = document.createRange().createContextualFragment(/*html*/`
        <div class="category-container" data-id = "${elMap.id}">
          <div class="category-title" id="${id}" data-id = "${elMap.id}">
            ${elMap.name}
          </div>
        </div>
      `)

      const categoryTitle = categoryContainer.querySelector('.category-title')
      const category = categoryContainer.querySelector('.category-container')

      // console.log(category)

      categoryTitle.addEventListener('click', (e) => {
        /*navigator(`#category=${elMap.id}-${elMap.name}`)*/
        //!pendiente pasar data a navigator pero sin necesidad de un doble click
        location.hash = `#category=` /*${elMap.id}-${elMap.name}*/
        getMovieByCategory(String(e.target.dataset.id), elMap.name)

        prueba1(categoriesPreviewSection);

      })

      categoriesPreviewList.appendChild(categoryContainer)
    })
  } catch (error) { console.error(error) }
}


//* se obtienen los trends de la tv
export const getCategegoriesPageTwo = async () => {
  let urlCategoryPageTwo = `${BASE_URL}trending/tv/week?api_key=${APIKEY}`
  try {
    const response = await fetch(urlCategoryPageTwo)
    const { results } = await response.json();

    genericSection.innerHTML = ""

    Title.innerHTML = `Trends on tv`;
    const mapeo = results.map(movie => {
      return {
        adult: movie.adult,
        id: movie.id,
        title: movie.name,
        backPath: movie.backdrop_path,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        overview: movie.overview,
        releaseDate: movie.release_date
      }
    })

    const mapOverMap = mapeo.map(elMap => {
      const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container">
          <img class="movie-img" src="${BASE_IMG}${elMap.backPath}">
          <p>${elMap.title}</p>
        </div>
      `)

      const mainMovieContainer = movieContainer.querySelector('.movie-container')

      genericSection.append(mainMovieContainer)
    })
  } catch (error) { console.error(error) }
}

export async function getMovieByCategory(id, name) {
  try {
    let urlMovieByCategory = `${CATEGORY}&language=es-US&include_adult=true&with_genres=${id}`

    let response = await fetch(urlMovieByCategory)
    let { results } = await response.json();

    genericSection.innerHTML = ""
    Title.innerHTML = `${name}`;

    const filterElementsWithoutImg = results.filter(el => el.backdrop_path !== null)

    filterElementsWithoutImg.map(el => {

      const divContent = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container" id = "${el.id}">
          <img class="movie-img" src="${BASE_IMG}${el.backdrop_path}" alt = "${el.id}" />
          <p id = "${el.id}">${el.title}</p>
        </div>
      `)

      const mainMovieContainer = divContent.querySelector('.movie-container')

      mainMovieContainer.addEventListener('click', e => {
        let url = `${BASE_URL}movie/${e.target.alt ?? e.target.id}?api_key=${APIKEY}&language=en-US`
        getDataDetails(url)
        getSimilarMovies(`${BASE_URL}movie/${e.target.alt ?? e.target.id}/similar?api_key=${APIKEY}&language=en-US&page=1`)
        location.hash = "#movie="
      })

      genericSection.appendChild(divContent)

    })
  } catch (error) { console.error(error) }
}

export const getMovie = async () => {
  let urlGetMoviesSearch = `${BASE_URL}search/movie?api_key=${APIKEY}&query=${searchFormInput.value}&page=1&include_adult=true`
  let response = await fetch(urlGetMoviesSearch)
  let { results } = await response.json()

  genericSection.innerHTML = ""

  Title.innerHTML = `Results for ${searchFormInput.value}`;
  const filterElementsWithoutImg = results.filter(el => el.backdrop_path !== null)

  filterElementsWithoutImg.map(el => {

    const divContent = document.createRange().createContextualFragment(/*html*/`
      <div class="movie-container" id = "${el.id}">
        <img class="movie-img" src="${BASE_IMG}${el.backdrop_path}" alt = "${el.id}" />
        <p id = "${el.id}">${el.title}</p>
      </div>
    `)

    const mainMovieContainer = divContent.querySelector('.movie-container')

    mainMovieContainer.addEventListener('click', (e) => {
      //*se trae la información de la pelicula usando el id de la pelicula
      getDataDetails(`${BASE_URL}movie/${e.target.alt ?? e.target.id}?api_key=${APIKEY}&language=en-US`)
      getSimilarMovies(`${BASE_URL}movie/${e.target.alt ?? e.target.id}/similar?api_key=${APIKEY}&language=en-US&page=1`)
      location.hash = "#movie="
    })

    genericSection.append(divContent)

  })

}

export const getDataDetails = async URL => {
  try {
    let response = await fetch(URL)
    let { genres, poster_path, backdrop_path, title, overview, vote_average } = await response.json()

    categoriesList.innerHTML = ""

    headerSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${poster_path || backdrop_path})`;
    movieDetailTitle.innerHTML = title;
    movieDetailDescription.innerHTML = overview;
    spanValue.innerHTML = vote_average.toFixed(1)


    //*muestreo de generos que coinciden con la pelicula que se está mostrando
    //* se limpia el html 

    genres.map(el => {

      const divContent = document.createRange().createContextualFragment(/*html*/`
        <div class="category-container">
          <h3 class = "category-title" id = "id${el.id}">${el.name}</h3>
        </div>
      `)

      categoriesList.appendChild(divContent)

    })


  } catch (err) { console.log(err) }
}


const getSimilarMovies = async (URLL) => {
  try {
    let response = await fetch(URLL)
    let { results } = await response.json();

    const arraySliced = results.slice(12)

    relatedMovies.innerHTML = ""
    arraySliced.map(el => {

      const divContent = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container">
          <img class="movie-img" src="${BASE_IMG}${el.backdrop_path}" alt = "${el.id}">
        </div>
      `)

      relatedMovies.append(divContent)
    })
  } catch (err) {
    console.log(err)
  }
}



