import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Conclusion from "./Conclusion";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAppSelector } from "./store/store";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./store/slices/authSlices";
import Questionnaire from "./pages/Questionnaire";
import AppRoutes from "./PrivateRoute";
import PrivateRoutes from "./PrivateRoute";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire/:id" element={<Questionnaire />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
