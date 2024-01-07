import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {routes} from './routes/Route'
import Header from "./components/Header";
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {
          routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
        }
      </Routes>
    </Router>
  );
};

export default App;
