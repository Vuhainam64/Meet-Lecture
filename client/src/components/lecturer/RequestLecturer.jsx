import { useEffect, useState } from "react";
import { getAllRequestByLecturerORStudentID } from "../../api";
import moment from "moment";

export default function RequestLecturer({ id }) {
  const list = [
    {
      ID: "SE171817",
      Name: "Phan Van Khai",
      Course: "SWP391",
      Description:
        "I have some problem on my project but I don’t have time to go to school. I hope you can help me at that time at your home ",
      Time: "12:30-14:45",
      Date: "11/10/2023",
    },
    {
      ID: "SE172327",
      Name: "Tran Vinh Hoang",
      Course: "SWP391",
      Description:
        "Today I have a little problem that I want to meet with you to get an answer but I can't find you. I hope to see you that day.   ",
      Time: "15:00-17:15",
      Date: "09/10/2023",
    },
    {
      ID: "SE154887",
      Name: "Phan Van Khai",
      Course: "SWP391",
      Description:
        "I have some problem on my project but I don’t have time to go to school. I hope you can help me at that time at your home ",
      Time: "09:30-11:45",
      Date: "07/10/2023",
    },
    {
      ID: "SE163254",
      Name: "Phan Van Khai",
      Course: "SWP391",
      Description:
        "Today I have a little problem that I want to meet with you to get an answer but I can't find you. I hope to see you that day.   ",
      Time: "09:30-11:45",
      Date: "06/10/2023",
    },
    {
      ID: "SE13521",
      Name: "Phan Van Khai",
      Course: "SWP391",
      Description:
        "Today I have a little problem that I want to meet with you to get an answer but I can't find you. I hope to see you that day.And I have some problem on my project but I don’t have time to go to school. I hope you can help me at that time at your home ",
      Time: "09:30-11:45",
      Date: "06/10/2023",
    },
  ];
  const [requestedList, setRequestedList] = useState([]);

  async function fetchData() {
    const response = await getAllRequestByLecturerORStudentID(parseInt(id))
      .then((data) => setRequestedList(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (id) fetchData();
    console.log("request list");
    console.log(requestedList);
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline pl-20">Request</span>
        </div>
        <div className="w-full flex flex-col gap-10">
          {requestedList &&
            requestedList.map((infor) => (
              <div className="w-full h-fit flex flex-row  p-5 border-gray-400 border-2 rounded-md min-h-[25%] justify-between gap-10">
                <div className="flex flex-col gap-5">
                  <div className="w-full flex flex-row gap-10">
                    <div className="text-lg">{infor.Name}</div>
                    <div className="text-lg">{infor.ID}</div>
                    <div className="text-lg">Course: {infor.Course}</div>
                    <div className="text-lg">Date: {moment(infor.createdAt).format("DD/MM/YY")}</div>
                    <div className="text-lg">Time:  {moment(infor.createdAt).format("HH:mm")}</div>
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
