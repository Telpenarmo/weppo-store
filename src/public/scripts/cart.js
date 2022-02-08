const cartCookie = 'cart'
const empty_cart = {
  products: []
}
var cart = cart_init()

/* source: https://stackoverflow.com/questions/10730362/get-cookie-by-name */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value) {
  document.cookie = name + '=' + value + ';path=/;'
}

function cart_init() {
  let cookie = getCookie(cartCookie);
  if(!cookie) {
    setCookie(cartCookie, JSON.stringify(empty_cart))
    return empty_cart
  }
  return JSON.parse(cookie)
}

function saveCart() {
  setCookie(cartCookie, JSON.stringify(cart))
}

function updateOrCreateEntry (productId, modifier) {
  let found = false

  cart.products = cart.products.map( product => {
    let [id, quantity] = product
    if (id == productId) {
      found = true
      return [id, modifier(quantity)]
    }
    return product
  })

  if(!found) cart.products.push([productId, modifier(0)])
}

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart')

  addToCartButtons.forEach( button => {
    button.addEventListener('click', () => {
      let productId = button.dataset.id
      updateOrCreateEntry(parseInt(productId), x => x + 1)
      saveCart()
      alert("Item has been successfully added to your cart!")
    })
  })
})
