import { useState,useEffect } from "react";
import { Footer, Header } from "../layout";
import { getAllUser } from "../api";
import {
  AdminCreate,
  AdminListLecturer,
  AdminListStudents,
} from "../components/admin";
import { Route, Routes,Link } from "react-router-dom";
function Admin() {
  const [studentList, getStudentList] = useState([]);
  const [lecturerList, getLecturerList] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, chosePage] = useState("Create");
 async function fetchData () {
    const response=await getAllUser()
      .then((result) => setUsers(result))
      .catch((error) => console.log(error));
    console.log(users);
  };
  const filterStudent=()=>{
    getStudentList(users.filter((ifo) => ifo.role === "Student"));
    console.log(studentList);
  }
  const filterLecturer=()=>{
    getLecturerList(users.filter((ifo) => ifo.role === "Lecturer"));
    console.log(lecturerList);
  }
  useEffect(() => {
    fetchData();
    filterStudent();
    filterLecturer();
  }, [users.length===0]);

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
            <Route path="Lecturer" element={<AdminListLecturer lecturers={lecturerList}  setUsers={setUsers}/>} />
            <Route path="Student" element={<AdminListStudents students={studentList} setUsers={setUsers}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
