import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import prisma from "../services/prisma-service.js"

export default class {
  constructor(app) {
    let routes = routeService.user

    app.get(routes.show, auth.authorize("admin"), this.show)
    app.get(routes.index, auth.authorize("admin"), this.index)
  }

  async show(req, res) {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    })
    
    if (!user)
      res.status(404).send("Product not found")

    res.render('user/show', { user })
  }

  async index(req, res) {
    res.render('user/index', {
      users: await prisma.user.findMany(),
      pagination: {
        numberOfPages: 3,
        currentPage: 1
      }
    })
  }
}
