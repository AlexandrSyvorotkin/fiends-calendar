import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { LoginPage } from './pages/login';
import { CalendarPage } from './pages/calendar';
import { RegisterPage } from './pages/register-page.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
