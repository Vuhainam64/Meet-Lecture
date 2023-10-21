import { NavLink, useParams } from "react-router-dom";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import moment from "moment";
export default function Feedback() {
  const  data  = useParams();
  console.log(data);
  const [inforDetail, setInforDetail] = useState({});
  const [lecturer, setLecturer] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (data) {
      const inforDetail = JSON.parse(decodeURIComponent(data.infor));
      console.log('infor');
      console.log(inforDetail);
      setInforDetail(inforDetail);
      setDate(moment(inforDetail.Date).format('yyyy-MM-dd'));
      setStartTime(inforDetail.Time);
      setEndTime(inforDetail.Time);
      setCourse(inforDetail.Course);
    }
  }, [data]);

  return (
    <div className="w-full  flex flex-col justify-center items-start gap-5 min-h-[90%] bg-white">
      <NavLink className="h-[10%]  font-bold flex flex-row gap-5 items-center" to="/student/History">
        <span className="text-4xl">
          <TbArrowBigLeftFilled />
        </span>{" "}
        <span className="text-2xl underline">History</span>
      </NavLink>
      <div className="w-full h-full flex flex-col justify-center items-center pb-10">
        <div className="w-[50%] h-fit mt-[5%] flex flex-col justify-center gap-3 items-start px-10 py-3 border-orange-400 border-4 rounded-md min-h-[20%]">
          <span className="font-semibold text-2xl mb-5">FEEDBACK FORM</span>
          <form className="w-[80%] mx-auto flex flex-col gap-5">
            <div className="flex flex-row w-full items-center">
              <span className="text-xl font-medium w-[30%]">Lecturer</span>
              <input
                className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
                type="text"
              ></input>
            </div>
            <div className="flex flex-row w-full items-center">
              <span className="text-xl font-medium w-[30%]">Course</span>
              <input
                className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
                type="text"
                value={course}
                onChange={(e)=>setCourse(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-row w-full items-center">
              <span className="text-xl font-medium w-[30%]">Date</span>
              <input
                className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
                type="date"
              ></input>
            </div>
            <div className="flex flex-row w-full items-center">
              <span className="text-xl font-medium w-[30%]">Time</span>
              <input
                className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
                type="text"
                placeholder="00:00-00:00"
                value={startTime}
                onChange={(e)=>setStartTime(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-row w-full items-start">
              <span className="text-xl font-medium w-[30%]">Description</span>
              <textarea className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[20rem] h-[7rem]"></textarea>
            </div>
          </form>
          <div className="flex flex-row  w-full items-center justify-end gap-10">
            <button className="text-white bg-red-500 px-3 py-2 rounded-xl border-black border-2">
              Cancel
            </button>
            <button className="text-white bg-green-500 px-3 py-2 rounded-xl border-black border-2">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
