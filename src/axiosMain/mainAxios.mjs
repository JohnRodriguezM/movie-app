
import { URLS, APIKEY, BASE_URL } from '../utils/urls.mjs'

import { toggleOpacity, scrollMove, select, selectSpecific } from '../utils/helpers.mjs'
import { DOM_ELEMENTS } from "../nodes.mjs"


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
  movieDetailSection,
  categoriesPreviewSection,
  categoriesList,
  relatedMovies,
} = DOM_ELEMENTS;


import { categoriesPage } from '../navigation.mjs';

//!funciones internas auxilares, poner en otro archivo cuando se refactorice el code
/*import { getSimilarMovies } from '../main.mjs'*/

//*pendiente de refactorizar esta funcion, se trata de la funcion que se encarga de mostrar las peliculas en relacion a la categoria seleccionada en el home

//@ts-ignore
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': APIKEY,
  }
})

//! axios nos devuelve el objeto de una vez seteado en json
//? trae las peliculas de la semana, trending movies, cargan en el home
export const getTrendingMoviesPreviewAxios = async () => {
  try {
    const { data: { results } } = await api('trending/movie/day')
    let backGroundImageHomePage = `url(https://image.tmdb.org/t/p/w500/${results[0].backdrop_path})`;
    headerSection.style.backgroundImage = backGroundImageHomePage

    trendingMoviesPreviewList.innerHTML = ""

    const mapOverMap = results.map(movieElement => {
      const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container">
          <img class="movie-img" src="${BASE_IMG}${movieElement.backdrop_path}">
          <div class="card-hover">
              <div  class="close-card">❌</div>
              <div>
              <p class="card-title">${movieElement.title}</p>
              <p class="card-points">⭐ ${movieElement.vote_average.toFixed(1)}</p>
              </div>
          </div>
        </div>
      `)
      const card = selectSpecific(movieContainer, '.card-hover')
      const closeTag = selectSpecific(movieContainer, '.close-card')
      const containerMovie = selectSpecific(movieContainer, '.movie-container')
      const imgMovie = selectSpecific(movieContainer, '.movie-img')

      imgMovie.addEventListener('click', e => {
        console.log("click card");
        card.style.opacity = 1
        card.style.visibility = "visible"
      })

      closeTag.addEventListener('click', e => {
        console.log("cerrando");
        card.style.opacity = 0
        card.style.visibility = 'hidden'
        toggleOpacity(1, headerSection, categoriesPreviewSection, trendingMoviesPreviewList, containerMovie)
      })

      trendingMoviesPreviewList.append(movieContainer)

    })
  } catch (error) { console.error(error) }
}

export const getCategegoriesPreviewAxios = async () => {
  try {
    const { data: { genres } } = await api('genre/movie/list')

    categoriesPreviewList.innerHTML = ""

    const mapeoCategoriesHome = genres.map(genreElement => {
      let id = `id${genreElement.id}`

      const categoryContainer = document.createRange().createContextualFragment(/*html*/`
      <div class="category-container" data-id = "${genreElement.id}">
        <div class="category-title" id="${id}" data-id = "${genreElement.id}">
          ${genreElement.name}
       </div>
    </div>
      `)
      const categoriesName = selectSpecific(categoryContainer, '.category-title')

      // EXECUTE ACTION FOR CLICK

      //*i have to update this function when I refactor the getMovieByCategory function
      categoriesName.addEventListener('click', e => {
        console.log("click category");
        location.hash = `#category=${genreElement.id}`
        getMovieByCategoryAxios(String(e.target.dataset.id), genreElement.name).then(scrollMove(1022))
      })
      categoriesPreviewList.appendChild(categoryContainer)
    })

  } catch (error) { console.error(error) }
}

export const getCategegoriesPageTwoAxios = async () => {
  try {
    const { data: { results } } = await api('trending/tv/week')
    console.log(results);
    categoriesList.innerHTML = ""
    genericSection.innerHTML = ""
    Title.innerHTML = `Trends on tv`;

    const mapOverMap = results.map(elTrendsOnTv => {
      const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div data-aos="fade-up" class="movie-container trendsOnTv " id ="${elTrendsOnTv.id}">
          <img class="movie-img"
          alt = "${elTrendsOnTv.id}"
          src="${BASE_IMG}${elTrendsOnTv.backdrop_path}">
          <p class="movie-name" >${elTrendsOnTv.name}</p>
        </div>
      `)

      const mainMovieContainer = movieContainer.querySelector('.movie-container')



      mainMovieContainer.addEventListener('click', e => {
        console.log("click card");
        location.hash = `#movie=`
        getDataSimilarCategoriesInDetailsAxios(`movie/${e.target.alt ?? e.target.id}?api_key=${APIKEY}&language=en-US`)
        getSimilarMoviesAxios(
          `movie/${e.target.alt ?? e.target.id}/similar?api_key=${APIKEY}&language=en-US`
        )
      })
      genericSection.append(mainMovieContainer)
    })


  } catch (error) { console.error(error) }
}


export const getMovieFromInputSearchAxios = async () => {
  try {
    const { data: { results } } = await api(`search/movie?query=${searchFormInput.value}`)
    genericSection.innerHTML = ""
    if (results.length === 0) {
      genericSection.innerHTML = ""
      Title.innerHTML = `Results for ${searchFormInput.value}`;
      alert(`no se han encontrado resultados para la busqueda ${searchFormInput.value}`)
      location.reload()
    }

    genericSection.innerHTML = ""
    Title.innerHTML = `Results for ${searchFormInput.value}`;
    const mapOverMap = results.map(elMovieSearched => {


      if (elMovieSearched.backdrop_path !== null) {

        const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div data-aos="fade-up" class="movie-container trendsOnTv "  id = "${elMovieSearched.id}">
          <img class="movie-img"
          alt = "${elMovieSearched.id}"
          src="${BASE_IMG}${elMovieSearched.backdrop_path}">
          <p class="movie-name" id = "${elMovieSearched.id}" >${elMovieSearched.title}</p>
        </div>
      `)

        const mainMovieContainer = movieContainer.querySelector('.movie-container')

        mainMovieContainer.addEventListener('click', e => {
          location.hash = "#movie="
          //*se trae la información de la pelicula usando el id de la pelicula
          getDataSimilarCategoriesInDetailsAxios(`movie/${e.target.alt ?? e.target.id}?api_key=${APIKEY}&language=en-US`)
          getSimilarMoviesAxios(`movie/${e.target.alt ?? e.target.id}/similar?api_key=${APIKEY}&language=en-US&page=1`)
        })

        genericSection.append(mainMovieContainer)
      }
    })
  } catch (error) { console.error(error) }
}



//*empizan las funciones auxiliares
export const getMovieByCategoryAxios = async (id, name = "i") => {
  try {
    const { data: { results } } = await api(`discover/movie?with_genres=${id}`)
    genericSection.innerHTML = ""
    Title.innerHTML = `${name}`;

    const mapOverMap = results.map(el => {

      if (el.backdrop_path !== null) {
        /*data-aos="fade-up"*/

        const movieContainer = document.createRange().createContextualFragment(/*html*/`
        <div  class="movie-container" id = "${el.id}"
        data-id = "${el.id}">
          <img
          alt = "${el.id}"
          class="movie-img" src="${BASE_IMG}${el.backdrop_path}">
          <p class="movie-name" >${el.title}</p>
        </div>
      `)

        const mainMovieContainer = movieContainer.querySelector('.movie-container')

        mainMovieContainer.addEventListener('click', e => {
          let url = `movie/${e.target.alt ?? e.target.id}?api_key=${APIKEY}&language=en-US`
          //*
          //!replace function
          getDataSimilarCategoriesInDetailsAxios(url)
          //*
          getSimilarMoviesAxios(`movie/${e.target.alt ?? e.target.id}/similar?api_key=${APIKEY}&language=en-US&page=1`)
          location.hash = "#movie="
        })

        genericSection.appendChild(mainMovieContainer)

      }
    })

  } catch (error) { console.error(error) }
}


/*import { getSimilarMovies } from '../main.mjs'*/


export const getDataSimilarCategoriesInDetailsAxios = async (url) => {
  try {
    let { data } = await api(url)
    const { title, overview, release_date, vote_average, poster_path, backdrop_path, genres, runtime, id } = data
    /*movieDetailSection.innerHTML = ""*/
    categoriesList.innerHTML = ""

    headerSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${poster_path || backdrop_path})`;
    movieDetailTitle.innerHTML = title;
    movieDetailDescription.innerHTML = overview;
    spanValue.innerHTML = `⭐ ${vote_average.toFixed(1)}`

    genres.map(el => {
      if (el.backdrop_path !== null || el.poster_path !== null) {

        const divContent = document.createRange().createContextualFragment(/*html*/`
        <div class="category-container" data-id = "${el.id}">
          <h3 class = "category-title" id = "id${el.id}" data-id = "${el.id}" data->${el.name}</h3>
        </div>
      `)

        const mainDivContent = divContent.querySelector('.category-title')
        mainDivContent.addEventListener('click', e => {
          getMovieByCategoryAxios(e.target.dataset.id, e.target.innerText)
          console.log(e.target);
          location.hash = `#category=${e.target.dataset.id}`
        })
        categoriesList.appendChild(divContent)

      }
    })

  }
  catch (err) {
    console.log(err);
  }
}


export const getSimilarMoviesAxios = async (URL) => {
  try {

    const { data: { results } } = await api(URL)

    relatedMovies.innerHTML = ""
    results.map(el => {

      if (el.backdrop_path !== null) {



        const divContent = document.createRange().createContextualFragment(/*html*/`
        <div class="movie-container similarMovie" id = "${el.id}">
          <img class="movie-img" 
          id = "${el.id}" src="${BASE_IMG}${el.backdrop_path}" alt = "${el.id}">
        </div>
      `)


        const mainDivContent = divContent.querySelector('.movie-container')
        mainDivContent.addEventListener('click', e => {
          location.hash = "#movie="
          //*se trae la información de la pelicula usando el id de la pelicula
          getDataSimilarCategoriesInDetailsAxios(`movie/${e.target.alt}?api_key=${APIKEY}&language=en-US`)
          getSimilarMoviesAxios(`movie/${e.target.alt}/similar?api_key=${APIKEY}&language=en-US&page=1`)
        })
      


      relatedMovies.append(divContent)
  }})
  } catch (err) {
    console.log(err)
  }
}






