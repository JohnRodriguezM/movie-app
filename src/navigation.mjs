
"use strict"

import { getCategegoriesPreview, getTrendingMoviesPreview } from "./main.mjs"

import { DOM_ELEMENTS } from "./nodes.mjs"

//! pasar multiples elementos a display none, con la clase inactive o remover class inactive
export const displayNoneAdd = (...elements) => elements.map(el => el.classList.add('inactive'))
export const displayNoneRemove = (...elements) => elements.map(el => el.classList.remove('inactive'))


const { arrowButton, categoryTitle } = DOM_ELEMENTS;

arrowButton.addEventListener('click', (e) => {
  location.hash = "#home"
})

const homePage = () => {

  const { headerSection, arrowButton, headerTitle, headerCategoryTitle, searchForm, trendingPreviewSection, genericSection, movieDetailSection, categoriesPreviewSection } = DOM_ELEMENTS;

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
  const { headerSection, arrowButton, headerTitle, headerCategoryTitle, searchForm, trendingPreviewSection, genericSection, movieDetailSection, categoriesPreviewSection, categoryTitle } = DOM_ELEMENTS;
  
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')
  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)
  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)
  
  console.log('estamos en categories');
}

const movieDetailsPage = () => {

  const { headerSection, arrowButton, headerTitle, headerCategoryTitle, searchForm, trendingPreviewSection, genericSection, movieDetailSection, categoriesPreviewSection } = DOM_ELEMENTS;
  
  headerSection.classList.add('header-container--long');
  headerSection.style.background = ''; //*definir la imagen de la pelicula

  arrowButton.classList.add('header-arrow--white')
  

  displayNoneAdd(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection,headerCategoryTitle,genericSection)
  displayNoneRemove( arrowButton,movieDetailSection)








  console.log('estamos en los detalles de la pelicula')
}
const trendsPage = () => {
  console.log('estamos en trends');
}

const searchPage = () => {
  console.log('estamos en la busqueda')
}






const navigator = () => {
  switch (location.hash) {
    case '#trends':
      trendsPage()
      break;
    case '#category=':
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


window.addEventListener('DOMContentLoaded', (event) => {
  /*location.hash = ''*/
  navigator()

})

window.addEventListener('hashchange', (event) => {
  location.reload()
  navigator()
})


const select = (id) => document.getElementById(id)

const header = select('arrow')
/*console.log(header)*/



const h = document.getElementById('movieDetail')
const j = document.getElementById('trendingPreview')
const k = document.getElementById('categoriesPreview')







//*pendiente de implementación, funciona perfecto
/*header.addEventListener('click', () => {
  displayNone(h, j, k)
})*/



