import { useState } from "react";
import {  Header } from "../layout";
import { Body, Booking, Feedback } from "../components/student";
import {  Route, Routes } from "react-router-dom";

function Student() { 
  const userId=2;
  return (
    <div className="bg-white h-full">
      <Header />
      <Routes>
        <Route path="*" element={<Body userId={userId}/>} />
        <Route path="Feedback/:infor" element={<Feedback userId={userId}/>}/>
        <Route path="Booking/:lecturerId" element={<Booking userId={userId}/>}/>
      </Routes>
    </div>
  );
}

export default Student;
