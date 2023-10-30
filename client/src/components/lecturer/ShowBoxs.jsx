import { useEffect, useState } from "react";
import { LuPencilLine, LuTrash2, LuPlusCircle, LuLock } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { deleteSlotById } from "../../api";
import Popup from "reactjs-popup";
export default function ShowBoxs({ childArray,setRefresh }) {
  const [showInformations, setShowInformations] = useState(childArray);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteHolder, setDeleteHolder] = useState("");
  const closeModal = () => {
    setOpenDelete(false);
    setDeleteHolder(0);
  };
  async function handleDeleteYes() {
    try {
      const response = await deleteSlotById(parseInt(deleteHolder));
      setRefresh(true);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(id) {
    setOpenDelete((open) => !open);
    setDeleteHolder(id);
  }

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
      {showInformations && showInformations.length === 0 && (
        <div className="w-full font-bold text-2xl">
          THERE ARE NO SLOT HERE!!!!
        </div>
      )}
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
                Date: {moment(infor.startDatetime).format("DD/MM/YYYY")}
              </span>
            )}
            {infor.limitBooking && (
              <span className="text-xl">
                Limit: {infor.bookingId.length}/{infor.limitBooking}
              </span>
            )}
            <div className="w-full flex flex-row justify-center relative items-center gap-5">
              {infor.Finish ? (
                <div className="absolute -left-4 bg-green-400 py-[0.3rem] px-[0.6rem] rounded-xl text-xs text-white">
                  Finished
                </div>
              ) : (
                <></>
              )}
              <Link to={`/Lecturer/Update/${infor.id}`}>
                <button className="text-3xl">
                  <LuPencilLine />
                </button>
              </Link>
              <button
                className={`text-white  p-3 w-[8rem] rounded-3xl font-bold
            ${
              infor.mode === "Private"
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
              <button
                className="text-3xl"
                onClick={() => handleDelete(infor.id)}
              >
                <LuTrash2 />
              </button>
            </div>
          </div>
        ))}
      <Link
        to={`/Lecturer/Create`}
        className="w-[30%] mt-[5%] justify-center px-10 py-3 min-h-[20%] items-center flex text-9xl text-gray-400"
      >
        <button>
          <LuPlusCircle />
        </button>
      </Link>
      <Popup open={openDelete} closeOnDocumentClick onClose={closeModal}>
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
