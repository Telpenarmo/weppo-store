import routeService from "../services/route-service.js"
import dummyProducts from "./.dummy-products.js"

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

  index(req, res) {
    res.render('home/index', {
      products: dummyProducts
    })
  }
}
