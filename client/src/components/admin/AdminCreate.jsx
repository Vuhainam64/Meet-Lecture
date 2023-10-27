import { useState } from "react";

export default function AdminCreate() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    dob: "",
    role: "",
    subjectId: [0],
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center  pb-10">
      <div className="w-[50%] h-fit mt-[5%] flex flex-col justify-center gap-3 items-start px-10 py-3 border-orange-400 border-4 rounded-md min-h-[20%]">
        <span className="font-semibold text-2xl mb-5">Create Member</span>
        <form
          className="w-[80%] mx-auto flex flex-col gap-5"
    
        >
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Full Name</span>
            <input
              onChange={handleInputChange}
              name='fullname'
              value={formData.fullname}
              className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
              type="text"
            ></input>
          </div>
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">DoB</span>
            <input
              onChange={handleInputChange}
              name='dob'
              value={formData.dob}
              className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
              type="date"
            ></input>
          </div>
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Role</span>
            <select
              name='role'
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
              name='username'
              value={formData.username}
              className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
              type="text"
            ></input>
          </div>
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Password</span>
            <input
              onChange={handleInputChange}
              name='password'
              value={formData.password}
              className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
              type="text"
            ></input>
          </div>
          <div className="flex flex-row w-full items-center">
            <span className="text-xl font-medium w-[30%]">Email</span>
            <input
              onChange={handleInputChange}
              name='email'
              value={formData.email}
              className=" border border-gray-900 rounded-sm py-1 pl-5 pr-3 placeholder:italic bg-gray-200 placeholder:text-gray-400 w-[15rem]"
              type="text"
            ></input>
          </div>
        </form>
        <div className="flex flex-row  w-full items-center justify-center gap-10">
          <button className="text-white bg-red-500 px-3 py-2 rounded-xl border-black border-2">
            Cancel
          </button>
          <button className="text-white bg-green-500 px-3 py-2 rounded-xl border-black border-2" onClick={handleSubmit}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
}
