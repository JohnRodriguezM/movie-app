
"use strict";
//@ts-check



export const BASE_URL = 'https://api.themoviedb.org/3/'
export const API_KEY = "8250c76f81ee5b7089c23a813705401b";

export const URLS = {
  URL_TRENDING_MOVIES: `${BASE_URL}trending/movie/day?api_key=${API_KEY}`,
  URL_CATEGORY : `${BASE_URL}genre/movie/list?api_key=${API_KEY}`,
}
