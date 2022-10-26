import { useEffect } from "react";
import { useQuery } from "react-query";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

const protected_routes = ["/customer/dashboard/*"];

export function useAuth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < protected_routes.length; i++) {
      console.log(protected_routes);
      if (matchPath(protected_routes[i], pathname)) {
        if (!sessionStorage.getItem("customer")) {
          navigate("/customer/login");
          return;
        }
      }
    }
  }, [pathname]);
}
