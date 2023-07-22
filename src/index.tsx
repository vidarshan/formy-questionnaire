import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Notifications } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        theme={{
          colorScheme: "light",
          colors: {
            deep: ["#FD7E14"],
          },
          radius: {
            xs: "0",
          },
        }}
      >
        <App />
        <Notifications />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
