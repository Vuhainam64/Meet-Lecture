import {
  searchStudentById,
  searchSubjectById,
  searchSlotById,
  getAllBookingByLecturerIDORStudentID,
} from "../../api";
import { ShowBoxs } from "../styles";
import { useEffect, useState } from "react";

export default function Pending() {
  const [bookedList, setBookedList] = useState([]);
  const [showList, setShowList] = useState([]);
  const id=2;
  async function fetchData(studentId) {
    const response = await getAllBookingByLecturerIDORStudentID(parseInt(studentId))
      .then((data) =>
        setBookedList(data.filter((data) => data.status === "Pending"))
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
        infor.studentId = studentInfor;
        // Update the infor object with the response object in the subjectId property
        infor.subjectId = subjectInfor;
        // Update the infor object with the response object in the slotId property
        infor.slotId = slotInfor;
        return infor; // Return the updated infor object
      })
    );
    // Updated array\
    setShowList(updatedRequestedList);
  }
  useEffect(() => {
    if (id) {
      fetchData(id);
      console.log(bookedList);
    }
  }, [id, bookedList <= 0]);
  useEffect(() => {
    addObject();
    console.log(showList);
  }, [bookedList <= 0]);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs childArray={bookedList} role='Student'></ShowBoxs>
      </div>
    </div>
  );
}
