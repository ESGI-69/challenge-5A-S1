import { createBrowserRouter } from 'react-router-dom';

import BackofficeLayout from '@/pages/__layouts/backofficeLayout';
import WebsiteLayout from '@/pages/__layouts/websiteLayout';

import ErrorPage from '@/pages/404.jsx';
import Library from '@/pages/Library';

import CompaniesValidation from '@/pages/backoffice/CompaniesValidation';
import Dashboard from '@/pages/backoffice/Dashboard/';
import Employees from '@/pages/backoffice/Employees';
import EstablishmentCreation from '@/pages/backoffice/EstablishmentCreation';

import CompanyRegister from '@/pages/website/CompanyRegister';
import Establishment from '@/pages/website/Establishment';
import Home from '@/pages/website/Home';
import Login from '@/pages/website/Login';
import Register from '@/pages/website/Register';
import Search from '@/pages/website/Search';

import CompanyProvider from '@/contexts/api/CompanyContext';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebsiteLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/library',
        element: <Library />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/establishment/:id',
        element: <EstablishmentProvider><Establishment /></EstablishmentProvider>,
      },
      {
        path: '/search',
        element: <EstablishmentProvider><Search /></EstablishmentProvider>,
      },
      {
        path: '/company-register',
        element: <CompanyRegister />,
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
  {
    path: '/backoffice',
    element:
      <CompanyProvider>
        <EstablishmentProvider>
          <BackofficeLayout />
        </EstablishmentProvider>
      </CompanyProvider>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'establishments',
        element: <Employees />,
      },
      {
        path: 'establishments/create',
        element: <EstablishmentCreation />,
      },
      {
        path: '/backoffice/companies-validation',
        element: <CompaniesValidation />,
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;
