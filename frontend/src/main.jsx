import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/index.css';
import '@/i18n';
import router from '@/router';
import ProfileProvider from '@/contexts/ProfileContext';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <ProfileProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ProfileProvider>
    </React.Suspense>
  </React.StrictMode>,
);
