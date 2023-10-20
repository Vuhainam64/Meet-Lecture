import { useState } from "react";
import {TiTick,TiTimes} from "react-icons/ti"



export default function PendingLecturer({ lectureName }) {
  const list = [
    { ID: "SE171817", Name: "Phan Van Khai", Course: "SWP391", Location: "P.102", Time: "12:30-14:45", Date: "11/10/2023" },
    { ID: "SE172327", Name: "Tran Vinh Hoang", Course: "SWP391", Location: "P.203", Time: "15:00-17:15", Date: "09/10/2023" },
    { ID: "SE154887", Name: "Phan Van Khai", Course: "SWP391", Location: "P.105", Time: "09:30-11:45", Date: "07/10/2023" },
    { ID: "SE163254", Name: "Phan Van Khai", Course: "SWP391", Location: "P.309", Time: "09:30-11:45", Date: "06/10/2023" },
    { ID: "SE13521", Name: "Phan Van Khai", Course: "SWP391", Location: "P.309", Time: "09:30-11:45", Date: "06/10/2023" },
  ];
  const [bookedList,setBookedList]=useState(list)
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">Pending</span>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2  border-l-2">
                ID
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2 ">
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
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2">
                Accept
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-200 border-black border-b-2 border-t-2 border-r-2 ">
                Decline
              </th>
            </tr>
          </thead>
          <tbody>
            {bookedList ? (
              bookedList.map((info, index) => (
                <tr className="bg-gray-100">
                  <td className="text-center font-medium text-lg p-2 border-black border-l-2 border-b-2">
                    {info.ID}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.Name}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.Course}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.Location}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.Time}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-b-2">
                    {info.Date}
                  </td>
                  <td className="text-center font-medium text-4xl p-2 border-black border-b-2">
                    <button className=" text-white bg-green-400 rounded-full"><TiTick/></button>
                  </td>
                  <td className="text-center font-medium text-4xl  p-2 border-black  border-r-2 border-b-2">
                    <button className=" text-white bg-red-400 rounded-full"><TiTimes/></button>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
