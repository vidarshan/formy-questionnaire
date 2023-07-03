import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Conclusion from "./Conclusion";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          colors: {
            deep: ["#FD7E14"],
          },
          radius: {
            xs: 0,
          },
        }}
      >
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
