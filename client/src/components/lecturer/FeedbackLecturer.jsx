import { useEffect, useState } from "react";
import {
  getAllFeedBackByLecturer,
  searchTeacherById,
  searchBookingById,
  searchSlotById,
  searchSubjectById,
} from "../../api";
import moment from "moment";
export default function FeedbackLecturer({ id }) {
  const [requestedList, setRequestedList] = useState([]);
  const [showList, setShowList] = useState([]);

  async function fetchData() {
    const response = await getAllFeedBackByLecturer(parseInt(id))
      .then((data) => setRequestedList(data))
      .catch((error) => console.log(error));
  }
  async function addObject() {
    const updatedRequestedList = await Promise.all(
      requestedList.map(async (infor) => {
        const bookingInfor = await searchBookingById(infor.bookingId);
        const slotInfor = await searchSlotById(bookingInfor?.slotId);
        const subjectInfor = await searchSubjectById(bookingInfor?.subjectId);
        infor.bookingId = bookingInfor;
        infor.slot = slotInfor;
        infor.subject = subjectInfor;
        return infor; // Return the updated infor object
      })
    );
    // Updated array\
    setShowList(updatedRequestedList);
  }

  useEffect(() => {
    if (id) {
      fetchData();
      console.log(requestedList);
    }
  }, [id, requestedList <= 0]);
  useEffect(() => {
    addObject();
    console.log(showList);
  }, [requestedList <= 0]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline pl-20">FEEDBACK</span>
        </div>
        <div className="w-full flex flex-col gap-10">
          {showList &&
            showList.map((infor) => (
              <div className="w-full h-fit flex flex-col   p-5 border-gray-400 border-2 rounded-md min-h-[25%] justify-between gap-3">
                <div className="w-full flex flex-row gap-10">
                  <div className="text-lg">Title: {infor?.slot.title}</div>
                  <div className="text-lg">
                    Course: {infor?.subject.subjectCode}
                  </div>
                  <div className="text-lg">
                    Location: {infor?.slot.location}
                  </div>
                  <div className="text-lg">
                    Date: {moment(infor.createdAt).format("DD/MM/YY")}
                  </div>
                  <div className="text-lg">
                    Time: {moment(infor.slotId?.startDatetime).format("HH:mm")}-
                    {moment(infor.slotId?.endDatetime).format("HH:mm")}
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-lg">Description: {infor.comment}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
