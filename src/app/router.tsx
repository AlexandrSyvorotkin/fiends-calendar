import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/login-page";
import { RegisterPage } from "@/features/register-page";
import { CalendarPage } from "@/features/calendar-page";

export const router = createBrowserRouter([
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
