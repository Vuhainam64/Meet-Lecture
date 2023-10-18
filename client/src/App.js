import { Navigate, Route, Routes } from "react-router-dom";
import { Student, Login } from "./pages";

function App() {
  return (
    <div className="bg-white h-full">
      <Routes>
        <Route path="/Student/*" element={<Student />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
