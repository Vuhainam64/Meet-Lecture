import { useEffect, useState } from "react";
import {
  getAllRequestByLecturerORStudentID,
  searchStudentById,
  searchSubjectById,
} from "../../api";
import moment from "moment";

export default function RequestLecturer({ id }) {
  const [requestedList, setRequestedList] = useState([]);
  const [showList, setShowList] = useState([]);

  async function fetchData() {
    const response = await getAllRequestByLecturerORStudentID(parseInt(id))
      .then((data) => setRequestedList(data))
      .catch((error) => console.log(error));
  }
  async function addObject() {
    const updatedRequestedList = await Promise.all(
      requestedList.map(async (infor) => {
        const response1 = await searchStudentById(infor.studentId);
        // Update the infor object with the response object in the studentId property
        infor.studentInfor = response1;
        // Update the infor object with the response object in the subjectId property
        const response2 = await searchSubjectById(infor.subjectId);
        infor.subjectInfor = response2;
        return infor; // Return the updated infor object
      })
    );
    // Updated array\
    setShowList(updatedRequestedList);
  }
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    addObject();
  }, [requestedList <= 0]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline pl-20">Request</span>
        </div>
        <div className="w-full flex flex-col gap-10">
          {showList &&
            showList.map((infor,index) => (
              <div key={index}className="w-full h-fit flex flex-row  p-5 border-gray-400 border-2 rounded-md min-h-[25%] justify-between gap-10">
                <div className="flex flex-col gap-5">
                  <div className="w-full flex flex-row gap-10">
                    <div className="text-lg">
                      {infor.studentInfor?.fullname}
                    </div>
                    <div className="text-lg">{infor.studentInfor?.email}</div>
                    <div className="text-lg">Course: {infor.subjectInfor?.subjectCode}</div>
                    <div className="text-lg">
                      Date: {moment(infor.createdAt).format("DD/MM/YY")}
                    </div>
                    <div className="text-lg">
                      Time: {moment(infor.createdAt).format("HH:mm")}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="text-lg">
                      Description: {infor.description}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="text-white bg-green-500 px-3 py-2 rounded-3xl">
                    Accept
                  </button>
                  <button className="text-white bg-red-500 px-3 py-2 rounded-3xl">
                    Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
