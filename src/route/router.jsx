import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from "../pages/Login";
import Register from "../pages/Register";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/hw4">
      <Route index element={<Login />} />
      <Route path="Reg" element={<Register />} />
    </Route>
  )
)

export default router;
