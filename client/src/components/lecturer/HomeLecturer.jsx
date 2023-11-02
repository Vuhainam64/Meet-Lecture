
import { ShowBoxs } from "./index";
import { useEffect, useState } from "react";
import { getAllSlotByLecturerID, searchTeacherById } from "../../api";

export default function HomeLecturer({ userId }) {
  const [bookingRooms, setBookingRooms] = useState([]);
  const [showList, setShowList] = useState([]);

  const [refresh, setRefresh] = useState(false);
  async function fetchData() {
    const response = await getAllSlotByLecturerID(parseInt(userId))
      .then((data) => setBookingRooms(data.filter(slot=>slot.status!=="Unactive"&&slot.status!=="Finish")))
      .catch((error) => console.log(error));
  }
  async function addObject() {
    const updatedRequestedList = await Promise.all(
      bookingRooms.map(async (infor) => {
        const lecturerInfor = await searchTeacherById(infor.lecturerId);
        // Update the infor object with the response object in the studentId property
        infor.lecturerInfor = lecturerInfor;
        // Update the infor object with the response object in the subjectId property
        // Update the infor object with the response object in the slotId property
        return infor; // Return the updated infor object
      })
    );
    // Updated array
    setShowList(updatedRequestedList);
  }
  useEffect(() => {
    if(userId||refresh===true)
    fetchData();
    console.log("booking room");
    console.log(bookingRooms);
    setRefresh(false);
  }, [userId,refresh]);
  useEffect(() => {
    if(bookingRooms.length>0)
    addObject();
    console.log(showList);
  }, [bookingRooms]);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs
          childArray={showList}
          setRefresh={setRefresh}
          role="Lecturer"
        ></ShowBoxs>
      </div>
    </div>
  );
}
