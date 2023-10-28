import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs"; // Sửa đổi import
import { NavLink, useParams } from "react-router-dom";
import { searchSlotById } from "../../api";
import moment from "moment";

export default function CreateSlotLecturer() {
  const { id } = useParams();
  const zeroFormData = {
    code: "",
    createdAt: "",
    endDatetime: "",
    id: "",
    lecturerId: "",
    limitBooking: "",
    location: "",
    mode: "",
    startDatetime: "",
    status: "",
    title: "",
  };
  const [formData, setFormData] = useState(zeroFormData);
  const [inforDetail, setInforDetail] = useState({});
  const [errors, setErrors] = useState({});
  const [added, setAdded] = useState(false);

  const copyInforDetailToFormData = () => {
    setFormData({
      code: inforDetail.code,
      createdAt: inforDetail.createdAt,
      endDatetime: inforDetail.endDatetime,
      id: parseInt(inforDetail.id),
      lecturerId: parseInt(inforDetail.lecturerId),
      limitBooking: parseInt(inforDetail.limitBooking),
      location: inforDetail.location,
      mode: inforDetail.mode,
      startDatetime: inforDetail.startDatetime,
      status: inforDetail.status,
      title: inforDetail.title,
    });
  };

  async function fetchData(slotId) {
    // Chuyển đổi id thành kiểu số
    const response = await searchSlotById(parseInt(slotId))
      .then((data) => setInforDetail(data))
      .catch((error) => console.log(error));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();
    setErrors(errors);

    // If there are errors, do not proceed with the submission
    if (Object.keys(errors).length === 0) {
      // No validation errors, proceed with the submission
      console.log("Form submitted:", formData);
      // makePostRequest(formData);
      setFormData(zeroFormData);
      setAdded(true);
    }
  };

  const cancelAll = () => {
    setFormData(zeroFormData);
    setErrors([]);
    setAdded(false);
  };

  const validateForm = () => {
    const errors = {};

    // Check if the location is not empty
    if (!formData.location) {
      errors.location = "Location is required";
    }

    // Check if createdAt is not empty
    if (!formData.createdAt) {
      errors.createdAt = "Created At is required";
    }

    // Check if startDatetime is not empty
    if (!formData.startDatetime) {
      errors.startDatetime = "Start Date and Time is required";
    }

    // Check if endDatetime is not empty
    if (!formData.endDatetime) {
      errors.endDatetime = "End Date and Time is required";
    }

    // Check if limitBooking is a number
    if (isNaN(formData.limitBooking)) {
      errors.limitBooking = "Limit must be a number";
    }
    if (!formData.limitBooking) {
      errors.limitBooking = "Limit is required";
    }

    // Check if mode is not empty
    if (!formData.mode) {
      errors.mode = "Mode is required";
    }

    // Add more validation rules for other fields as needed

    return errors;
  };

  useEffect(() => {
    if (id != 0) {
      console.log(id);
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (id != 0) {
      if (inforDetail) {
        copyInforDetailToFormData();
        console.log(formData);
      }
    }
  }, [inforDetail, id]);

  return (
    <div className="min-h-[80%] flex flex-col bg-white">
      <div className="flex flex-row h-[10%]">
        <NavLink
          className="h-[10%]  font-bold flex flex-row gap-5 items-center"
          to="/Lecturer"
        >
          <span className="text-4xl">
            <BsArrowLeft />
          </span>{" "}
          <span className="text-2xl underline">Home</span>
        </NavLink>
        <div className="w-full flex justify-center items-center">
          <div className="w-[50%] h-fit mt-[5%] flex flex-col justify-center gap-3 items-start px-10 py-3 border-orange-400 border-4 rounded-md min-h-[20%] ">
            <span className="font-semibold text-2xl mb-5">
              {formData ? "Update Booking Slot" : "Create Booking Slot"}
            </span>
            <form className="w-[80%] mx-auto flex flex-col gap-5">
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Lecturer</span>
                <input
                  className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
                  type="text"
                  value={formData.lecturerId} // Sử dụng giá trị từ formData
                  readOnly
                ></input>
              </div>
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Location</span>
                <input
                  className={`border ${
                    errors.location
                      ? "border-red-500 border-2"
                      : "border-gray-900"
                  } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  type="text"
                  value={formData.location} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                  name="location"
                ></input>
              </div>
              {errors.location && (
                <div className="text-red-500 text-sm">{errors.location}</div>
              )}
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Date</span>
                <input
                  className={`border ${
                    errors.createdAt ? "border-red-500 border-2" : "border-gray-900"
                  } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  type="datetime-local"
                  value={formData.createdAt} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                  name="createdAt"
                ></input>
              </div>
              {errors.createdAt && (
                <div className="text-red-500 text-sm">{errors.createdAt}</div>
              )}
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Start Date</span>
                <input
                  className={`border ${
                    errors.startDatetime
                      ? "border-red-500 border-2"
                      : "border-gray-900"
                  } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  type="datetime-local"
                  value={formData.startDatetime} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                  name="startDateTime"
                ></input>
              </div>
              {errors.startDatetime && (
                <div className="text-red-500 text-sm">{errors.startDatetime}</div>
              )}
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">End Date</span>
                <input
                  className={`border ${
                    errors.endDatetime
                      ? "border-red-500 border-2"
                      : "border-gray-900"
                  } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  type="datetime-local"
                  value={formData.endDatetime} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                  name="endDateTime"
                ></input>
              </div>
              {errors.endDatetime && (
                <div className="text-red-500 text-sm">{errors.endDatetime}</div>
              )}
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Limit</span>
                <input
                  className={`border ${
                    errors.limitBooking ? "border-red-500 border-2" : "border-gray-900"
                  } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  type="text"
                  value={formData.limitBooking} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                  name="limitBooking"
                ></input>
              </div>
              {errors.limitBooking && (
                <div className="text-red-500 text-sm">{errors.limitBooking}</div>
              )}
              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Mode</span>
                <select
                  className={`border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  name="mode"
                  value={formData.mode} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              <div className="flex flex-row w-full items-center">
                <span className="text-xl font-medium w-[30%]">Code</span>
                <input
                  className={`border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
                  type="text"
                  value={formData.code} // Sử dụng giá trị từ formData
                  onChange={handleInputChange}
                  name="code"
                ></input>
              </div>
            </form>
            <div className="flex flex-row w-full items-center justify-center gap-10">
              <button
                className="text-white bg-red-500 px-3 py-2 rounded-xl border-black border-2"
                onClick={cancelAll}
              >
                Cancel
              </button>
              <button
                className="text-white bg-green-500 px-3 py-2 rounded-xl border-black border-2"
                onClick={handleSubmit}
              >
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
