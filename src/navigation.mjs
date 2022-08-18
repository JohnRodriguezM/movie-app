
"use strict"

//@ts-check
//? ready
import {
  getCategegoriesPreview,
  getTrendingMoviesPreview,
  getMovie,
  getCategegoriesPageTwo } from "./main.mjs"

import { DOM_ELEMENTS } from "./nodes.mjs"

import { removeClass, addClass, displayNoneRemove, displayNoneAdd } from './utils/helpers.mjs'

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
  trendingBtn } = DOM_ELEMENTS;






window.addEventListener('DOMContentLoaded', e => {
  navigator()
  if (location.hash !== '#home') return location.hash = '#home'
})

window.addEventListener('hashchange', e => {
  navigator()
})


document.addEventListener('click', e => {
  if (e.target === searchFormBtn) location.hash = "#search="
  if (e.target === arrowButton) location.hash = "#home"
  if (e.target === trendingBtn) location.hash = "#trends"
})



const homePage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';

  displayNoneAdd(arrowButton, headerCategoryTitle, genericSection, movieDetailSection)

  displayNoneRemove(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection)

  getCategegoriesPreview()
  getTrendingMoviesPreview()

  console.log('we are in home mode')
}


const categoriesPage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';
  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)
  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)

  console.log('we are in categories mode');
}

const movieDetailsPage = () => {
  addClass(headerSection, 'header-container--long')
  addClass(arrowButton, 'header-arrow--white')

  displayNoneAdd(headerTitle, searchForm, trendingPreviewSection, categoriesPreviewSection, headerCategoryTitle, genericSection)

  displayNoneRemove(arrowButton, movieDetailSection)

  console.log('we are in movie details mode')
}

const trendsPage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';


  displayNoneAdd(headerTitle, movieDetailSection, searchForm, trendingPreviewSection, categoriesPreviewSection)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection)
  getCategegoriesPageTwo()
  console.log('estamos en trends');
}

const searchPage = () => {
  removeClass(headerSection, 'header-container--long')
  removeClass(arrowButton, 'header-arrow--white')
  headerSection.style.background = '';

  displayNoneAdd(headerTitle, movieDetailSection, trendingPreviewSection, categoriesPreviewSection, searchForm)

  displayNoneRemove(headerCategoryTitle, arrowButton, genericSection,)

  getMovie()

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

