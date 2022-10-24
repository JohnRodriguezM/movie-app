
"use strict"

//@ts-check
//? ready
import {
  getCategegoriesPreview,
  getTrendingMoviesPreview,
  getMovie,
  getCategegoriesPageTwo
} from "./main.mjs"

import { DOM_ELEMENTS } from "./nodes.mjs"

import {
  removeClass,
  addClass,
  displayNoneRemove,
  displayNoneAdd,
  displayInactiveClassAnimation,
  displayRemoveClassAnimation,
  displayRemoveClassAnimationInactive,
  addClassStatusInactive,
  removeStatus,
  scrollMove
} from './utils/helpers.mjs'

const {
  headerSection,
  arrowButton,
  headerTitle,
  headerCategoryTitle,
  searchForm,
  trendingPreviewSection,
  genericSection,
  movieDetailSection,
  categoriesPreviewSection,
  searchFormBtn,
  trendingBtn,
  glassSection,
  footerMovies
} = DOM_ELEMENTS;


//!funciones de migración a axios para comodidad

import { getTrendingMoviesPreviewAxios, getCategegoriesPreviewAxios } from './axiosMain/mainAxios.mjs'



window.addEventListener('DOMContentLoaded', e => {
  /*console.log(screen.width);*/
  navigator()
  if (location.hash !== '#home') return location.hash = '#home'
})

window.addEventListener('hashchange', e => {
  navigator()
})


document.addEventListener('click', e => {
  if (e.target === searchFormBtn) location.hash = "#search="
  if (e.target === arrowButton) {
    location.hash = "#home"
    scrollMove(500);
  }
  if (e.target === trendingBtn) location.hash = "#trends"
})


// START PAGES 
const homePage = () => {


  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';

  /** BACKUP 
   *  displayNoneAdd(arrowButton, headerCategoryTitle,  genericSection, movieDetailSection)
   */

  removeStatus(categoriesPreviewSection, genericSection, trendingPreviewSection, glassSection, footerMovies)

  displayInactiveClassAnimation(movieDetailSection);
  displayRemoveClassAnimation(movieDetailSection);

  displayNoneAdd(arrowButton, headerCategoryTitle, genericSection)

  displayNoneRemove(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection)

  /*getCategegoriesPreview()*/
  /*getTrendingMoviesPreview()*/
  //*initial movie
  /*getSpecificMovieInit()*/


  //!ejecución de funciones con axios
  getTrendingMoviesPreviewAxios()
  getCategegoriesPreviewAxios()

  console.log('we are in home mode')
}


const categoriesPage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';

  /*
  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)
  */

  displayNoneAdd(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection)
  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)

  console.log('we are in categories mode');
}

// UPDATE DETAILS MOVIE
const movieDetailsPage = () => {
  addClass(headerSection, 'header-container--long')
  addClass(arrowButton, 'header-arrow--white')
  addClass(movieDetailSection, 'active-details')

  displayRemoveClassAnimationInactive(movieDetailSection);

  addClassStatusInactive(categoriesPreviewSection, genericSection, trendingPreviewSection, glassSection, footerMovies);

  displayNoneAdd(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection, headerCategoryTitle, genericSection)

  scrollMove(0);
  console.log('we are in movie details mode')
}

// TRENDS PAGES
const trendsPage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';


  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)
  getCategegoriesPageTwo().then(scrollMove(1022))


  console.log('estamos en trends');
}

const searchPage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';

  displayNoneAdd(headerTitle, movieDetailSection, trendingPreviewSection, categoriesPreviewSection, searchForm)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection,)

  getMovie().then(scrollMove(1022))

  console.log('we are in search mode')
}



export const navigator = (category = "#category=") => {
  switch (location.hash) {
    case category:
      categoriesPage()
      break;
    case '#search=':
      searchPage()
      break;
    case "#trends":
      trendsPage()
      break;
    case '#movie=':
      movieDetailsPage()
      break;
    default:
      homePage()
      break;
  }
  location.hash
}

