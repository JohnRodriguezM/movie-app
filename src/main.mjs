"use strict";

import { URLS } from "./utils/urls.mjs";

import { DOM_ELEMENTS } from "./nodes.mjs"

const { URL_TRENDING_MOVIES, URL_CATEGORY, CATEGORY } = URLS;

const { trendingMoviesPreviewList, categoriesPreviewList, genericSection, Title, searchFormInput, headerSection, movieDetailTitle, movieDetailDescription, spanValue, categoriesPreviewSection
} = DOM_ELEMENTS;

import { navigator } from './navigation.mjs'



//!
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
      let imageMovie = `https://image.tmdb.org/t/p/w300${elMap.backPath}`
      const movieContainer = document.createElement('div')
      movieContainer.classList.add('movie-container')

      const img = document.createElement('img')
      img.classList.add('movie-img')

      movieContainer.appendChild(img)

      img.src = imageMovie;

      /*voteAverage: 8.264
      
      overview
      */
      //* manejo de la card al hover del elemento tarjeta
      const containerHoverDetails = document.createElement('div')
      containerHoverDetails.classList.add('card-hover')


      const pHoverDetails = document.createElement('p')
      const br = document.createElement('br')
      const average = document.createElement('p')



      containerHoverDetails.append(pHoverDetails, br, average)
      average.innerHTML = ` ⭐${elMap.voteAverage
        }`
      pHoverDetails.innerHTML = `${elMap.title} -`;




      trendingMoviesPreviewList.append(movieContainer, containerHoverDetails)


      img.addEventListener('mouseover', (e) => {
        console.log(e.target)
        /*containerHoverDetails.classList.remove('inactive')*/
        containerHoverDetails.style.opacity = 1
        headerSection.style.opacity = .7;
        categoriesPreviewSection.style.opacity = .7;
        trendingMoviesPreviewList.style.opacity = .85;
        movieContainer.style.opacity = .6;

      })

      img.addEventListener('mouseout', (e) => {
        containerHoverDetails.style.opacity = 0
        headerSection.style.opacity = 1;
        categoriesPreviewSection.style.opacity = 1;
        trendingMoviesPreviewList.style.opacity = 1;
        movieContainer.style.opacity = 1;
      })


    })

    //*


  } catch (error) { console.error(error) }
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


//* se obtienen los trends de la tv
export const getCategegoriesPageTwo = async () => {
  try {
    let response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=8250c76f81ee5b7089c23a813705401b")
    let json = await response.json();
    console.log(json)
    /*const data = json.genres;*/
    /*console.log(data)*/ //! me trae la data completa

   /* categoriesPreviewList.innerHTML = ""
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
        console.log(String(e.target.dataset.id))
      })


    }
    )*/
    //*
  } catch (error) { console.error(error) }
  finally {
    /*console.log('peticion realizada, get categories');*/
  }
}



getCategegoriesPageTwo()

export async function getMovieByCategory(id, name) {
  Title.innerHTML = `${name}`;
  try {
    let url = `${CATEGORY}&language=es-US&include_adult=true&with_genres=${id}`

    let response = await fetch(url)
    let { results } = await response.json();

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



