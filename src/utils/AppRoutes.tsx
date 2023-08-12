import React from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./GuardedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Questionnaire from "../pages/Questionnaire";
import Paper from "../pages/Paper";
import Completed from "../pages/Completed";
import Responses from "../pages/Responses";

interface AppRoutesProp {
  isAuthenticated: boolean;
}

const ROOT_ROUTE = "/";
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
      <Route path={ANSWER_ROUTE} element={<Paper />} />
      <Route path={COMPLETED_ROUTE} element={<Completed />} />
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={!isAuthenticated}
            redirectRoute={ROOT_ROUTE}
          />
        }
      >
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<SignUp />} />
      </Route>
      <Route
        element={
          <GuardedRoute
            isRouteAccessible={isAuthenticated}
            redirectRoute={LOGIN_ROUTE}
          />
        }
      >
        <Route path={ROOT_ROUTE} element={<Home />} />
        <Route path={QUESTIONNAIRE_ROUTE} element={<Questionnaire />} />
        <Route path={RESPONSES_ROUTE} element={<Responses />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
