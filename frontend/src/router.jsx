import { createBrowserRouter } from 'react-router-dom';

import BackofficeLayout from '@/pages/__layouts/backofficeLayout';
import WebsiteLayout from '@/pages/__layouts/websiteLayout';

import ErrorPage from '@/pages/404.jsx';
import Library from '@/pages/Library';

import CompaniesValidation from '@/pages/backoffice/CompaniesValidation';
import Dashboard from '@/pages/backoffice/Dashboard/';
import Employees from '@/pages/backoffice/Employees';
import Users from '@/pages/backoffice/Users';
import EstablishmentCreation from '@/pages/backoffice/Establishments/EstablishmentCreation';
import EstablishmentUpdate from '@/pages/backoffice/Establishments/EstablishmentUpdate';
import EmployeeUpdate from '@/pages/backoffice/Employees/EmployeeUpdate';
import UserUpdate from '@/pages/backoffice/Users/UserUpdate';
import BackofficeEstablishments from '@/pages/backoffice/Establishments';
import FeedbackType from '@/pages/backoffice/FeedbackType';

import CompanyRegister from '@/pages/website/CompanyRegister';
import Establishment from '@/pages/website/Establishment';
import Home from '@/pages/website/Home';
import Login from '@/pages/website/Login';
import Profile from '@/pages/website/Profile';
import Register from '@/pages/website/Register';
import Reservation from '@/pages/website/Reservation';
import Search from '@/pages/website/Search';

import CompanyProvider from '@/contexts/api/CompanyContext';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';
import EmployeeProvider from '@/contexts/api/EmployeeContext';
import EstablishmentTypeProvider from './contexts/api/EstablishmentTypeContext';
import ServiceTypeProvider from './contexts/api/ServiceTypeContext';

import EmployeeCreation from '@/pages/backoffice/Employees/EmployeeCreation';
import UserCreation from '@/pages/backoffice/Users/UserCreation';
import ServiceProvider from '@/contexts/api/ServiceContext';
import AppointmentProvider from '@/contexts/api/AppointmentContext';
import UserProvider from './contexts/api/UserContext';

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
        element: <AppointmentProvider><EstablishmentProvider><Establishment /></EstablishmentProvider></AppointmentProvider>,
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
        path: '/reservation/:serviceEstablishmentId/:employeeId?',
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
        path: '/profile',
        element: <AppointmentProvider><Profile /></AppointmentProvider>,
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
        path: 'users',
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: 'create',
            element: <UserCreation />,
          },
          {
            path: ':id',
            element: <UserProvider><UserUpdate /></UserProvider>,
          },
        ],
      },
      {
        path: '/backoffice/companies-validation',
        element: <CompaniesValidation />,
      },
      {
        path: '/backoffice/feedbacks-type',
        element: <FeedbackType />,
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;
