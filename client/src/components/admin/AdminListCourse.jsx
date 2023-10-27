import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { LuPlusCircle } from "react-icons/lu";
import "../../cssstyles/popupStyles.css";
import { deleteAccountById } from "../../api";

export default function AdminListCourse({ course }) {
  const [courseList, setCourseList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [searchComponent, setSearchComponent] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteHolder, setDeleteHolder] = useState();

  const closeModal = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    setCourseList(course);
    setShowList(course);
    console.log(courseList);
  }, [course]);

  function searchHandleClick(e) {
    e.preventDefault();
    setShowList(
      courseList.filter((obj) =>
        obj.name.toLowerCase().includes(searchComponent.toLowerCase())
      )
    );
  }
  function handleDelete(lecturerId) {
    setOpenDelete((open) => !open);
    setDeleteHolder(lecturerId);
  }
  function handleCreate(e) {
    e.preventDefault();
    setOpenCreate((open) => !open);
  
  }
  async function handleDeleteYes() {
    if (deleteHolder) {
      try {
        console.log(deleteHolder);
        await deleteAccountById(deleteHolder);
        // If the deletion is successful, you can update the local state.
        setDeleteHolder(0);
        setOpenDelete(false);
      } catch (error) {
        // Handle the error
        console.error("Error deleting account:", error);
      }
    }
  }

  return (
    <div className="w-full max-w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">
            List of Course: {showList && showList.length}
          </span>
        </div>
        <div className="">
          <form className="flex flex-row gap-10 w-3/4">
            <input
              value={searchComponent}
              onChange={(e) => setSearchComponent(e.target.value)}
              placeholder="Search by name or email"
              className="bg-gray-100 placeholder:text-gray-400 rounded-3xl placeholder:font-semibold w-[40%] text-center p-2"
            ></input>
            <button
              className="bg-orange-400 text-white rounded-3xl w-fit px-5"
              onClick={(e) => searchHandleClick(e)}
            >
              Search
            </button>
            <div className="w-[]  justify-center items-center flex text-5xl text-gray-400">
              <button  onClick={(e)=>handleCreate(e)}>
                <LuPlusCircle />
              </button>
            </div>
          </form>
        </div>
        <table className="w-full ">
          <thead>
            <tr>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                ID
              </th>
              <th className="text-xl p-3 font-semibold  bg-gray-300 border-black border-r-2">
                Name
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Subject
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {showList &&
              showList.map((info, index) => (
                <tr className="bg-gray-200" key={info.id}>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.id}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.name}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.subjectCode}
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
        {/* Delete Popup */}
        <Popup open={openDelete} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <div className="header font-bold text-xl">
              {" "}
              Are you sure want to delete this user!!!
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
        {/* Create Popup */}
        <Popup open={openCreate} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <div className="header font-bold text-xl">
              {" "}
              Are you sure want to delete this user!!!
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
    </div>
  );
}
