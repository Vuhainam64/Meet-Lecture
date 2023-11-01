import { useEffect, useState } from "react";
import { ShowBoxs } from "./index";
import { getAllBookingByLecturerIDORStudentID, searchSlotById, searchStudentById, searchSubjectById } from "../../api";

export default function History({userId}) {
  const [bookedList, setBookedList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [slotArray,setSlotArray]=useState([]);
  const [refresh, setRefresh] = useState(true);
  console.log(userId);

  async function fetchData(studentId) {
    const response = await getAllBookingByLecturerIDORStudentID(
      parseInt(studentId)
    )
      .then((data) =>
        setBookedList(data.filter(booked=>booked.studentId===parseInt(studentId)&&booked.status!=='Pending'))
      )
      .catch((error) => console.log(error));
  }
  async function addObject() {
    setSlotArray([]); // Clear the slot array first
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
  
    const result=updatedRequestedList.filter(booked=>booked?.slotInfor?.bookingId.includes(booked.id)||booked.status==="Denied")
    const slots = result.map(item => ({...item.slotInfor, bookedId: item.id,denided:item.reason}));
    // Set the updatedRequestedList and slotArray after Promise.all is completed
    console.log('updated');
    console.log(updatedRequestedList);
    console.log("result");
    console.log(result);
    console.log("slot");
    console.log(slots);

    setShowList(updatedRequestedList);
    setSlotArray(slots);
  }
  useEffect(() => {
    if (refresh === true || userId) {
      fetchData(userId);
      console.log(bookedList);
      setRefresh(false);
      console.log('hello');
    }
  }, [refresh, userId]);
  
  useEffect(() => {
    // Call addObject() when bookedList changes
    addObject();
  }, [bookedList]);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs setRefresh={setRefresh} userId={userId} childArray={slotArray.filter((value, index, self) => self.map(obj => obj.id).indexOf(value.id) === index)} type="History"></ShowBoxs>
      </div>
    </div>
  );
}
