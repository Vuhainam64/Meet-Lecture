
import { Footer, Header } from "../layout";
import { Link, Route, Routes } from "react-router-dom";
import { CreateSlotLecturer } from "../components/lecturer";
import Body from "../components/lecturer/Body";

export default function Lecturer() {

  return (
    <div className="bg-white h-full">
      <Header />
      <Routes>
        <Route path="*" element={<Body />} />
        <Route path="/Create/:infor" element={<CreateSlotLecturer />} />
      </Routes>
    </div>
  );
}
