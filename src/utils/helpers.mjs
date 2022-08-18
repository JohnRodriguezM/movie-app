export const select = (id) => document.querySelector(id)

export const removeClass = (el, classEl) => {
  el.classList.remove(classEl)
}

export const addClass = (el, classEl) => {
  el.classList.add(classEl)
}

export const displayNoneAdd = (...elements) => elements.map(el => el.classList.add('inactive'))

export const displayNoneRemove = (...elements) => elements.map(el => el.classList.remove('inactive'))

export const toggleOpacity = (value,...elements) => {
  elements.map(el => {
    el.style.opacity = value;
  })
}