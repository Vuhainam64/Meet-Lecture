import { useState } from "react";
import { LuPencilLine, LuTrash2, LuPlusCircle } from "react-icons/lu";
import { Link,useNavigate   } from "react-router-dom";


export default function ShowBoxs({ childArray, lectureName, role ,Clicked}) {
  const [showInformations, setShowInformations] = useState(childArray);
  console.log(showInformations);
  const navigate = useNavigate();
function handleClick(e,infor){
  const key=e.target.value;
  console.log(key);
  if(key==="Feedback"){
    navigate('/student/Feedback/'+encodeURIComponent(JSON.stringify(infor)));
  }
}
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
              {infor.Finish ? (
                <div className="absolute -left-4 bg-green-400 py-[0.3rem] px-[0.6rem] rounded-xl text-xs text-white">
                  Finished
                </div>
              ) : (
                <></>
              )}
              {role && role === "Lecturer" ? (
                <Link to={`/Lecturer/Create/${encodeURIComponent(JSON.stringify(infor))}`}>
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
              infor.Status === "Cancel"
                ? "bg-red-500"
                : infor.Status === "Booked"
                ? "bg-green-500"
                : infor.Status === "Book"
                ? "bg-blue-500"
                : infor.Status === "Feedback"
                ? "bg-blue-700"
                : infor.Status === "Private"
                ? "bg-red-500"
                : infor.Status === "Public"
                ? "bg-blue-400"
                : "bg-black"
            }`}
            value={infor.Status}
            onClick={(e)=>handleClick(e,infor)}
              >
                {infor.Status}
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
        ))
      ) : (
        <></>
      )}
      {role && role === "Lecturer" ? (
        <Link to="/Lecturer/Create" className="w-[30%] mt-[5%] justify-center px-10 py-3 min-h-[20%] items-center flex text-9xl text-gray-400">
        <button >
          <LuPlusCircle />
        </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
