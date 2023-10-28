import { useState } from "react";
import { createAccount } from "../../api";
import Alert from '@mui/material/Alert';
export default function AdminCreate({ setUsers }) {
  const zeroFormData = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    dob: "",
    role: "Student",
    subjectId: [0],
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    dob: "",
    role: "Student",
    subjectId: [0],
  });
  const [errors, setErrors] = useState({});
  const [added, setAdded] = useState(false);
  async function makePostRequest(form) {
    try {
      const response = await createAccount(form);
    } catch (error) {}
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
      setUsers((prevUsers)=>[...prevUsers,formData]);
    }
  };

  const cancelAll = () => {
    setFormData(zeroFormData);
    setErrors([]);
    setAdded(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Check if the fullname is not empty
    if (!formData.fullname) {
      newErrors.fullname = "Full name is required";
    } else if (/^\d/.test(formData.fullname)) {
      newErrors.fullname = "Full name cannot start with a number";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
  
    // Check if the email is a valid email address based on the role
    if (formData.role === "Student") {
      // For students, validate the email as "xxxse123456@fpt.edu.vn"
      if (!/^[A-Za-z0-9._%+-]+se\d{6}@fpt.edu.vn$/.test(formData.email)) {
        newErrors.email =
          "Invalid student email format. It should be in the format 'xxxse123456@fpt.edu.vn'";
      }
    } else {
      // For other roles, validate the email as "xxxxx@fpt.edu.vn"
      if (!/^[A-Za-z0-9._%+-]+@fpt.edu.vn$/.test(formData.email)) {
        newErrors.email =
          "Invalid email format. It should be in the format 'xxxxx@fpt.edu.vn'";
      }
    }
  
    // Add more validation rules for other fields as needed
  
    return newErrors;
  };
  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center  pb-10">
      <div className="w-[50%] h-fit mt-[5%] flex flex-col justify-center gap-3 items-start px-10 py-3 border-orange-400 border-4 rounded-md min-h-[20%]">
        <span className="font-semibold text-2xl mb-5">Create Member</span>
          {added && <p className="text-green-500 font-semibold text-lg mb-5">Adding succesully!!!</p>}
        <form className="w-[80%] mx-auto flex flex-col gap-5">
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Full Name</span>
            <input
              onChange={handleInputChange}
              name="fullname"
              value={formData.fullname}
              className={`border ${
                errors.fullname ? "border-red-500 border-2" : "border-gray-900"
              } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
              type="text"
            ></input>
          </div>
          {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">DoB</span>
            <input
              onChange={handleInputChange}
              name="dob"
              value={formData.dob}
              className={`border ${
                errors.dob ? "border-red-500 border-2" : "border-gray-900"
              } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
              type="date"
            ></input>
          </div>
          {errors.dob && <p className="text-red-500">{errors.dob}</p>}
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Role</span>
            <select
              name="role"
              onChange={handleInputChange}
              className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
              type="text"
              value={formData.role}
            >
              <option value="Student">Student</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Username</span>
            <input
              onChange={handleInputChange}
              name="username"
              value={formData.username}
              className={`border ${
                errors.username ? "border-red-500 border-2" : "border-gray-900"
              } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
              type="text"
            ></input>
          </div>
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Password</span>
            <input
              onChange={handleInputChange}
              name="password"
              value={formData.password}
              className={`border ${
                errors.fullname ? "border-red-500 border-2" : "border-gray-900"
              } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
              type="text"
            ></input>
          </div>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Email</span>
            <input
              onChange={handleInputChange}
              name="email"
              value={formData.email}
              className={`border ${
                errors.email ? "border-red-500 border-2" : "border-gray-900"
              } rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]`}
              type="email"
            ></input>
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </form>
        <div className="flex flex-row  w-full items-center justify-center gap-10">
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
  );
}
