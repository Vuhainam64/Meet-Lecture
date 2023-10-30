import { useEffect, useState } from "react";
import { ShowBoxs } from "./index";
import { getAllBookingByLecturerIDORStudentID, searchSlotById, searchStudentById, searchSubjectById } from "../../api";

export default function History({id}) {
  const [bookedList, setBookedList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [slotArray,setSlotArray]=useState([]);
  const [refresh, setRefresh] = useState(false);

  async function fetchData(studentId) {
    const response = await getAllBookingByLecturerIDORStudentID(
      parseInt(studentId)
    )
      .then((data) =>
        setBookedList(data.filter(booked=>booked.studentId===studentId&&booked.status==='Success'))
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
    const slots= updatedRequestedList.map(item => ({...item.slotInfor,bookedId:item.id}));
    setShowList(updatedRequestedList);
    setSlotArray(slots)
  }
  useEffect(() => {
    if (refresh===true||id) {
      fetchData(id);
      console.log(bookedList);
      addObject();
      setRefresh(false)
    }
  }, [refresh,id, bookedList <= 0]);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs childArray={slotArray} lectureName="Chua co"></ShowBoxs>
      </div>
    </div>
  );
}
