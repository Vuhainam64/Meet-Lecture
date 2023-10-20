import { useState } from "react";
import { Footer, Header } from "../layout";
import { Body, Feedback } from "../components/student";
import { Link, Route, Routes } from "react-router-dom";

function Student() { 
  const [page,chosePage]=useState('Home')
  return (
    <div className="bg-white h-full">
      <Header />
      <Routes>
        <Route path="*" element={<Body />} />
        <Route path="Feedback" element={<Feedback/>}/>
      </Routes>
    </div>
  );
}

export default Student;
