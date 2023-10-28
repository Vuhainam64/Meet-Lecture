import { useEffect, useState } from "react";
import { LuPencilLine, LuTrash2, LuPlusCircle, LuLock } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
export default function ShowBoxs({ childArray, role }) {
  const [showInformations, setShowInformations] = useState(childArray);
  useEffect(() => {
    setShowInformations(childArray);
  }, [childArray]);
  console.log(showInformations);
  const navigate = useNavigate();

  function handleClick(e, infor) {
    const key = e.target.value;
    console.log(key);
    if (key === "Feedback") {
      navigate(
        "/student/Feedback/" + encodeURIComponent(JSON.stringify(infor))
      );
    }
  }
  return (
    <div className="w-full pb-10 right-0 left-0 gap-[5%] flex flex-row flex-wrap h-full relative">
      {showInformations &&
        showInformations.map((infor) => (
          <div className="relative w-[30%] h-fit mt-[5%] flex flex-col justify-center gap-3 items-start px-10 py-3 border-orange-400 border-4 rounded-md min-h-[20%]">
            {infor.code && (
              <div className="absolute top-0 right-0 text-3xl p-2">
                <LuLock />
              </div>
            )}
            {infor.title && (
              <span className="font-bold text-xl w-full flex justify-center">
                {infor.title}
              </span>
            )}
            {infor.Course && (
              <span className="text-xl">Course: {infor.Course}</span>
            )}
            {infor.location && (
              <span className="text-xl">Location: {infor.location}</span>
            )}
            {infor.startDatetime && infor.endDatetime && (
              <span className="text-xl">
                Time: {moment(infor.startDatetime).format("HH:mm")}-
                {moment(infor.endDatetime).format("HH:mm")}
              </span>
            )}
            {infor.startDatetime && (
              <span className="text-xl">
                Date: {moment(infor.startDatetime).format("DD/MM/YY")}
              </span>
            )}
            {infor.limitBooking && (
              <span className="text-xl">Limit: {infor.limitBooking}/6</span>
            )}
            <div className="w-full flex flex-row justify-center relative items-center gap-5">
              {infor.Finish ? (
                <div className="absolute -left-4 bg-green-400 py-[0.3rem] px-[0.6rem] rounded-xl text-xs text-white">
                  Finished
                </div>
              ) : (
                <></>
              )}
              {role && role === "Lecturer" ? (
                <Link
                  to={`/Lecturer/Create/${infor.id}`}
                >
                  <button className="text-3xl">
                    <LuPencilLine />
                  </button>
                </Link>
              ) : (
                <></>
              )}
              <button
                className={`text-white  p-3 w-[8rem] rounded-3xl font-bold
            ${
              infor.mode === "Cancel"
                ? "bg-red-500"
                : infor.mode === "Booked"
                ? "bg-green-500"
                : infor.mode === "Book"
                ? "bg-blue-500"
                : infor.mode === "Feedback"
                ? "bg-blue-700"
                : infor.mode === "Private"
                ? "bg-red-500"
                : infor.mode === "Public"
                ? "bg-blue-400"
                : "bg-black"
            }`}
                value={infor.mode}
                onClick={(e) => handleClick(e, infor)}
              >
                {infor.mode}
              </button>
              {role && role === "Lecturer" ? (
                <button className="text-3xl">
                  <LuTrash2 />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      {role && role === "Lecturer" ? (
        <Link
        to={`/Lecturer/Create/0`}
          className="w-[30%] mt-[5%] justify-center px-10 py-3 min-h-[20%] items-center flex text-9xl text-gray-400"
        >
          <button>
            <LuPlusCircle />
          </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
