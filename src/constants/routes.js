export const ROUTES = {
  dashboard: {
    key: 'dashboard',
    path: '/',
    name: 'Dashboard',
    exact: true,
  },
  media: {
    key: 'media',
    path: '/media',
    name: 'Media'
  },
  catalog: {
    key: 'catalog',
    name: 'Catalog',
    routes: {
      products: {
        key: 'products',
        path: '/products',
        routePath: 'products/*',
        name: 'Products'
      },
      cards: {
        key: 'cards',
        path: '/cards',
        routePath: 'cards/*',
        name: 'Cards'
      },
      categories: {
        key: 'categories',
        path: '/categories',
        routePath: 'categories/*',
        name: 'Categories'
      },
      brands: {
        key: 'brands',
        path: '/brands',
        routePath: 'brands/*',
        name: 'Brands'
      },
      attributes: {
        key: 'attributes',
        path: '/attributes',
        routePath: 'attributes/*',
        name: 'Attributes'
      },
    }
  },
  customers: {
    key: 'customers',
    name: 'Customers',
    routes: {
      clients: {
        key: 'clients',
        path: '/customers',
        routePath: 'customers/*',
        name: 'List',
        exact: true,
      },
      addresses: {
        key: 'addresses',
        path: '/customers/addresses',
        routePath: 'customers/addresses/*',
        name: 'Addresses'
      },
      tariffs: {
        key: 'tariffs',
        path: '/customers/tariffs',
        routePath: 'customers/tariffs/*',
        name: 'Tariffs'
      },
      roles: {
        key: 'roles',
        path: '/customers/roles',
        routePath: 'customers/roles/*',
        name: 'Roles'
      }
    }
  },
  languages: {
    key: 'languages',
    path: '/languages',
    routePath: 'languages/*',
    name: 'Languages',
    exact: false
  },
};
