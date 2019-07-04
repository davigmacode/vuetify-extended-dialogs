export const createElement = (el, parent = '#app') => {
  document.querySelector(parent).appendChild(el)
}

export const removeElement = (el) => {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
}
