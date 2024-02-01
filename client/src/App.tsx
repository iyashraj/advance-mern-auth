import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes/Route";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import PrivateRoutes from "./components/PrivateRoutes";

const App: React.FC = () => {
  
  const renderRoutes = () => {
    return routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));
  };

  return (
    <Router>
      <Header />
      <Routes>
        {renderRoutes()}
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
