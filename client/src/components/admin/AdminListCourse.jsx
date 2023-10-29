import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { LuPlusCircle } from "react-icons/lu";
import "../../cssstyles/popupStyles.css";
import { createCourse, deleteSubjectById } from "../../api";

export default function AdminListCourse({ course, setRefresh }) {
  const zeroFormData = {
    subjectCode: "",
    name: "",
  };
  const [courseList, setCourseList] = useState([]);
  const [showList, setShowList] = useState([]);
  const [searchComponent, setSearchComponent] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteHolder, setDeleteHolder] = useState();

  const [formData, setFormData] = useState(zeroFormData);
  const [errors, setErrors] = useState({});
  const [added, setAdded] = useState(false);
  async function makePostRequest(form) {
    try {
      const response = await createCourse(form);
    } catch (error) {
      console.log(error);
    }
  }
  async function makeDeleteRequest(subjectId) {
    try {
      const response = await deleteSubjectById(subjectId);
    } catch (error) {
      console.log(error);
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    setErrors(newErrors);

    // If there are errors, do not proceed with the submission
    if (Object.keys(newErrors).length === 0) {
      // No validation errors, proceed with the submission
      console.log("Form submitted:", formData);
      makePostRequest(formData);
      setFormData(zeroFormData);
      setAdded(true);
      setRefresh(true);
    }
  };

  const cancelAll = (e) => {
    e.preventDefault();
    setFormData(zeroFormData);
    setErrors([]);
    setAdded(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Check if the fullname is not empty
    if (!formData.subjectCode) {
      newErrors.subjectCode = "Course's code is required";
    } else if (/^\d/.test(formData.subjectCode)) {
      newErrors.subjectCode = "Course's code cannot start with a number";
    } else if (formData.subjectCode !== formData.subjectCode.toUpperCase()) {
      newErrors.subjectCode = "Course's code must be in uppercase";
    }
    if (!formData.name) {
      newErrors.name = "Course's name is required";
    } else if (/^\d/.test(formData.name)) {
      newErrors.name = "Course's name cannot start with a number";
    }

    // Add more validation rules for other fields as needed

    return newErrors;
  };

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
      courseList.filter(
        (obj) =>
          obj.name.toLowerCase().includes(searchComponent.toLowerCase()) ||
          obj.subjectCode.toLowerCase().includes(searchComponent.toLowerCase())
      )
    );
  }
  function handleDelete(id) {
    setOpenDelete((open) => !open);
    setDeleteHolder(id);
  }
  function handleCreate(e) {
    e.preventDefault();
    setOpenCreate((open) => !open);
  }
  function handleDeleteYes() {
    if (deleteHolder !== 0) {
      try {
        console.log(deleteHolder);
        makeDeleteRequest(deleteHolder);
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
              placeholder="Search by name or code"
              className="bg-gray-100 placeholder:text-gray-400 rounded-3xl placeholder:font-semibold w-[40%] text-center p-2"
            ></input>
            <button
              className="bg-orange-400 text-white rounded-3xl w-fit px-5"
              onClick={(e) => searchHandleClick(e)}
            >
              Search
            </button>
            <div className="w-[]  justify-center items-center flex text-5xl text-gray-400">
              <button onClick={(e) => handleCreate(e)}>
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
                    <button
                      className="  text-red-500"
                      onClick={() => handleDelete(info.id)}
                    >
                      Delete
                    </button>
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
            <div className="header font-bold text-3xl"> Create Course!!!</div>
            <div className="content">
              {added && (
                <div className="w-full text-green-500 font-semibold text-xl">
                  Adding successfully!!!
                </div>
              )}
              <form className="w-full flex justify-center flex-col gap-5 items-center min-h-[10rem]">
                <div className="flex flex-row w-full items-center justify-center">
                  <span className="text-xl font-medium w-[30%]">
                    Course's Name:
                  </span>
                  <input
                    className={`border ${
                      errors.name
                        ? "border-red-500 border-2"
                        : "border-gray-900"
                    }  rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                    onChange={handleInputChange}
                    type="text"
                    value={formData.name}
                    name="name"
                  ></input>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xl ">{errors.name}</p>
                )}
                <div className="flex flex-row w-full items-center justify-center">
                  <span className="text-xl font-medium w-[30%]">
                    Course's Subject
                  </span>
                  <input
                    className={`border  ${
                      errors.subjectCode
                        ? "border-red-500 border-2"
                        : "border-gray-900"
                    }  rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                    onChange={handleInputChange}
                    type="text"
                    value={formData.subjectCode}
                    name="subjectCode"
                  ></input>
                </div>
                {errors.subjectCode && (
                  <p className="text-red-500 text-xl ">{errors.subjectCode}</p>
                )}
                <div className="flex flex-row gap-20 ">
                  <button
                    className="text-xl bg-green-500 p-1 border rounded-lg border-black"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                  <button
                    className="text-xl bg-red-500 p-1 border rounded-lg border-black"
                    onClick={cancelAll}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Popup>
        {/* Update Popup */}
        <Popup open={openUpdate} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <div className="header font-bold text-3xl"> Create Course!!!</div>
            <div className="content">
              <form className="w-full flex justify-center flex-col gap-5 items-center min-h-[10rem]">
                <div className="flex flex-row w-full items-center justify-center">
                  <span className="text-xl font-medium w-[30%]">
                    Course's Name:
                  </span>
                  <input
                    className={`border ${
                      errors.name
                        ? "border-red-500 border-2"
                        : "border-gray-900"
                    }  rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                    onChange={handleInputChange}
                    type="text"
                    value={formData.name}
                    name="name"
                  ></input>
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xl ">{errors.name}</p>
                )}
                <div className="flex flex-row w-full items-center justify-center">
                  <span className="text-xl font-medium w-[30%]">
                    Course's Subject
                  </span>
                  <input
                    className={`border  ${
                      errors.subjectCode
                        ? "border-red-500 border-2"
                        : "border-gray-900"
                    }  rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                    onChange={handleInputChange}
                    type="text"
                    value={formData.subjectCode}
                    name="subjectCode"
                  ></input>
                </div>
                {errors.subjectCode && (
                  <p className="text-red-500 text-xl ">{errors.subjectCode}</p>
                )}
                <div className="flex flex-row gap-20 ">
                  <button
                    className="text-xl bg-green-500 p-1 border rounded-lg border-black"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                  <button
                    className="text-xl bg-red-500 p-1 border rounded-lg border-black"
                    onClick={cancelAll}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
