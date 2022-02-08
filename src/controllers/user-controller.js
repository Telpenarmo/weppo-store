import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import prisma from "../services/prisma-service.js"

const itemsOnPage = 20

export default class {
  constructor(app) {
    let routes = routeService.user

    app.get(routes.show, auth.authorize("admin"), this.show)
    app.get(routes.index, auth.authorize("admin"), this.index)
  }

  async show(req, res) {
    const user = await prisma.user.findUnique({
      where: { 
        id: parseInt(req.params.id)
      }
    })
    
    if (!user)
      res.status(404).send("Product not found")

    res.render('user/show', { user })
  }

  async index(req, res) {
    const page = req.query.page || 1
    const count = await prisma.user.count()
    const users = await prisma.user.findMany({
      skip: itemsOnPage * (page - 1),
      take: itemsOnPage,
    })
    res.render('user/index', {
      users,
      pagination: {
        numberOfPages: Math.ceil(count / itemsOnPage),
        currentPage: page
      }
    })
  }
}
