import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductForm from './pages/ProductForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/product',
    element: <Product />,
  },
  {
    path: '/add-product',
    element: <ProductForm />,
  },
  {
    path: '/product/:id',
    element: <ProductForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>,
);
