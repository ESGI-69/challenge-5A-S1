import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/website/Home/Home.jsx';
import ErrorPage from '@/pages/404.jsx';
import WebsiteLayout from '@/pages/__layouts/websiteLayout';
import BackofficeLayout from '@/pages/__layouts/backofficeLayout';
import Dashboard from '@/pages/backoffice/Dashboard/Dashboard';
import Library from '@/pages/Library';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WebsiteLayout><Home /></WebsiteLayout>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/backoffice',
    element: <BackofficeLayout><Dashboard /></BackofficeLayout>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/library',
    element: <Library />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
