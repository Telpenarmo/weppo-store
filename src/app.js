/* Utils */
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"
import routeService from "./services/route-service.js"
import authService from "./services/auth-service.js"
/* Controllers */
import AuthController from "./controllers/auth-controller.js"
import HomeController from "./controllers/home-controller.js"
import UserController from "./controllers/user-controller.js"
import ProductController from "./controllers/product-controller.js"

const port = process.env.PORT
const app = express()
const workdir = dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'pug')
app.set('views', workdir + '/views')
app.use('/assets', express.static(workdir + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET))

app.locals.site = { title: 'WEPPO-STORE' }
app.locals.routes = routeService
app.locals.navbar = { tabs: [] }

app.use(authService.authenticate, (req, res, next) => {
  app.locals.user = req.user // dirty hack to let navbar know about auth status
  next()
})

new AuthController(app)
new HomeController(app)
new UserController(app)
new ProductController(app)

app.get('*', (req, res) => res.render('common/404'))

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
