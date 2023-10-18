import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";

function App() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
