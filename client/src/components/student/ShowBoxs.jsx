import { useEffect, useState } from "react";
import { LuLock } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { getAllSubject } from "../../api";
export default function ShowBoxs({ childArray, role }) {
  const [showInformations, setShowInformations] = useState(childArray);
  const [clickBook, setClickBook] = useState("");
  const [bookingHolder, setBookingHolder] = useState({});
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [subjectList, setSubjectList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const searchCourseName = (courseSubjectCode) => {
    const course = subjectList.find(
      (course) => course.subjectCode === courseSubjectCode
    );

    if (course) {
      return course.id;
    } else {
      return 0; // Return null if the course is not found
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Check if the fullname is not empty
    if (!formData.code) {
      newErrors.code = "Code is required";
    }
    if (!formData.subjectCode) {
      newErrors.subjectCode = "Course is required";
    } else if (/^\d/.test(formData.subjectCode)) {
      newErrors.subjectCode = "Course cannot start with a number";
    } else if (searchCourseName(formData.subjectCode) === 0) {
      newErrors.subjectCode = "Can't find this course";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    } else if (/^\d/.test(formData.description)) {
      newErrors.description = "Description cannot start with a number";
    }
    // Add more validation rules for other fields as needed

    return newErrors;
  };
  async function fetchData() {
    const response = await getAllSubject()
      .then((data) => setSubjectList(data))
      .catch((error) => console.log(error));
    console.log(subjectList);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    setErrors(newErrors);

    // If there are errors, do not proceed with the submission
    if (Object.keys(newErrors).length === 0) {
      // No validation errors, proceed with the submission
      console.log("Form submitted:", formData);
      // await makePostRequest(formData);
      setFormData({});
      // setAdded(true);
      // setRefresh(true);
    }
  }

  useEffect(() => {
    setShowInformations(childArray);
    fetchData();
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
    if (key === "Not Book") {
      setClickBook(infor.id);
      setBookingHolder(infor);
    }
  }

  function handleClose() {
    setBookingHolder({});
    setClickBook(0);
  }

  return (
    <div className="w-full pb-10 right-0 left-0 gap-[5%] flex flex-row flex-wrap h-full relative bg-white">
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
                Date: {moment(infor.startDatetime).format("DD/MM/YY")}
              </span>
            )}
            {infor.limitBooking && (
              <span className="text-xl">Limit: {infor.bookingId.length}/{infor.limitBooking}</span>
            )}
            <div className="w-full flex flex-row justify-center relative items-center gap-5">
              {infor.Finish ? (
                <div className="absolute -left-4 bg-green-400 py-[0.3rem] px-[0.6rem] rounded-xl text-xs text-white">
                  Finished
                </div>
              ) : (
                <></>
              )}
              <button
                className={`text-white  p-3 w-[8rem] rounded-3xl font-bold
            ${
              infor.status === "Cancel"
                ? "bg-red-500"
                : infor.status === "Booked"
                ? "bg-green-500"
                : infor.status === "Not Book"
                ? "bg-blue-500"
                : infor.status === "Feedback"
                ? "bg-blue-700"
                : "bg-black"
            }`}
                value={infor.status}
                onClick={(e) => handleClick(e, infor)}
              >
                {infor.status === "Not Book" ? "Book" : infor.status}
              </button>
            </div>
            {clickBook === infor.id && (
              <div
                className={`flex flex-col items-end absolute ${
                  infor.code !== "" ? "-bottom-[6rem]" : "-bottom-[8.5rem]"
                } w-full border-2 left-0 min-h-[5rem] border-black bg-white z-50 opacity-80 px-5 py-1 pb-5`}
              >
                <button className="text-2xl w-fit" onClick={handleClose}>
                  &times;
                </button>
                {infor.code !== "" ? (
                  <form className="flex flex-col gap-3 justify-end items-end relative w-full">
                    <div className="flex flex-row justify-between items-center w-full">
                      <span>Course:</span>
                      <input
                        name="subjectCode"
                        onChange={handleInputChange}
                        className={`border-2 w-[11rem] ${
                          errors.subjectCode
                            ? "border-red-500 "
                            : "border-gray-900"
                        } `}
                        value={formData.subjectCode}
                      />
                    </div>
                    {errors.subjectCode && (
                      <div className="text-red-500 text-sm">
                        {errors.subjectCode}
                      </div>
                    )}
                    <div className="flex flex-row justify-between items-center w-full">
                      <span>Code:</span>
                      <input
                        name="code"
                        onChange={handleInputChange}
                        className={`border-2 w-[11rem] ${
                          errors.code
                            ? "border-red-500 border-2"
                            : "border-gray-900"
                        } `}
                        value={formData.code}
                      />
                    </div>
                    {errors.code && (
                      <div className="text-red-500 text-sm">{errors.code}</div>
                    )}
                    <button
                      className=" border border-black px-2 bg-cyan-400 text-white"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <form className="flex flex-col gap-3 justify-end items-end relative w-full">
                    <div className="flex flex-col gap-3 justify-end items-start w-full">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span>Course:</span>
                        <input
                          name="subjectCode"
                          onChange={handleInputChange}
                          className={`border-2 w-[11rem] ${
                            errors.subjectCode
                              ? "border-red-500 "
                              : "border-gray-900"
                          } `}
                          value={formData.subjectCode}
                        />
                      </div>
                      {errors.subjectCode && (
                        <div className="text-red-500 text-sm">
                          {errors.subjectCode}
                        </div>
                      )}
                      <div className="flex flex-row justify-between items-center w-full ">
                        <span>Description:</span>
                        <input
                          name="description"
                          onChange={handleInputChange}
                          className={`border-2 w-[11rem] ${
                            errors.description
                              ? "border-red-500"
                              : "border-gray-900"
                          } `}
                          value={formData.description}
                        />
                      </div>
                      {errors.description && (
                        <div className="text-red-500 text-sm">
                          {errors.description}
                        </div>
                      )}
                    </div>
                    <button
                      className=" border border-black px-2 bg-cyan-400 text-white"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
