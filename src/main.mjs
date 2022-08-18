"use strict";

//@ts-check

import { URLS } from "./utils/urls.mjs";

import { DOM_ELEMENTS } from "./nodes.mjs"

const { URL_TRENDING_MOVIES, URL_CATEGORY, CATEGORY,BASE_IMG } = URLS;

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
  imageMovies,
} = DOM_ELEMENTS;

import { navigator } from './navigation.mjs'

import { toggleOpacity } from './utils/helpers.mjs'


export const getTrendingMoviesPreview = async () => {
  try {
    const response = await fetch(URL_TRENDING_MOVIES)
    const { results } = await response.json();

    trendingMoviesPreviewList.innerHTML = ""

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

    const mapOverMap = mapeo.map(elMap => {

      let imageMovie = `${BASE_IMG}${elMap.backPath}`

      const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container">
          <img class="movie-img" src="${imageMovie}">
        </div>
      `)

      const containerHoverDetails = document.createRange().createContextualFragment(/*html*/`
      <div class="card-hover">
        <p>${elMap.title}</p>
        <p> ⭐ ${elMap.voteAverage}</p>
      </div>
      `)

      const card = containerHoverDetails.querySelector('.card-hover')
      const containerMovie = movieContainer.querySelector('.movie-container')
      const img = movieContainer.querySelector('.movie-img')


      trendingMoviesPreviewList.append(movieContainer, containerHoverDetails)


      img.addEventListener('mouseover', (e) => {
        console.log(e.target)
        card.style.opacity = 1
        toggleOpacity(.7, headerSection, categoriesPreviewSection, trendingMoviesPreviewList, containerMovie)

      })

      img.addEventListener('mouseout', (e) => {
        card.style.opacity = 0
        toggleOpacity(1, headerSection, categoriesPreviewSection, trendingMoviesPreviewList, containerMovie)
      })


    })
  } catch (error) { console.error(error) }
}


export const getCategegoriesPreview = async () => {
  try {
    let response = await fetch(URL_CATEGORY)
    let { genres } = await response.json();

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

      categoriesPreviewList.appendChild(categoryContainer)

      categoryTitle.addEventListener('click', (e) => {
        navigator(`#category=${elMap.id}-${elMap.name}`)
        getMovieByCategory(String(e.target.dataset.id), elMap.name)
        location.hash = `#category=${elMap.id}-${elMap.name}`
      })
    })
  } catch (error) { console.error(error) }
}


//* se obtienen los trends de la tv
export const getCategegoriesPageTwo = async () => {

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=8250c76f81ee5b7089c23a813705401b")
    const { results } = await response.json();

    genericSection.innerHTML = ""
    Title.innerHTML = `Trends part two`;
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
      console.log(elMap)
      let imageMovie = `https://image.tmdb.org/t/p/w300${elMap.backPath}`
      const movieContainer = document.createElement('div')
      movieContainer.classList.add('movie-container')

      const img = document.createElement('img')
      img.classList.add('movie-img')
      let p = document.createElement('p')
      p.innerHTML = elMap.title

      movieContainer.append(img, p)

      img.src = imageMovie;

      genericSection.append(movieContainer)
    })


  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get categories');*/
  }
}





export async function getMovieByCategory(id, name) {
  Title.innerHTML = `${name}`;
  try {
    let url = `${CATEGORY}&language=es-US&include_adult=true&with_genres=${id}`

    let response = await fetch(url)
    let { results } = await response.json();
    console.log(url)
    console.log(results)

    genericSection.innerHTML = ""

    const elFilter = results.filter(el => el.backdrop_path !== null)
    //*se filtran los elementos que si tienen imagen, los que no tienen, pa fuera
    console.log(elFilter);


    elFilter.map(el => {

      let divContent = document.createElement('div')
      divContent.classList.add('movie-container')
      let p = document.createElement('p')
      p.innerHTML = el.title
      let img = document.createElement('img')
      img.classList.add('movie-img')
      img.src = `https://image.tmdb.org/t/p/w300/${el.backdrop_path}`
      img.alt = el.id

      divContent.setAttribute('id', el.id)
      p.setAttribute('id', el.id)

      divContent.append(img, p)


      divContent.addEventListener('click', function (e) {
        getDataDetails(`https://api.themoviedb.org/3/movie/${e.target.alt || e.target.id}?api_key=8250c76f81ee5b7089c23a813705401b&language=en-US`)
        getSimilarMovies(`https://api.themoviedb.org/3/movie/${e.target.alt || e.target.id}/similar?api_key=8250c76f81ee5b7089c23a813705401b&language=en-US&page=1`)
        location.hash = "#movie="
      })

      img.addEventListener('click', e => {

      })

      genericSection.appendChild(divContent)

    })
  } catch (error) { console.error(error) }
}





export const getMovie = async () => {

  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8250c76f81ee5b7089c23a813705401b&query=${searchFormInput.value}&page=1&include_adult=false`)
  let { results } = await response.json()

  genericSection.innerHTML = ""


  const elFilter = results.filter(el => el.backdrop_path !== null)
  //*se filtran los elementos que si tienen imagen, los que no tienen, pa fuera
  console.log(elFilter);



  const presentacion = document.createElement('h3')
  presentacion.innerHTML = "coincidencias"

  elFilter.map(el => {

    /*console.log(el)*/
    let divContent = document.createElement('div')
    divContent.classList.add('movie-container')
    let p = document.createElement('p')
    p.innerHTML = el.title
    let img = document.createElement('img')
    img.classList.add('movie-img')
    img.src = `https://image.tmdb.org/t/p/w300/${el.backdrop_path}`
    img.alt = el.id

    divContent.setAttribute('id', el.id)
    p.setAttribute('id', el.id)

    divContent.append(img, p)

    divContent.addEventListener('click', function (e) {
      //*se trae la información de la pelicula usando 
      getDataDetails(`https://api.themoviedb.org/3/movie/${e.target.alt ?? e.target.id}?api_key=8250c76f81ee5b7089c23a813705401b&language=en-US`)
      getSimilarMovies(`https://api.themoviedb.org/3/movie/${e.target.alt ?? e.target.id}/similar?api_key=8250c76f81ee5b7089c23a813705401b&language=en-US&page=1`)
      location.hash = "#movie="
    })

    genericSection.append(divContent)

  })

}

export const getDataDetails = async (URL) => {
  try {
    let response = await fetch(URL)
    let data = await response.json()
    let genres = data.genres;
    console.log(genres);
    console.log(data)
    headerSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${data.poster_path || data.backdrop_path})`;
    movieDetailTitle.innerHTML = data.title;
    movieDetailDescription.innerHTML = data.overview;
    spanValue.innerHTML = data.vote_average.toFixed(1)


    //*muestreo de generos que coinciden con la pelicula que se está mostrando
    //* se limpia el html 

    const $categoryList = document.querySelector('.categories-list')
    $categoryList.innerHTML = ""
    console.log($categoryList);
    genres.map(el => {

      console.log(el);


      const div = document.createElement('div');
      div.classList.add('category-container')
      const h3 = document.createElement('h3')
      h3.classList.add('category-title')
      h3.setAttribute('id', `id${el.id}`)
      h3.innerHTML = el.name
      div.append(h3)

      $categoryList.appendChild(div)



    })


  } catch (e) { console.log(e) }
}


const getSimilarMovies = async (URLL) => {
  try {
    let response = await fetch(URLL)
    let json = await response.json();


    const arraySliced = json.results.slice(12)
    console.log(arraySliced);


    const relatedMovies = document.querySelector('.relatedMovies-scrollContainer')

    relatedMovies.innerHTML = ""


    arraySliced.map(el => {
      const div = document.createElement('div');
      div.classList.add('movie-container')

      const img = document.createElement('img')
      img.classList.add('movie-img')
      img.src = `https://image.tmdb.org/t/p/w300/${el.backdrop_path}`

      div.append(img)

      relatedMovies.append(div)


    })





  } catch (err) {
    console.log(err)
  }
}



