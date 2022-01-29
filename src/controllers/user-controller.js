import routeService from "../services/route-service.js";
import dummyUsers from "./.dummy-users.js";

export default class {
  constructor(app) {
    let routes = routeService.user

    app.get(routes.show, this.show)
  }

  show(req, res) {
    let userId = req.params.userId
    res.render('user/show', {user: dummyUsers[userId]})
  }
}
