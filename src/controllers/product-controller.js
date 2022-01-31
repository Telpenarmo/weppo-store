import routeService from "../services/route-service.js";
import dummyProducts from "./.dummy-products.js";

export default class {
  constructor(app) {
    let routes = routeService.product

    app.get(routes.index, this.index)
    
    app.locals.navbar.tabs.push({
      label: 'Products',
      hasDropdown: false,
      href: routes.index
    })
  }

  index(req, res) {
    res.render('product/index', {
      products: dummyProducts,
      pagination: {
        numberOfPages: 3,
        currentPage: 1
      }
    })
  }
}
