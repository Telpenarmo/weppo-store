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
    search: '/products/search',
    show: '/product/:id'
  },
  auth: {
    login: '/login',
    signup: '/signup',
    logout: '/logout'
  },
  substituteParameters
}
