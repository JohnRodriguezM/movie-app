
"use strict"

import { getCategegoriesPreview, getTrendingMoviesPreview, getMovieByCategory,getMovie } from "./main.mjs"

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

searchFormBtn.addEventListener('click', e => {
  console.log(e.target);
  location.hash = "#search="})

arrowButton.addEventListener('click', e =>{
 /* if(location.hash === "#movie=") return location.hash = "#category="
  if(location.hash === "#category=") return location.hash = "#home"*/

 
    location.hash = "#home"
  
  })


/*trendingBtn.addEventListener('click', e => location.hash = "#trends")*/


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
  /*headerSection.style.background = ''*/ //*definir la imagen de la pelicula
  arrowButton.classList.add('header-arrow--white')

  displayNoneAdd(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection, headerCategoryTitle, genericSection)

  displayNoneRemove(arrowButton, movieDetailSection)

  console.log('estamos en los detalles de la pelicula')
}

/*const trendsPage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')

  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)

  console.log('estamos en trends');
}*/

const searchPage = () => {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowButton.classList.remove('header-arrow--white')

  displayNoneAdd(headerTitle, movieDetailSection, trendingPreviewSection, categoriesPreviewSection,searchForm)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)


    //* se ejecuta la función que me trae las peliculas en el search
  getMovie()

  console.log('estamos en la busqueda')
}






export const navigator = (category = "#category=") => {
  switch (location.hash) {
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








