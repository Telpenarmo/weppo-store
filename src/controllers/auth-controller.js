import bcrypt from "bcrypt"
import routeService from "../services/route-service.js";
import prisma from "../services/prisma-service.js"
import auth from "../services/auth-service.js"

export default class {
  constructor(app) {
    const routes = routeService.auth

    app.get(routes.login, this.loginGet)
    app.post(routes.login, this.loginPost)
    app.get(routes.signup, this.signupGet)
    app.post(routes.signup, this.signupPost)
    app.get(routes.logout, auth.authorize(), this.logout)
  }

  loginGet(req, res) {
    res.render('auth/login')
  }

  async loginPost(req, res) {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
      select: { id: true, passHash: true }
    })
    if (!user) {
      res.render('auth/login', { usernameError: true })
      return
    }

    const success = await bcrypt.compare(req.body.password, user.passHash)
    if (success) {
      auth.saveUser(req, res, user.id)
    } else {
      res.render('auth/login', { passwordError: true })
      return
    }
  }

  signupGet(req, res) {
    res.render('auth/signup')
  }

  async signupPost(req, res) {
    if (!(req.body.username && req.body.password && req.body.name && req.body.surname && req.body.email)) {
      res.render('auth/signup', { emptyRow: true })
      return
    }
    const exists = await prisma.user.count({
      where: {
        OR:
          [{ username: req.body.username },
          { email: req.body.email }]
      },
      select: { id: true }
    })
    if (exists) {
      res.render('auth/signup', { conflict: true })
      return
    }

    const hash = await bcrypt.hash(req.body.password, 10)

    user = await prisma.user.create({
      data: {
        username: req.body.username,
        passHash: hash,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth || undefined
      }
    })

    if (user)
      auth.saveUser(req, res, user.id)
  }

  logout(req, res) {
    auth.forgetUser(res, req.user.id)
  }
}
