import { createBrowserRouter } from 'react-router-dom';
import WebsiteLayout from '@/pages/__layouts/websiteLayout';
import BackofficeLayout from '@/pages/__layouts/backofficeLayout';
import Dashboard from '@/pages/backoffice/Dashboard/';
import Library from '@/pages/Library';
import ErrorPage from '@/pages/404.jsx';
import Home from '@/pages/website/Home';
import Login from '@/pages/website/Login';
import Register from '@/pages/website/Register';
import Establishment from '@/pages/website/Establishment';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';
import Search from '@/pages/website/Search';
import Employees from '@/pages/backoffice/Employees';
import CompanyRegister from '@/pages/website/CompanyRegister';
import CompaniesValidation from '@/pages/backoffice/CompaniesValidation';

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
    element: <BackofficeLayout />,
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
