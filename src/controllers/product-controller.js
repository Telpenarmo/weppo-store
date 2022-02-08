import routeService from "../services/route-service.js";
import auth from "../services/auth-service.js";
import prisma from "../services/prisma-service.js"
import helpers from "../services/helper-service.js"

const itemsOnPage = 10

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
      await helpers.paginationHelper(req, prisma.product, itemsOnPage)
    res.render('product/index', {
      products: results,
      pagination
    })
  }

  async createGet(req, res) {
    res.render('product/create')
  }

  async createPost(req, res) {
    console.log(req.body)
    res.render('product/create')
  }

  async editGet(req, res) {
    res.render('product/edit', { product: {
      id: 0,
      name: 'Resistor 330k',
      summary: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent dictum velit a neque vulputate.`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent varius dignissim lacus, quis venenatis ex bibendum eu. Sed 
      interdum ullamcorper turpis, vel imperdiet ante dictum nec. Sed fringilla 
      nunc lacus, id consectetur ligula rhoncus a. Nam non diam nisl. Donec 
      pretium felis ante, id congue mi pulvinar a. Praesent eros enim, tempus 
      eu cursus vitae, pellentesque eget dolor. Sed vel lorem consequat, 
      pharetra massa non, sollicitudin est. Vivamus ullamcorper ligula eu auctor 
      scelerisque. Fusce viverra tincidunt dolor, in luctus arcu ultrices in. 
      Aliquam et tempus est.`,
      price: 0.25
    } } )
  }

  async editPost(req, res) {
    console.log(req.body)
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
      await helpers.paginationHelper(req, prisma.product, itemsOnPage, constraint)

    res.render('product/index', {
      products: results,
      pagination
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
