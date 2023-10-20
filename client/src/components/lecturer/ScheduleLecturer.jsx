import { useState } from "react";

export default function ScheduleLecturer({ lectureName }) {
  const list = [
    {
      Number: "4/6",
      Location: "P.203",
      Date: "09/10/2003",
      Time: "15:00-17:15",
    },
    {
      Number: "4/6",
      Location: "P.137",
      Date: "10/10/2003",
      Time: "09:30-11:45",
    },
    {
      Number: "5/6",
      Location: "P.311",
      Date: "13/10/2003",
      Time: "07:30-09:15",
    },
    {
      Number: "2/6",
      Location: "P.220",
      Date: "14/10/2003",
      Time: "15:00-17:15",
    },
    {
      Number: "6/6",
      Location: "P.203",
      Date: "09/10/2003",
      Time: "15:00-17:15",
    },
    {
      Number: "1/6",
      Location: "P.137",
      Date: "10/10/2003",
      Time: "09:30-11:45",
    },
    {
      Number: "3/6",
      Location: "P.311",
      Date: "13/10/2003",
      Time: "07:30-09:15",
    },
  ];
  const [scheduleInfors,setScheduleInfors]=useState(list)
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">Schedule</span>
        </div>
        <div className="w-full flex justify-center items-center">
          <table className="w-fit">
            <thead>
              <tr>
                <th className="text-xl font-medium border-b-2 border-black border-r-2">
                  No.
                </th>
                <th className="text-xl font-medium border-b-2 border-black border-r-2">
                  Location
                </th>
                <th className="text-xl font-medium border-b-2 border-black  border-r-2">
                  Time
                </th>
                <th className="text-xl font-medium border-b-2 border-black ">
                  Number
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduleInfors ? (
                scheduleInfors.map((info, index) => (
                  <tr className="">
                    <td className="text-center px-16 text-lg p-2 border-black border-r-2">
                      {index + 1}
                    </td>
                    <td className="text-center px-16 text-lg p-2 border-black border-r-2">
                      {info.Location}
                    </td>
                    <td className="text-center px-16 text-lg p-2 border-black  border-r-2">
                      {info.Date + ", " + info.Time}
                    </td>
                    <td className="text-center px-16 text-lg p-2 border-black ">
                      {info.Number}
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
    </div>
  );
}
