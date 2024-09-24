import { useLayoutEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { routes } from "./routeConfig";

const Routes = () => {
  const location = useLocation();
  const pathname = location.pathname;
  useLayoutEffect(() => {
    document.body.className = `${pathname
      .substring(1)
      .replace(/\//gi, "_")}_screen`;
  }, [pathname]);

  return useRoutes(routes);
};

export default Routes;
