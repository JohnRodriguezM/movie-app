
"use strict"

import { getCategegoriesPreview, getTrendingMoviesPreview, getMovieByCategory } from "./main.mjs"

import { DOM_ELEMENTS } from "./nodes.mjs"

const { headerSection, arrowButton, headerTitle, headerCategoryTitle, searchForm, trendingPreviewSection, genericSection, movieDetailSection, categoriesPreviewSection, searchFormBtn, trendingBtn, categoryTitle } = DOM_ELEMENTS;

export const displayNoneAdd = (...elements) => elements.map(el => el.classList.add('inactive'))
export const displayNoneRemove = (...elements) => elements.map(el => el.classList.remove('inactive'))






window.addEventListener('DOMContentLoaded', e => {

  navigator()
})

window.addEventListener('hashchange', e => {
  /*location.reload()*/
  navigator()
})

searchFormBtn.addEventListener('click', e => location.hash = "#search=")

arrowButton.addEventListener('click', e => location.hash = "#home")

trendingBtn.addEventListener('click', e => location.hash = "#trends")


const homePage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')

  displayNoneAdd(arrowButton, headerCategoryTitle, genericSection, movieDetailSection)

  displayNoneRemove(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection)

  getCategegoriesPreview()
  getTrendingMoviesPreview()

  console.log('estamos en el home')
}


const categoriesPage = () => {

  /*let el = categoryTitle;

  let arr = el.id.slice(2)
*/
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')
  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)
  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)
  /*getMovieByCategory(arr)*/


  console.log('estamos en categories');
}

const movieDetailsPage = () => {
  headerSection.classList.add('header-container--long');
  headerSection.style.background = ''; //*definir la imagen de la pelicula
  arrowButton.classList.add('header-arrow--white')

  displayNoneAdd(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection, headerCategoryTitle, genericSection)

  displayNoneRemove(arrowButton, movieDetailSection)

  console.log('estamos en los detalles de la pelicula')
}

const trendsPage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')

  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)

  console.log('estamos en trends');
}

const searchPage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')

  displayNoneAdd(headerTitle, movieDetailSection, trendingPreviewSection, categoriesPreviewSection)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection, searchForm)

  console.log('estamos en la busqueda')
}






export const navigator = (category = "#category=") => {
  switch (location.hash) {
    case '#trends':
      trendsPage()
      break;
    case category:
      categoriesPage()
      break;
    case '#search=':
      searchPage()
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








