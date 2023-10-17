import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./container";

function App() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
