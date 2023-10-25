import { createBrowserRouter } from 'react-router-dom';
import WebsiteLayout from '@/pages/__layouts/websiteLayout';
import BackofficeLayout from '@/pages/__layouts/backofficeLayout';
import Dashboard from '@/pages/backoffice/Dashboard/';
import Library from '@/pages/Library';
import ErrorPage from '@/pages/404.jsx';
import Home from '@/pages/website/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebsiteLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/library',
        element: <Library />,
        errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
