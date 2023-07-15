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
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Notifications } from "@mantine/notifications";
import Protected from "./utils/PrivateRoute";

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
            xs: "0",
          },
        }}
      >
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Protected>
                  <App />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
