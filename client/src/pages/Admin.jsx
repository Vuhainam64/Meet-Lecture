import { useState, useEffect } from "react";
import { Footer, Header } from "../layout";
import { getAllSubject, getAllUser, } from "../api";
import {
  AdminCreate,
  AdminListLecturer,
  AdminListStudents,
  AdminListCourse,
} from "../components/admin";
import { Route, Routes, Link } from "react-router-dom";
function Admin() {
  const [isUserAdded, setUserAdded] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, chosePage] = useState("Create");
  async function fetchData() {
    const response = await getAllUser()
      .then((result) => setUsers(result))
      .catch((error) => console.log(error));
    console.log(users);
  }
  async function fetchCourse() {
    const response = await getAllSubject()
      .then((result) => setCourseList(result))
      .catch((error) => console.log(error));
    console.log(users);
  }
  const filterStudent = () => {
    setStudentList(users.filter((ifo) => ifo.role === "Student"));
    console.log(studentList);
  };
  const filterLecturer = () => {
    setLecturerList(users.filter((ifo) => ifo.role === "Lecturer"));
    console.log(lecturerList);
  };
  useEffect(() => {
    if (users.length === 0 )
      fetchData();
     if(page!=='Course') {
      filterStudent();
      filterLecturer();
      setUserAdded(false);
    }else{
      fetchCourse();
    }
  }, [users, page]);
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
          <Link to="Course">
            <button
              className={` w-40 h-14 ${
                page === "Course" ? "bg-orange-300" : "bg-gray-300"
              }`}
              onClick={() => chosePage("Course")}
            >
              Course
            </button>
          </Link>
        </div>
        <div className="h-[90%]">
          <Routes>
            <Route path="*" element={<AdminCreate setUsers={setUsers} />} />
            <Route
              path="Lecturer"
              element={
                <AdminListLecturer
                  lecturers={lecturerList}
                  setUserAdded={setUserAdded}
                />
              }
            />
            <Route
              path="Student"
              element={
                <AdminListStudents students={studentList} setUsers={setUsers} />
              }
            />
            <Route
              path="Course"
              element={<AdminListCourse course={courseList} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
