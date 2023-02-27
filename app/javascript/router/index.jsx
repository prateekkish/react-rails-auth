import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Register from "../components/register/Register";
import Login from "../components/login/Login";

const ROOT_PATH = "/";
const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";

const AUTHENTICATED_ROUTES = [
  {
    path: ROOT_PATH, 
    Component: Dashboard 
  },
];

const AUTH_ROUTES = [
  {
    path: REGISTER_PATH,
    Component: Register,
  },
  {
    path: LOGIN_PATH,
    Component: Login,
  }
];

export const Router = () => {
  const { userLoggedIn } = useSelector((store) => store || {});

  return (
    <BrowserRouter>
      <Routes>
        {AUTHENTICATED_ROUTES.map(({ path, Component }) => (
          <Route
            exact
            element={ userLoggedIn ? <Component /> : <Navigate to={LOGIN_PATH} /> }
            key={path}
            path={path} />
        ))}
        {AUTH_ROUTES.map(({ path, Component }) => (
          <Route
            exact
            element={ userLoggedIn ? <Navigate to={ROOT_PATH} /> : <Component /> }
            key={path}
            path={path} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
