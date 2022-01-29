import routeService from "../services/route-service.js";

export default class {
  constructor(app) {
    let routes = routeService.auth

    app.get(routes.login, this.loginGet)
    app.get(routes.signup, this.signupGet)
  }

  loginGet(req, res) {
    res.render('auth/login')
  }

  signupGet(req, res) {
    res.render('auth/signup')
  }
}
