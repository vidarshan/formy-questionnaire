import React from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./GuardedRoute";
import Landing from "../pages/Landing";

interface AppRoutesProp {
  /**
   * True, if the user is authenticated, false otherwise.
   */
  isAuthenticated: boolean;
}

const ROOT_ROUTE = "/";
const HOME_ROUTE = "/home";
const LOGIN_ROUTE = "/login";

const AppRoutes = (props: AppRoutesProp): JSX.Element => {
  const { isAuthenticated } = props;

  return (
    <Routes>
      {/* Unguarded Routes */}
      <Route path={ROOT_ROUTE} element={<Landing />} />
      {/* Non-Authenticated Routes: accessible only if user in not authenticated */}
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={!isAuthenticated}
            redirectRoute={HOME_ROUTE}
          />
        }
      >
        {/* Login Route */}
        <Route path={LOGIN_ROUTE} element={<p>Login Page</p>} />
      </Route>
      {/* Authenticated Routes */}
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={isAuthenticated}
            redirectRoute={LOGIN_ROUTE}
          />
        }
      >
        <Route path={HOME_ROUTE} element={<p>Home Page</p>} />
      </Route>
      {/* Not found Route */}
      <Route path="*" element={<p>Page Not Found</p>} />
    </Routes>
  );
};

export default AppRoutes;
