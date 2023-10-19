import { useState } from "react";

export default function ShowBoxs({ childArray, lectureName }) {
  const [showInformations, setShowInformations] = useState(childArray);
  console.log(showInformations);

  return (
    <div className="w-full pb-10 right-0 left-0 gap-[5%] flex flex-row flex-wrap h-full">
      {showInformations ? (
        showInformations.map((infor) => (
          <div className="w-[30%] h-fit mt-[5%] flex flex-col justify-center gap-3 items-center px-10 py-3 border-orange-400 border-4 rounded-md min-h-[20%]">
            <span className="font-bold text-xl">{lectureName}</span>
            {infor.Course ? (
              <span className="text-xl">Course: {infor.Course}</span>
            ) : (
              <></>
            )}
            {infor.Location ? (
              <span className="text-xl">Location: {infor.Location}</span>
            ) : (
              <></>
            )}
            {infor.Time ? (
              <span className="text-xl">Time: {infor.Time}</span>
            ) : (
              <></>
            )}
            {infor.Date ? (
              <span className="text-xl">Date: {infor.Date}</span>
            ) : (
              <></>
            )}
            {infor.Limit ? (
              <span className="text-xl">Limit: {infor.Limit}</span>
            ) : (
              <></>
            )}
            <div className="w-full flex flex-row justify-center relative items-center gap-5">
              {infor.Finish?(<div className="absolute -left-4 bg-green-400 py-[0.3rem] px-[0.6rem] rounded-xl text-xs text-white">Finished</div>):(<></>)}
              <button
                className={`text-white  p-3 w-[8rem] rounded-3xl font-bold
            ${
              infor.Status === "Cancel"
                ? "bg-red-500"
                : infor.Status === "Booked"
                ? "bg-green-500"
                : infor.Status === "Book"
                ? "bg-blue-500"
                : infor.Status === "Feedback"
                ? "bg-blue-700"
                : "bg-black"
            }`}
              >
                {infor.Status}
              </button>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
