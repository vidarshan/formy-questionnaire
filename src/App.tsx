import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/store";
import { getUserInfo } from "./store/slices/authSlices";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes isAuthenticated={token === null ? false : true} />
    </BrowserRouter>
  );
};

export default App;
