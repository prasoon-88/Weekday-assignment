import { lazy } from "react";

export const ROUTES = [
  {
    path: "/",
    element: lazy(() => import("../pages/home")),
  },
];
