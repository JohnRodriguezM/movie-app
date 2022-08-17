"use strict";

export const select = (id) => document.querySelector(id)


export const DOM_ELEMENTS = {
  //sections
  headerSection: select('#header'),
  trendingPreviewSection: select('#trendingPreview'),
  categoriesPreviewSection: select('#categoriesPreview'),
  movieDetailSection: select('#movieDetail'),

  //list & Containers
  movieContainer: document.querySelectorAll('.movie-container'),
  searchForm: select('#searchForm'),
  Title: select('#categoryTitle'),
  categoryTitle: select('.category-title'),
  trendingMoviesPreviewList: select('.trendingPreview-movieList'),
  categoriesPreviewList: select('.categoriesPreview-list'),
  genericSection: select('#genericList'),
  movieDetailsCategoriesList: select('#movieDetail .categories-list'),
  relatedMoviesContainer: select('.relatedMovies-scrollContainer'),

  //elements
  headerTitle: select('.header-title'),
  arrowButton: select('.header-arrow'),
  headerCategoryTitle: select('.header-title--categoryView'),

  //search and form
  searchForm: select('#searchForm'),
  searchFormInput: select('#searchForm input'),
  searchFormBtn: select('#searchBtn'),
  trendingBtn: select('.trendingPreview-btn'),
  movieDetailTitle: select('.movieDetail-title'),
  movieDetailDescription: select('.movieDetail-description'),
  movieDetailScore: select('.movieDetail-score'),
  spanValue: select('.movieDetail-score')

} 

console.log(DOM_ELEMENTS)