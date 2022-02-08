function substituteParameters(route, ...params) {
  let paramGenerator = function* () {
    for (let param of params)
      yield param
  }()

  return route.replaceAll(/:[^/]*/g, () => paramGenerator.next().value)
}

export default {
  home: {
    index: '/'
  },
  user: {
    index: '/users',
    show: '/user/:id'
  },
  product: {
    index: '/products',
    search: '/products/search/:query',
    show: '/product/:id',
    create: '/product/create',
    edit: '/product/:id/edit',
    delete: '/product/:id/delete'
  },
  cart: {
    show: '/cart'
  },
  auth: {
    login: '/login',
    signup: '/signup',
    logout: '/logout'
  },
  substituteParameters
}
