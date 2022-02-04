import routeService from "../services/route-service.js"
import prisma from "../services/prisma-service.js"

export default class {
  constructor(app) {

    let routes = routeService.home

    app.get(routes.index, this.index)

    app.locals.navbar.tabs.push({
      label: 'Home',
      hasDropdown: false,
      href: routes.index
    })
  }

  async index(req, res) {
    res.render('home/index', {
      products: await prisma.product.findMany()
    })
  }
}
