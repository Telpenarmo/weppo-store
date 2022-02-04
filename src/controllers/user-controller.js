import routeService from "../services/route-service.js";
import prisma from "../services/prisma-service.js"

export default class {
  constructor(app) {
    let routes = routeService.user

    app.get(routes.show, this.show)
    app.get(routes.index, this.index)
  }

  show(req, res) {
    let userId = req.params.userId
    res.render('user/show', {user: dummyUsers[userId]})
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
