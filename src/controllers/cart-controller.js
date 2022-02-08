import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import prisma from "../services/prisma-service.js"

function get_quantity(productId, assoc_list) {
  for( let pair of assoc_list ) {
    let [id, quantity] = pair
    if(id == productId) return quantity
  }
}

export default class {
  constructor(app) {
    const routes = routeService.cart
    
    app.get(routes.show, auth.authorize(), this.showGet)
    app.post(routes.show, auth.authorize(),  this.showPost)
  }

  async showGet(req, res) {
    if(!req.cookies.cart){
      res.render('cart/show')
      return
    }

    let cart = JSON.parse(req.cookies.cart)

    const ids = cart.products.map( pair => {
      let [id, _] = pair
      return id
    })

    let products = await prisma.product.findMany({
      where: {
        id: { in: ids }
      }
    })

    cart.products = products.map( product => {
      let product_id = product.id
      return [product, get_quantity(product_id, cart.products)]
    })

    res.render('cart/show', { cart })
  }

  async showPost(req, res) {
    let cart = JSON.parse(req.cookies.cart)

    /* TODO: Implement ordering */
    console.log(cart)

    res.cookie('cart', '', { maxAge: -1 })
    res.render('cart/show', { 
      message: "Your order has been successfully registered!" 
    })
  }
}
