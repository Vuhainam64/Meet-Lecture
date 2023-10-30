
import { Footer, Header } from "../layout";
import { Link, Route, Routes } from "react-router-dom";
import { CreateRequestSlot, CreateSlotLecturer, UpdateSlotLecturer } from "../components/lecturer";
import Body from "../components/lecturer/Body";

export default function Lecturer() {

  return (
    <div className="bg-white h-full">
      <Header />
      <Routes>
        <Route path="*" element={<Body />} />
        <Route path="/create" element={<CreateSlotLecturer />} />
        <Route path="/update/:id" element={<UpdateSlotLecturer />} />
        <Route path="/CreateByRequest/:id" element={<CreateRequestSlot />} />
      </Routes>
    </div>
  );
}
