export const select = (id) => document.querySelector(id)

export const selectSpecific = (element, id) => element.querySelector(id)

export const removeClass = (el, classEl) => {
  el.classList.remove(classEl)
}

export const addClass = (el, classEl) => {
  el.classList.add(classEl)
}

export const displayNoneAdd = (...elements) => elements.map(el => el.classList.add('inactive'))

export const displayNoneRemove = (...elements) => elements.map(el => {
  el.classList.remove('inactive');
})

// addclass and remove class active detailmovie
export const displayInactiveClassAnimation = (...element) => element.map(el => {
  el.classList.add('inactive-details')
})

export const displayRemoveClassAnimation = (...element) => element.map(el => {
  el.classList.remove('active-details')
})

export const displayRemoveClassAnimationInactive = (...element) => element.map(el => {
  el.classList.remove('inactive-details')
})

// OCULTANDO ELEMENTE POR MEDIO CLASS AND CSS.
export const addClassStatusInactive = (...elements) => elements.map((el) => {
  el.classList.add('inactiveStatus');
})

export const removeStatus = (...elements) => elements.map((el) => {
  el.classList.remove('inactiveStatus')
})

export const addClassStatusactive = (...elements) => elements.map((el) => {
  el.classList.add('activeStatus');
})

export const removeStatusActive = (...elements) => elements.map(el => el, classList.remove('active'))



// Dezplazamiento vectical del scroll
export const scrollMove = (vertical) => {
  window.scrollTo({
    behavior: 'smooth',
    top: vertical,
  })


}
// ----

export const toggleOpacity = (opacity, ...elements) => {
  elements.map(el => {
    el.style.opacity = opacity;
  })
}