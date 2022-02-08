import routeService from "../services/route-service.js";
import prisma from "../services/prisma-service.js"
import auth from "../services/auth-service.js";
import helpers from "../services/helper-service.js";

const itemsOnPage = 10

export default class {
  constructor(app) {
    let routes = routeService.order

    app.get(routes.index, auth.authorize("admin"), this.index)
    app.get(routes.show, auth.authorize("admin"), this.show)
  }

  async index(req, res) {
    const include = { user: true }
    const { results, pagination } =
      await helpers.paginationHelper(req, prisma.order, itemsOnPage, {}, include)
    res.render('order/index', {
      orders: results,
      pagination
    })
  }

  async show(req, res) {
    const productId = req.params.id

    const order = await prisma.order.findUnique({
      where: { id: parseInt(productId) },
      include: {
        user: true,
        orderItems: {
          include: { product: true }
        }
      }
    })

    if (order && !order.deleted)
      res.render('order/show', { order })
    else
      res.render('common/404')
  }
}
