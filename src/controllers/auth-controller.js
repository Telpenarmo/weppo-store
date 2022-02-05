import bcrypt from "bcrypt"
import routeService from "../services/route-service.js";
import prisma from "../services/prisma-service.js"
import auth from "../services/authorize.js"

export default class {
  constructor(app) {
    let routes = routeService.auth

    app.get(routes.login, this.loginGet)
    app.get(routes.signup, this.signupGet)
    app.post(routes.login, this.loginPost)
  }

  loginGet(req, res) {
    res.render('auth/login')
  }

  async loginPost(req, res) {
    let username = req.body.username
    let password = req.body.password

    let user = (await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        passHash: true,
      }
    }))
    if (!user)
      res.render('auth/login')

    let success = await bcrypt.compare(password, user.passHash)
    if (success) {
      auth.saveUser(req, res, user.id)
    }
    else
      res.render('auth/login')
  }

  signupGet(req, res) {
    res.render('auth/signup')
  }
}
