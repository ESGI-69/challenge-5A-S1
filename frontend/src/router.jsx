import { createBrowserRouter } from 'react-router-dom';

import BackofficeLayout from '@/pages/__layouts/backofficeLayout';
import WebsiteLayout from '@/pages/__layouts/websiteLayout';

import ErrorPage from '@/pages/404.jsx';
import Library from '@/pages/Library';

import CompaniesValidation from '@/pages/backoffice/CompaniesValidation';
import Dashboard from '@/pages/backoffice/Dashboard/';
import Employees from '@/pages/backoffice/Employees';
import EstablishmentCreation from '@/pages/backoffice/Establishments/EstablishmentCreation';
import EstablishmentUpdate from '@/pages/backoffice/Establishments/EstablishmentUpdate';
import EmployeeUpdate from '@/pages/backoffice/Employees/EmployeeUpdate';
import BackofficeEstablishments from '@/pages/backoffice/Establishments';

import CompanyRegister from '@/pages/website/CompanyRegister';
import Establishment from '@/pages/website/Establishment';
import Home from '@/pages/website/Home';
import Login from '@/pages/website/Login';
import Register from '@/pages/website/Register';
import Search from '@/pages/website/Search';
import Reservation from '@/pages/website/Reservation';

import CompanyProvider from '@/contexts/api/CompanyContext';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';
import EmployeeProvider from '@/contexts/api/EmployeeContext';
import EstablishmentTypeProvider from './contexts/api/EstablishmentTypeContext';
import ServiceTypeProvider from './contexts/api/ServiceTypeContext';
import FeedbackProvider from './contexts/api/FeedbackContext';

import EmployeeCreation from '@/pages/backoffice/Employees/EmployeeCreation';
import ServiceProvider from '@/contexts/api/ServiceContext';
import AppointmentProvider from '@/contexts/api/AppointmentContext';

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
        element: <AppointmentProvider><EstablishmentProvider><FeedbackProvider><Establishment /></FeedbackProvider></EstablishmentProvider></AppointmentProvider>,
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
        path: '/reservation/:serviceEstablishmentId',
        element:
        <ServiceProvider>
          <AppointmentProvider>
            <EstablishmentProvider>
              <Reservation/>
            </EstablishmentProvider>
          </AppointmentProvider>
        </ServiceProvider>,
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
        children: [
          {
            index: true,
            element: <BackofficeEstablishments />,
          },
          {
            path: 'create',
            element: <EstablishmentCreation />,
          },
          {
            path: ':id',
            element:
              <ServiceTypeProvider>
                <EstablishmentTypeProvider>
                  <EstablishmentProvider>
                    <EstablishmentUpdate />
                  </EstablishmentProvider>
                </EstablishmentTypeProvider>
              </ServiceTypeProvider>,
          },
        ],
      },
      {
        path: 'employees',
        children: [
          {
            index: true,
            element: <Employees />,
          },
          {
            path: 'create',
            element: <EmployeeCreation />,
          },
          {
            path: ':id',
            element: <EmployeeProvider><EmployeeUpdate /></EmployeeProvider>,
          },
        ],
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
