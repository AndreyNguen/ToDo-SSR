import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import Navbar from "./Navbar";
import Task from "./Task";
import SignIn from "./userComponents/SignIn";
import SignUp from "./userComponents/SignUp";

export default function App({ allTasks, user }) {
  return (
    <>
      <div>
        <Navbar user={user} />
      </div>

      <Routes>
        <Route path="/" element={<Form user={user} allTasks={allTasks} />} />
        <Route path="/task" element={<Task user={user} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}
