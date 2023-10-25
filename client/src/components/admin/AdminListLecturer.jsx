import { useEffect, useState } from "react";
import moment from "moment";
export default function AdminListLecturer({lecturers}) {
  const [lecturerList, getLecturerList] = useState(lecturers);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">
            List of Lecturers: {lecturerList&&lecturerList.length}
          </span>
        </div>
        <div className="">
          <form className="flex flex-row gap-10 px-10">
            <input
              placeholder="Name"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[20%] text-center p-2"
            ></input>
            <input
              placeholder="ID"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[5%] text-center p-2"
            ></input>
            <input
              placeholder="Username"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[15%] text-center p-2"
            ></input>
            <input
              placeholder="Password"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[15%] text-center p-2"
            ></input>
            <input
              placeholder="Email"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[20%] text-center p-2"
            ></input>
            <button className="bg-orange-400 text-white rounded-3xl w-fit px-5">
              Search
            </button>
          </form>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                No.
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Name
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                ID
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Date of Birth
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Username
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Password
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black ">
                Email
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lecturerList &&
              lecturerList.map((info, index) => (
                <tr className="bg-gray-200" key={info.id}>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {index + 1}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.fullname}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.id}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {moment(info.dob).format("DD/MM/YY")}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.username}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.password}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.email}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    <button className="  text-gray-500">Update</button>
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    <button className="  text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
