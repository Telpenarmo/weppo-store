import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import prisma from "../services/prisma-service.js"

const itemsOnPage = 10

export default class {
  constructor(app) {
    let routes = routeService.product

    app.get(routes.index, this.index)
    app.get(routes.search, this.search)
    app.get(routes.create, auth.authorize("admin"), this.createGet)
    app.post(routes.create, auth.authorize("admin"), this.createPost)
    app.get(routes.show, this.show)

    app.locals.navbar.tabs.push({
      label: 'Products',
      hasDropdown: false,
      href: routes.index
    })
  }

  async index(req, res) {
    const page = req.query.page || 1
    const count = await prisma.product.count()
    const products = await prisma.product.findMany({
      skip: itemsOnPage * (page - 1),
      take: itemsOnPage,
    })
    res.render('product/index', {
      products,
      pagination: {
        numberOfPages: Math.ceil(count / itemsOnPage),
        currentPage: page
      }
    })
  }

  async createGet(req, res) {
    res.render('product/create')
  }

  async createPost(req, res) {
    console.log(req.body)
    res.render('product/create')
  }

  async search(req, res) {
    const page = req.query.page || 1
    const count = await prisma.product.count()

    const conObj = {
      contains: req.params.query,
    }
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: conObj },
          { summary: conObj }
        ]
      },
      skip: itemsOnPage * (page - 1),
      take: itemsOnPage,
    })

    res.render('product/index', {
      products: products,
      pagination: {
        numberOfPages: Math.ceil(count / itemsOnPage),
        currentPage: page
      }
    })
  }

  async show(req, res) {
    const productId = req.params.id

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) }
    })

    if (product && !product.deleted)
      res.render('product/show', { product })
    else
      res.render('common/404')
  }
}
