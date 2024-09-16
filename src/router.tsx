import {createBrowserRouter} from 'react-router-dom';
import {Layout} from './layouts/Layout';
import {
  loader as ProductsLoader,
  Products,
  action as putAvailabilityAction,
} from './views/Products';

import {NewProduct, action as newProductAction} from './views/NewProduct';
import {
  EditProduct,
  //   action as editAction,
  loader as EditLoader,
  action as editAction,
} from './views/EditProduct';

import {action as deleteAction} from './components/ProductDetails';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, //index: true is equivalent to path: '/'
        element: <Products />,
        loader: ProductsLoader,
        action: putAvailabilityAction,
      },
      {
        path: 'products/new',
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
        loader: EditLoader,
        action: editAction,
      }, //*ROA pattern Resource Oriented Architecture
      {
        path: 'products/:id/delete',
        element: <EditProduct />,
        action: deleteAction,
      }, //*ROA pattern Resource Oriented Architecture
    ],
  },
]);
