import { createBrowserRouter, redirect } from "react-router";
import { ROUTES } from "@/shared/model";
import App from "./App";
import { CalendarPage } from "@/features/calendar-page";
import { RegisterPage } from "@/features/auth";
import { LoginPage } from "@/features/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: ROUTES.CALENDAR,
        element: <CalendarPage/>,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage/>,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage/>,
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.LOGIN)
      }
    ],

  },

]);
