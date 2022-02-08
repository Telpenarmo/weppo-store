function modifyQuantityHtml (id, modifier) {
  let quantity = document.querySelectorAll('.product-quantity')
  for(let node of quantity) {
    if(node.dataset.id == id) {
      quantity = node
    }
  }
  let modified = modifier( parseInt(quantity.textContent) )
  if(modified >= 0)
    quantity.textContent = modified
}

function calculateSum (sumNode) {
  let rows = document.querySelectorAll('.cart-table-row')
  let sum = 0
  rows.forEach( row => {
    let price = row.querySelector('.product-price')
    price = parseFloat(price.textContent)
    let quantity = row.querySelector('.product-quantity')
    quantity = parseFloat(quantity.textContent)
    sum += quantity * price
  })

  sumNode.textContent = sum
}

document.addEventListener('DOMContentLoaded', () => {
  const quantityIncrementers = document.querySelectorAll('.quant-incr')
  const quantityDecrementers = document.querySelectorAll('.quant-decr')
  let sumNode = document.querySelector('#cart-sum')

  calculateSum(sumNode)

  quantityIncrementers.forEach( button => {
    button.addEventListener('click', () => {
      let productId = button.dataset.id
      let incr = x => x + 1
      modifyQuantityHtml(productId, incr)
      updateOrCreateEntry(productId, incr)
      calculateSum(sumNode)
      saveCart()
    })
  })

  quantityDecrementers.forEach( button => {
    button.addEventListener('click', () => {
      let productId = button.dataset.id
      let decr = x => x - 1
      modifyQuantityHtml(productId, decr)
      updateOrCreateEntry(productId, decr)
      calculateSum(sumNode)
      saveCart()
    })
  })
})
