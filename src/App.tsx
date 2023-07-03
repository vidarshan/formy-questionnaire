import {
  Button,
  Container,
  Flex,
  Text,
  ActionIcon,
  TextInput,
  Checkbox,
  Radio,
  Textarea,
  NumberInput,
} from "@mantine/core";
import React, { useEffect } from "react";
import { BiArrowBack, BiArrowToRight } from "react-icons/bi";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Conclusion from "./Conclusion";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAppSelector } from "./store/store";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./store/slices/authSlices";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAppSelector((state) => state.user);
  console.log("🚀 ~ file: App.tsx:25 ~ App ~ token:", token);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {token !== null ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conclusion" element={<Conclusion />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
