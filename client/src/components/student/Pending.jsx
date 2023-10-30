import {
  searchStudentById,
  searchSubjectById,
  searchSlotById,
  getAllBookingByLecturerIDORStudentID,
} from "../../api";
import { Requested, ShowBoxs } from "./index";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Pending() {
  const [bookedList, setBookedList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [slotArray,setSlotArray]=useState([]);
  const [route, setRoute] = useState("Booked");
  const [refesh, setRefesh] = useState(true);
  const studentId = 2;
  async function fetchData(studentId) {
    const response = await getAllBookingByLecturerIDORStudentID(
      parseInt(studentId)
    )
      .then((data) =>
        setBookedList(data.filter(booked=>booked.studentId===studentId))
      )
      .catch((error) => console.log(error));
  }
  async function addObject() {
    const updatedRequestedList = await Promise.all(
      bookedList.map(async (infor) => {
        const studentInfor = await searchStudentById(infor.studentId);
        const subjectInfor = await searchSubjectById(infor.subjectId);
        const slotInfor = await searchSlotById(infor.slotId);
        // Update the infor object with the response object in the studentId property
        infor.studentInfor = studentInfor;
        // Update the infor object with the response object in the subjectId property
        infor.subjectInfor = subjectInfor;
        // Update the infor object with the response object in the slotId property
        infor.slotInfor = slotInfor;
        return infor; // Return the updated infor object
      })
    );
    // Updated array\
    const slots=updatedRequestedList.map(item => item.slotInfor);
    setShowList(updatedRequestedList);
    setSlotArray(slots)
  }
  useEffect(() => {
    if (refesh===true||studentId) {
      fetchData(studentId);
      console.log(bookedList);
      addObject();
    }
  }, [refesh,studentId, bookedList <= 0]);
  // useEffect(() => {
  
  //   console.log(showList);
  // }, [bookedList <= 0]);
  console.log('booking');
  console.log(bookedList);
  console.log(showList);
  console.log('slot');
  console.log(slotArray);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-full">
        <button
          onClick={() => setRoute("Booked")}
          className={` w-40 h-14 ${
            route === "Booked" ? "bg-orange-300" : "bg-gray-300"
          }`}
        >
          Booked
        </button>
        <button
          onClick={() => setRoute("Requested")}
          className={` w-40 h-14 ${
            route === "Requested" ? "bg-orange-300" : "bg-gray-300"
          }`}
        >
          Requested
        </button>
      </div>
      <div className="w-full ">
        {route === "Booked" ? (
          <ShowBoxs childArray={slotArray}></ShowBoxs>
        ) : (
          <Requested id={studentId}></Requested>
        )}
      </div>
    </div>
  );
}
