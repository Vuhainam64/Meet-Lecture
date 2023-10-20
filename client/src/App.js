import { Navigate, Route, Routes } from "react-router-dom";
import { Student, Login,Admin,Lecturer } from "./pages";
import { CreateSlotLecturer } from "./components/lecturer";

function App() {
  return (
    <div className="bg-white h-full">
      <Routes>
        <Route path="/Student/*" element={<Student />} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/Lecturer/*" element={<Lecturer />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
