import { type RouteObject, Navigate } from "react-router-dom";
import { RouteConfigExtended } from "react-router-title";
import Champions from "@/pages/champions";
import SynergyPage from "@/pages/synergy";

type RouteConfig = {
  title: string;
} & RouteConfigExtended &
  RouteObject;

export const routes: RouteConfig[] = [
  {
    title: "",
    path: "/",
    element: <Navigate to="/champions" />,
  },
  {
    title: "英雄",
    path: "/champions",
    element: <Champions />,
  },
  {
    title: "羁绊",
    path: "/synergy",
    element: <SynergyPage />,
  },
];
