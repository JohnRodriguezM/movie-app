"use strict";

import { URLS } from "./utils/urls.mjs";

import { DOM_ELEMENTS } from "./nodes.mjs"

const { URL_TRENDING_MOVIES, URL_CATEGORY, CATEGORY } = URLS;

const { trendingMoviesPreviewList, categoriesPreviewList, genericSection, Title, searchFormInput, headerSection
} = DOM_ELEMENTS;

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


      //* manejo de la card al hover del elemento tarjeta
      const containerHoverDetails = document.createElement('div')
      containerHoverDetails.classList.add('card-hover')
      /*containerHoverDetails.classList.add('inactive')*/
      const pHoverDetails = document.createElement('p')

      containerHoverDetails.append(pHoverDetails)

      pHoverDetails.innerHTML = elMap.title;




      trendingMoviesPreviewList.append(movieContainer, containerHoverDetails)


      img.addEventListener('mouseover', (e) => {
        console.log(e.target)
        /*containerHoverDetails.classList.remove('inactive')*/
        containerHoverDetails.style.opacity = 1

      })

      img.addEventListener('mouseout', (e) => {
        /*containerHoverDetails.classList.add('inactive')*/
        containerHoverDetails.style.opacity = 0
      })


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
        getMovieByCategory(String(e.target.dataset.id), elMap.name)

        location.hash = `#category=${elMap.id}-${elMap.name}`
        /*console.log(String(e.target.dataset.id))*/
      })


    }
    )
    //*
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

    genericSection.innerHTML = ""

    results.map(el => {

      let divContent = document.createElement('div')
      divContent.classList.add('movie-container')
      let p = document.createElement('p')
      p.innerHTML = el.title
      let img = document.createElement('img')
      img.classList.add('movie-img')
      img.src = `https://image.tmdb.org/t/p/w300/${el.backdrop_path}`
      img.alt = el.id

      divContent.append(img, p)


      divContent.addEventListener('click', function (e) {
        alert(e.target.alt)
        getDataDetails(`https://api.themoviedb.org/3/movie/${e.target.alt}?api_key=8250c76f81ee5b7089c23a813705401b&language=en-US`)
        location.hash = "#movie="
      })

      genericSection.appendChild(divContent)

    })
  } catch (error) { console.error(error) }
}





export const getMovie = async () => {

  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8250c76f81ee5b7089c23a813705401b&query=${searchFormInput.value}&page=1&include_adult=false`)
  let { results } = await response.json()

  genericSection.innerHTML = ""

  const presentacion = document.createElement('h3')
  presentacion.innerHTML = "coincidencias"

  results.map(el => {

    console.log(el)
    let divContent = document.createElement('div')
    divContent.classList.add('movie-container')
    let p = document.createElement('p')
    p.innerHTML = el.title
    let img = document.createElement('img')
    img.classList.add('movie-img')
    img.src = `https://image.tmdb.org/t/p/w300/${el.backdrop_path}`
    img.alt = el.id

    divContent.append(img, p)

    divContent.addEventListener('click', function (e) {
      alert(e.target.alt)
      getDataDetails(`https://api.themoviedb.org/3/movie/${e.target.alt}?api_key=8250c76f81ee5b7089c23a813705401b&language=en-US`)
      location.hash = "#movie="
    })

    genericSection.append(divContent)

  })

}

const getDataDetails = async (URL) => {
  try {
    let response = await fetch(URL)
    let {poster_path} = await response.json()
    console.log(poster_path);

 


   let url = `https://image.tmdb.org/t/p${poster_path}`
    console.log(url);
    headerSection.style.background ="https://pics.filmaffinity.com/Deadpool-777527803-large.jpg";




  } catch (e) { console.log(e) }
}
