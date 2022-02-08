import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import dummyOrders from "./.dummy-orders.js";

export default class {
  constructor(app) {
    let routes = routeService.order

    app.get(routes.index, auth.authorize("admin"), this.index)
    app.get(routes.show, auth.authorize("admin"), this.show)
  }

  async index(req, res) {
    res.render('order/index', {
      orders: dummyOrders,
      pagination: {
        numberOfPages: 3,
        currentPage: 1
      }
    })
  }

  async show(req, res) {
    res.render('order/show', {
      order: dummyOrders[0]
    })
  }
}
