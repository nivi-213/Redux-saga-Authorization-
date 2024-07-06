import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import RegisterForm from "./components/SignupForm";
import LoginForm from "./components/login/Login";
import Home from "./home/Home";
import AdminTable from "./table/Admintable";
import UserTable from "./table/Usertable";
import Layout from "./home/Layouts";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Calender from "./Calender/Calender";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/usertable" element={<UserTable />} />
          <Route path="/admintable" element={<AdminTable />} />

          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/calender" element={<Calender />} />

        </Route>
     
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
