import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import MarketplaceViews from "./views/MarketplaceViews";
import LoginPage from "./component/LoginPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          {/* Use PrivateRoute for routes that require authentication */}
          <Route path="/marketplace" element={<PrivateRoute />}>
            <Route element={<MarketplaceViews />} path="/marketplace" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
