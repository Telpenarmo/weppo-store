import routeService from "../services/route-service.js";
import prisma from "../services/prisma-service.js"

export default class {
  constructor(app) {
    let routes = routeService.product

    app.get(routes.index, this.index)
    app.get(routes.search, this.search)

    app.locals.navbar.tabs.push({
      label: 'Products',
      hasDropdown: false,
      href: routes.index
    })
  }

  async index(req, res) {
    res.render('product/index', {
      products: await prisma.product.findMany(),
      pagination: {
        numberOfPages: 3,
        currentPage: 1
      }
    })
  }

  async search(req, res) {
    const conObj = {
      contains: req.query.q,
    }
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: conObj },
          { summary: conObj }
        ]
      }
    })
    
    res.render('product/index', {
      products: products,
      pagination: {
        numberOfPages: 1,
        currentPage: 1
      }
    })
  }
}
