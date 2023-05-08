import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Logout from "../pages/Logout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/hw4">
      <Route index element={<Login />} />
      <Route path="Reg" element={<Register />} />
      <Route path="Home" element={<Home />} />
      <Route path="Logout" element={<Logout />} />
    </Route>
  )
)

export default router;
