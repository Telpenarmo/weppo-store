import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import prisma from "../services/prisma-service.js"
import helpers from "../services/helper-service.js"

const itemsOnPage = 10
const db = prisma.product

export default class {
  constructor(app) {
    let routes = routeService.product

    app.get(routes.index, this.index)
    app.get(routes.search, this.search)
    app.get(routes.create, auth.authorize("admin"), this.createGet)
    app.post(routes.create, auth.authorize("admin"), this.createPost)
    app.get(routes.edit, auth.authorize("admin"), this.editGet)
    app.post(routes.edit, auth.authorize("admin"), this.editPost)
    app.get(routes.show, this.show)

    app.locals.navbar.tabs.push({
      label: 'Products',
      hasDropdown: false,
      href: routes.index
    })
  }

  async index(req, res) {
    const { results, pagination } =
      await helpers.paginationHelper(req, db, itemsOnPage)
    res.render('product/index', {
      products: results,
      pagination
    })
  }

  async createGet(req, res) {
    res.render('product/create')
  }

  async createPost(req, res) {
    let product = req.body
    if (!validate(req.body)) {
      res.render('product/edit', { product, emptyRow: true })
      return
    }
    product.price = parseFloat(product.price)
    
    product = await db.create({
      data: product,
      select: { id: true }
    })

    console.log(`Product ${product.id} created.`)
    res.render('product/create')
  }

  async editGet(req, res) {
    const product = await db.findUnique({
      where: { id: parseInt(req.params.id) }
    })

    if (product && !product.deleted)
      res.render('product/edit', { product })
    else
      res.render('common/404')
  }

  async editPost(req, res) {
    const product = req.body

    if (!validate(req.body)) {
      res.render('product/edit', { product, emptyRow: true })
      return
    }
    product.id = parseInt(product.id)
    product.price = parseFloat(product.price)

    await db.update({
      where: { id: product.id },
      data: product
    })

    console.log(`Product ${product.id} updated.`)
    res.render('product/create')
  }

  async search(req, res) {
    const conObj = {
      contains: req.query.q,
    }
    const constraint = {
      OR: [
        { name: conObj },
        { summary: conObj }
      ]
    }
    const { results, pagination } =
      await helpers.paginationHelper(req, db, itemsOnPage, constraint)

    res.render('product/index', {
      products: results,
      pagination
    })
  }

  async show(req, res) {
    const productId = req.params.id

    const product = await db.findUnique({
      where: { id: parseInt(productId) }
    })

    if (product && !product.deleted)
      res.render('product/show', { product })
    else
      res.render('common/404')
  }
}

function validate(p) {
  return p.name && p.summary && p.description && p.price
}
