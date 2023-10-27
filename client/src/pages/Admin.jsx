import { useState,useEffect } from "react";
import { Footer, Header } from "../layout";
import {
  AdminCreate,
  AdminListLecturer,
  AdminListStudents,
} from "../components/admin";
import { Route, Routes,Link } from "react-router-dom";
function Admin() {
  const [studentList, getStudentList] = useState([]);
  const [lecturerList, getLecturerList] = useState([]);
  const [page, chosePage] = useState("Create");

  return (
    <div className="bg-white h-full">
      <Header />
      <div className="min-h-[80%] flex flex-col bg-white">
        <div className="flex flex-row h-[10%]">
          <Link to="*">
            <button
              className={` w-40 h-14 ${
                page === "Create" ? "bg-orange-300" : "bg-gray-300"
              }`}
              onClick={() => chosePage("Create")}
            >
              Create
            </button>
          </Link>
          <Link to="Lecturer">
            <button
              className={` w-40 h-14 ${
                page === "Lecturer" ? "bg-orange-300" : "bg-gray-300"
              }`}
              onClick={() => chosePage("Lecturer")}
            >
              Lecturer
            </button>
          </Link>
          <Link to="Student">
            <button
              className={` w-40 h-14 ${
                page === "Student" ? "bg-orange-300" : "bg-gray-300"
              }`}
              onClick={() => chosePage("Student")}
            >
              Student
            </button>
          </Link>
        </div>
        <div className="h-[90%]">
          <Routes>
            <Route path="*" element={<AdminCreate />} />
            <Route path="Lecturer" element={<AdminListLecturer downloadData='true'/>} />
            <Route path="Student" element={<AdminListStudents downloadData='true'/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
