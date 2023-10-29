import { useState } from "react";
import {  Header } from "../layout";
import { Body, Booking, Feedback } from "../components/student";
import {  Route, Routes } from "react-router-dom";

function Student() { 
  return (
    <div className="bg-white h-full">
      <Header />
      <Routes>
        <Route path="*" element={<Body />} />
        <Route path="Feedback/:infor" element={<Feedback/>}/>
        <Route path="Booking/:lecturerId" element={<Booking/>}/>
      </Routes>
    </div>
  );
}

export default Student;
