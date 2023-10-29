import { useEffect, useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import {
  searchStudentById,
  searchSubjectById,
  searchSlotById,
  getAllBookingByLecturerIDORStudentID,
  updateSlotById,
} from "../../api";
import moment from "moment";
import Popup from "reactjs-popup";

export default function PendingLecturer({ id }) {
  const [bookedList, setBookedList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [formData, setFormData] = useState({});
  const [formId, setFormId] = useState(0);
  const [popup, setPopup] = useState(false);

  const closeModal = () => {
    setPopup(false);
    setFormData({});
    setFormId(0)
  };
  async function fetchData() {
    const response = await getAllBookingByLecturerIDORStudentID(parseInt(id))
      .then((data) =>
        setBookedList(data.filter((data) => data.status === "Pending"))
      )
      .catch((error) => console.log(error));
  }

  async function makePutData(form, id) {
    try {
      const response = await updateSlotById(form, id);
    } catch {}
  }
  async function handleAccpet(id) {
    const data = bookedList.find((book) => book.id === id);
    setFormData({
      studentId: parseInt(data.studentId),
      slotId: parseInt(data.slotId),
      subjectId: parseInt(data.subjectId),
      description: data.description,
      reason: (data.reason===null?"":data.reason),
      status: "Booked",
    });
    setFormId(data.id)
    setPopup(true);

    console.log(data.id);
  }

  async function handleDeleteYes() {
    console.log(formData);
    await makePutData(formData, formId);
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
      fetchData();
      console.log(bookedList);
    }
  }, [id, bookedList <= 0]);
  useEffect(() => {
    addObject();
    console.log(showList);
  }, [bookedList <= 0]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">Pending</span>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2 border-l-2">
                Name
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2">
                Course
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2">
                Location
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2">
                Time
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2">
                Date
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2  ">
                Description
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2">
                Accept
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2 border-r-2 ">
                Decline
              </th>
            </tr>
          </thead>
          <tbody>
            {showList &&
              showList.map((info, index) => (
                <tr className="bg-gray-100">
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2 border-l-2 ">
                    {info.studentId?.fullname}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.subjectId?.subjectCode}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.slotId?.location}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {moment(info.slotId?.startDatetime).format("HH:mm")}-
                    {moment(info.slotId?.endDatetime).format("HH:mm")}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {moment(info.slotId?.startDatetime).format("DD/MM/YY")}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2 max-w-[15rem]  min-w-[15rem]">
                    {info.description}
                  </td>
                  <td className="text-center font-medium text-4xl p-2 border-black border-b-2">
                    <button
                      className=" text-white bg-green-400 rounded-full"
                      onClick={() => handleAccpet(info.id)}
                    >
                      <TiTick />
                    </button>
                  </td>
                  <td className="text-center font-medium text-4xl  p-2 border-black  border-r-2 border-b-2">
                    <button className=" text-white bg-red-400 rounded-full">
                      <TiTimes />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Popup up */}
      <Popup open={popup} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <div className="header font-bold text-xl">
            {" "}
            Are you sure want to delete this course!!!
          </div>
          <div className="flex flex-row justify-center items-center h-[5rem] gap-20">
            <button
              className="w-[25%] text-base border rounded-xl p-2 border-black font-medium bg-green-500"
              onClick={handleDeleteYes}
            >
              Yes, Im sure!!!
            </button>
            <button
              className="w-[25%] text-base border rounded-xl p-2 border-black font-medium bg-red-500"
              onClick={closeModal}
            >
              No, Im not.
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
