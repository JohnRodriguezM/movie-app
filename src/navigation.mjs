
"use strict"

import { getCategegoriesPreview, getTrendingMoviesPreview } from "./main.mjs"

const homePage = () => {
  getCategegoriesPreview()
  getTrendingMoviesPreview()
  console.log('estamos en el home')
}

const trendsPage = () => {
  console.log('estamos en trends');
}

const categoriesPage = () => {
  console.log('estamos en categories');
}

const movieDetailsPage = () => {
  console.log('estamos en los detalles de la pelicula')
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




//! pasar multiples elementos a display none, con la clase inactive
const displayNone = (...elements) => elements.map(el => el.classList.add('inactive'))


//*pendiente de implementación, funciona perfecto
/*header.addEventListener('click', () => {
  displayNone(h, j, k)
})*/



