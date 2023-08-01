import React from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./GuardedRoute";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Questionnaire from "../pages/Questionnaire";
import EditQuestionnaire from "../pages/EditQuestionnaire";
import Paper from "../pages/Paper";
import Completed from "../pages/Completed";
import Responses from "../pages/Responses";

interface AppRoutesProp {
  /**
   * True, if the user is authenticated, false otherwise.
   */
  isAuthenticated: boolean;
}

const ROOT_ROUTE = "/";
const HOME_ROUTE = "/home";
const QUESTIONNAIRE_ROUTE = "/questionnaire/:id";
const ANSWER_ROUTE = "/questionnaire/answer/:id";
const LOGIN_ROUTE = "/login";
const REGISTER_ROUTE = "/register";
const COMPLETED_ROUTE = "/completed";
const RESPONSES_ROUTE = "/responses/:id";

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
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<SignUp />} />
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
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={QUESTIONNAIRE_ROUTE} element={<Questionnaire />} />
        <Route path={ANSWER_ROUTE} element={<Paper />} />
        <Route path={COMPLETED_ROUTE} element={<Completed />} />
        <Route path={RESPONSES_ROUTE} element={<Responses />} />
      </Route>
      {/* Not found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
