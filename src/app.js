/* Utils */
import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"
import routeService from "./services/route-service.js"
/* Controllers */
import AuthController from "./controllers/auth-controller.js"
import HomeController from "./controllers/home-controller.js"
import UserController from "./controllers/user-controller.js"

const port = process.env.PORT
const app = express()
const workdir = dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'pug')
app.set('views', workdir + '/views')
app.use('/assets', express.static(workdir + '/public'))

app.locals.site = { title: 'WEPPO-STORE' }
app.locals.routes = routeService
app.locals.navbar = { tabs: [] }

new AuthController(app)
new HomeController(app)
new UserController(app)

/* Added temporarily to test dropdown tabs */
app.locals.navbar.tabs.push({
  label: 'Products',
  hasDropdown: true,
  tabs: [
    {label: 'Browse', href: '/#'},
    {label: 'Categories', href: '/#'}
  ]
})

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
