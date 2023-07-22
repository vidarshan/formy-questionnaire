import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./utils/AppRoutes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
};

export default App;
