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
        name: 'Products'
      },
      cards: {
        key: 'cards',
        path: '/cards',
        name: 'Cards'
      },
      categories: {
        key: 'categories',
        path: '/categories',
        name: 'Categories'
      },
      brands: {
        key: 'brands',
        path: '/brands',
        name: 'Brands'
      },
      attributes: {
        key: 'attributes',
        path: '/attributes',
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
        name: 'List',
        exact: true,
      },
      addresses: {
        key: 'addresses',
        path: '/customers/addresses',
        name: 'Addresses'
      },
      tariffs: {
        key: 'tariffs',
        path: '/customers/tariffs',
        name: 'Tariffs'
      },
      roles: {
        key: 'roles',
        path: '/customers/roles',
        name: 'Roles'
      }
    }
  },
  languages: {
    key: 'languages',
    path: '/languages',
    name: 'Languages',
    exact: true
  },
};
