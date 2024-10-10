import { type RouteObject, Navigate } from "react-router-dom";
import { RouteConfigExtended } from "react-router-title";
import SimulatorPage from "./pages/simulator";

type RouteConfig = {
  title: string;
} & RouteConfigExtended &
  RouteObject;

export const routes: RouteConfig[] = [
  {
    title: "",
    path: "/",
    element: <Navigate to="/simulator" />,
  },
  {
    title: "计算器",
    path: "/simulator",
    element: <SimulatorPage />,
  },
];
